import React from 'react';

import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const { PostControl, ImageControl } = window.hm.controls;
const { PostSelectButton } = window.hm.components;

function PostList( { postIds } ) {
	if ( ! postIds.length ) {
		return null;
	}

	return (
		<ul>
			{ postIds.map( id => {
				return (
					<li>{ id }</li>
				);
			} ) }
		</ul>
	);
}

function Edit(  { attributes, setAttributes }  ) {
	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="setting">
				<PanelBody initialOpen title={ __( 'Block Settings' ) }>
					<PanelRow>
						<TextControl
							label={ __( 'Title.' ) }
							value={ attributes.title }
							onChange={ title => setAttributes( { title } ) }
						/>
					</PanelRow>
					<PanelRow>
						<PostControl
							btnText={ __( 'Select Page' ) }
							help={ 'Some more description text' }
							label={ __( 'Linked Page.' ) }
							postSelectProps={ {
								postType: [ 'page' ],
								maxPosts: 1,
							} }
							value={ attributes.posts }
							onChange={ value => setAttributes( {
								posts: value.map( v => v.id ),
							} ) }
						/>
					</PanelRow>
					<PanelRow>
						<ImageControl
							help={ 'Some more description text' }
							label={ 'Image' }
							value={ attributes.image }
							onChange={ i => setAttributes( { image: i.id } ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<RichText
				tagName="h2"
				value={ attributes.title }
				onChange={ title => setAttributes( { title } ) }
			/>

			<div style={ {
				display: 'grid',
				gridTemplateColumns: 'repeat( 3, 1fr )',
			} }>
				<div>
					<PostSelectButton
						btnProps={ { isPrimary: true } }
						maxPosts={ 3 }
						postType={ [ 'post' ] }
						value={ attributes.posts }
						onSelect={ v => setAttributes( { posts: v.map( p => p.id ) } ) }
					>{ __( 'Select up to 3 posts.' ) }</PostSelectButton>
					<PostList postIds={ attributes.posts } />
				</div>
				<div>
					<PostSelectButton
						btnProps={ { isPrimary: true } }
						maxPosts={ 3 }
						postType={ [ 'post', 'page' ] }
						value={ attributes.postsAndPages }
						onSelect={ v => setAttributes( { postsAndPages: v.map( p => p.id ) } ) }
					>{ __( 'Select up to 3 posts or pages.' ) }</PostSelectButton>
					<PostList postIds={ attributes.postsAndPages } />
				</div>
				<div>
					<PostSelectButton
						btnProps={ { isPrimary: true } }
						maxPosts={ 3 }
						postType={ [ 'post' ] }
						showDateFilters
						value={ attributes.posts }
						onSelect={ v => setAttributes( { posts: v.map( p => p.id ) } ) }
					>{ __( 'Post select with date range.' ) }</PostSelectButton>
					<PostList postIds={ attributes.posts } />
				</div>
			</div>
		</div>
	);
}

export default Edit;
