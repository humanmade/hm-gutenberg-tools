import Backbone from 'backbone'
import _result from 'lodash/result';
import hash from './utils/hash';

const store = {};
const _sync = Backbone.sync;

/**
 * Cached version of Backbone.sync.
 */
function cachedSync( method, model, options ) {
	const url          = options.url || _result( model, 'url' );
	const requestHash  = hash( [ method, url, options.data ] );
	const cacheTimeout = Number.isInteger( options.hmCache ) ? parseInt( options.hmCache, 10 ) : 300;
	const now          = new Date();

	let syncDfd = Backbone.$ ?
		( Backbone.$.Deferred && Backbone.$.Deferred() ) :
		( Backbone.Deferred && Backbone.Deferred() );

	// If cache hit, and not expired, return  a new resolved deferred.
	if ( requestHash in store && now.valueOf() < store[ requestHash ].expires.valueOf() ) {
		const cache = store[ requestHash ];

		if ( options && options.success ) {
			options.success( cache.data, cache.textStatus, cache.jqXHR );
		}

		if ( syncDfd ) {
			syncDfd.resolve( cache.data );
		}

		if ( options && options.complete ) {
			options.complete( cache.jqXHR );
		}

		return syncDfd && syncDfd.promise();
	}

	// Else, use the original backbone sync.
	const sync = _sync.apply( this, [ method, model, options ] );

	// And cache the result of the original backbone sync.
	sync.then( ( data, textStatus, jqXHR ) => {
		store[ requestHash ] = {
			expires: new Date( now.getTime() + cacheTimeout * 1000 ),
			data,
			textStatus,
			jqXHR,
		};
	} );

	return sync;
}

/**
 * Replace backbone sync with a function that checks for hmCache option,
 * and uses the cachedSync function instead. Otherwise the default Backbone.sync is used.
 */
Backbone.sync = function ( method, model, options ) {
	if ( method === 'read' && 'hmCache' in options && options.hmCache ) {
		return cachedSync.apply( this, [ method, model, options ] );
	}
	return _sync.apply( this, [ method, model, options ] );
};
