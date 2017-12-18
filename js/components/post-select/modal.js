import React from 'react';
import PropTypes from 'prop-types';
import wp from 'wp';
import _get from 'lodash/get';
import _uniqueId from 'lodash/uniqueId';
import _pull from 'lodash/pull';
import _extend from 'lodash/extend';
import _isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import Select from 'react-select';

const { Button } = wp.components;
const { __ } = wp.i18n;
const { Spinner } = wp.components;

const termFilters = [
	{ slug: 'category', rest: 'categories', plural: 'Categories', collection: 'Categories' },
	{ slug: 'tag', rest: 'tags', plural: 'Tags', collection: 'Tags' },
]

class PostSelectModalFilters extends React.Component {
	state = {
		category: [],
	}

	constructor( props ) {
		super( props );
		this.id = _uniqueId( 'post-select-modal-filters' );
	}

	render() {
		const {
			onUpdate,
		} = this.props;

		return <form
			className="media-menu post-select-filters"
			onSubmit={ event => {
				event.preventDefault();
				this.onUpdate()
			} }
		>
			<div className="post-select-filters-row">
				<label htmlFor={ `${this.id}-search` } className="screen-reader-text">{ __( 'Search posts' ) }</label>
				<input
					id={ `${this.id}-search` }
					placeholder={ __( 'Search posts...' ) }
					type="search"
					ref={ input => this.searchInput = input } />
			</div>
			{ termFilters.map( termFilter => {
				return <div
					key={ termFilter.slug }
					className="post-select-filters-row"
				>
					<label htmlFor={ `${this.id}-${termFilter.slug}` }>
						{ termFilter.plural }
					</label>
					<Select.Async
						id={ `${this.id}-${termFilter.slug}` }
						multi={ true }
						backspaceRemoves={ true }
						value={ _get( this.state, termFilter.slug ) }
						onChange={ selectedOptions => {
							const newState = {};
							newState[ termFilter.slug ] = selectedOptions.map( option => option.value );
							this.setState( newState );
						} }
						loadOptions={ ( query, callback ) => {
							this.getTerms( termFilter.collection, query, callback )
						}}
					/>
				</div>
			} ) }
			<Button
				isPrimary={true}
				isLarge={true}
				type="submit"
			>
				Filter Posts
			</Button>
		</form>
	}

	onUpdate() {
		const args = {
			search: this.searchInput.value,
		}

		termFilters.forEach( termFilter => {
			const terms = _get( this.state, termFilter.slug );
			if ( terms ) {
				args[ termFilter.slug ] = terms;
			}
		} );

		this.props.onUpdate( args );
	}

	getTerms( collectionName, query, callback ) {
		const collection = new wp.api.collections[ collectionName ]();

		const fetchData = {
			data: {
				search: query
			}
		};

		return collection.fetch( fetchData )
			.then( json => {
				callback( null, {
					options: json.map( item => {
						return {
							label: item.name,
							value: item.id,
						}
					} ),
					complete: ! collection.hasMore(),
				});
			} );
	}
}

const PostList = props => {
	const {
		posts,
		selectedPosts,
		onToggleSelectedPosts,
	} = props;

	return <div>
		{ posts.map( post => {
			return <div
				key={ post.id }
				onClick={ () => props.onToggleSelectedPosts( post.id ) }
				className={ classNames( {
					'post-select-result': true,
					'focused': selectedPosts.indexOf( post.id ) >= 0,
				} )}
			>
				<h2>{ post.title.rendered }</h2>
				<div className="post-select-result-meta">Type, Date, author</div>
			</div>
		} ) }
	</div>
}

class PostSelectModal extends React.Component {
	state = {
		posts: [],
		selectedPosts: [],
		isLoading: false,
		filters: {},
	}

	constructor( props ) {
		super( props );
		this.id = _uniqueId( 'post-select-modal' );
	}

	componentWillMount() {
		this.initPostsCollection();
	}

	componentDidUpdate( prevProps, prevState ){
		if ( ! _isEqual( prevState.filters, this.state.filters ) ) {
			this.fetchPostsCollection();
		}
	}

	componentWillUnmount() {
		this.postsCollection.off();
		delete this.postsCollection;
	}

	render() {
		const {
			isLoading,
		} = this.state;

		const {
			onClose,
			modalTitle = __( 'Select a post' ),
			onSelect,
		} = this.props;

		return <div className="post-select post-select-modal">
			<div className="media-modal-backdrop"></div>
				<div className="modal media-modal wp-core-ui">
				<Button
					className="media-modal-close"
					onClick={ () => onClose() }
				>
					<span className="media-modal-icon"><span className="screen-reader-text">{ __( 'Close media panel' ) }</span></span>
				</Button>
				<div className="media-frame-title">
					<h1>{ modalTitle }</h1>
				</div>
				<div className="media-frame-menu">
					<PostSelectModalFilters onUpdate={ filters => this.setState( { filters: filters } ) } />
				</div>
				<div className="media-modal-content">
					{ isLoading && <Spinner /> }
					{ ! isLoading && this.hasPrev() && (
						<Button
							className="prev-page"
							isLarge={true}
							onClick={ () => {
								this.prevPostsPage();
							}}
							disabled={ isLoading }
						>Previous page</Button>
					) }
					{ ! isLoading && <PostList
						posts={ this.state.posts }
						selectedPosts={ this.state.selectedPosts }
						onToggleSelectedPosts={ id => {
							this.togglePostSelected( id )
						} }
					/> }
					{ ! isLoading && this.hasMore() && (
						<Button
							className="next-page"
							isLarge={true}
							onClick={ () => {
								this.nextPostsPage();
							}}
						>Next page</Button>
					) }
				</div>
				<div className="media-frame-toolbar">
					<div className="media-toolbar">
						<Button
							isPrimary={true}
							onClick={ () => {
								let postModels = this.state.selectedPosts.map( id => {
									return this.postsCollection.findWhere({ id: id }).toJSON();
								});
								onSelect( postModels );
							} }
						>Select</Button>
					</div>
				</div>
			</div>
		</div>
	}

	postCollectionFetchData() {
		const args = {
			per_page: 25,
		};

		const search = _get( this.state, 'filters.search' );
		if ( search && search.length ) {
			args.search = search;
		}

		termFilters.forEach( termFilter => {
			const terms = _get( this.state, `filters.${termFilter.slug}` );
			if ( terms ) {
				args[ termFilter.rest ] = terms.join(',');
			}
		} );

		return args;
	}

	initPostsCollection() {
		this.setState({ isLoading: true });

		this.postsCollection = new wp.api.collections.Posts();

		this.postsCollection.on( 'add remove update change destroy reset sort', () => this.setState({
			posts: this.postsCollection.toJSON()
		}));

		this.postsCollection.on( 'request', () => this.setState( { isLoading: true } ) );
		this.postsCollection.on( 'sync', () => this.setState( { isLoading: false } ) );

		this.postsCollection.fetch( { data: this.postCollectionFetchData() } );
	}

	fetchPostsCollection() {
		this.postsCollection.fetch( { data: this.postCollectionFetchData() } );
	}

	nextPostsPage( options = {} ) {
		this.setState( { page: this.state.page += 1 });
		this.postsCollection.more( options );
	}

	/**
	 * Fetches the prev page of objects if a new page exists.
	 *
	 * @param {data: {page}} options.
	 * @returns {*}.
	 */
	prevPostsPage( options = {} ) {
		options.data = options.data || {};
		_extend( options.data, this.postCollectionFetchData() );

		if ( 'undefined' === typeof options.data.page ) {
			if ( ! this.hasPrev() ) {
				return false;
			}

			if ( null === this.postsCollection.state.currentPage || this.postsCollection.state.currentPage <= 1 ) {
				options.data.page = 1;
			} else {
				options.data.page = this.postsCollection.state.currentPage - 1;
			}
		}

		this.postsCollection.fetch( options );
	}

	/**
	 * Returns true if there are previous pages of objects available.
	 *
	 * @returns null|boolean.
	 */
	hasMore() {
		return this.postsCollection.hasMore();
	}

	/**
	 * Returns true if there are previous pages of objects available.
	 *
	 * @returns null|boolean.
	 */
	hasPrev() {
		if ( null === this.postsCollection.state.currentPage ) {
			return null;
		} else {
			return ( this.postsCollection.state.currentPage > 1 );
		}
	}

	togglePostSelected( id ) {
		const { selectedPosts } = this.state;
		const { maxPosts } = this.props;

		if ( selectedPosts.indexOf( id ) >= 0 ) {
			this.setState( { selectedPosts: _pull( selectedPosts, id ) } )
		} else if ( selectedPosts.length < maxPosts ) {
			let newSelectedPosts = selectedPosts.slice();
			newSelectedPosts.push( id );
			this.setState( { selectedPosts: newSelectedPosts } );
		}
	}
}

PostSelectModal.propTypes = {
	minPosts: PropTypes.number.isRequired,
	maxPosts: PropTypes.number.isRequired,
	onSelect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
}

export default PostSelectModal;

