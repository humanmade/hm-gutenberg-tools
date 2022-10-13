import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';

import { useInnerBlocksProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';

import Navigation from './navigation';

/**
 * InnerBlockSlider component.
 *
 * @param {object} root0 - Component props.
 * @param {string} root0.parentBlockId - Parent block clientId.
 * @param {number} root0.slidesPerPage - Number of visible slides.
 * @param {string} root0.allowedBlock - Allowed block type.
 * @param {Array} root0.template - Initial block template.
 * @param {string} root0.slideHeight - Slider height as CSS value with units.
 * @param {number} root0.slideLimit - Maximum allowed slides.
 * @returns {ReactNode} Component.
 */
const InnerBlockSlider = ( {
	parentBlockId,
	allowedBlock,
	template,
	slideLimit,
} ) => {
	const innerBlockTemplate = template || [ [ allowedBlock ] ];

	const [ currentPage, setCurrentPage ] = useState( 1 );
	const slideBlocks = useSelect( select => select( 'core/block-editor' ).getBlock( parentBlockId ).innerBlocks );
	const totalPages = slideBlocks.length;
	const styleRef = useRef();
	const slideCount = useRef();
	const { insertBlock } = useDispatch( 'core/block-editor' );

	const addSlide = () => {
		const created = createBlock( allowedBlock );
		insertBlock( created, undefined, parentBlockId );
	};

	/**
	 * If a slide is added, switch to the new slide. If one is deleted, make sure we don't
	 * show a non-existent slide.
	 */
	useEffect( () => {
		if ( ! slideCount.current ) {
			slideCount.current = slideBlocks.length;
		} else if ( slideBlocks.length > slideCount.current ) {
			// Slide added
			slideCount.current = slideBlocks.length;

			setCurrentPage( totalPages );
		} else if ( slideBlocks.length < slideCount.current ) {
			// Slide deleted
			slideCount.current = slideBlocks.length;

			if ( currentPage > totalPages ) {
				setCurrentPage( totalPages );
			}
		}
	}, [ slideBlocks.length, currentPage, totalPages ] );

	const innerBlockProps = useInnerBlocksProps( {
		className: 'slides',
	},
	{
		__experimentalCaptureToolbars: true,
		allowedBlocks: [ allowedBlock ],
		orientation: 'horizontal',
		renderAppender: false,
		template: innerBlockTemplate,
		templateLock: false,
	} );

	useEffect( () => {
		if ( ! styleRef.current ) {
			return;
		}

		styleRef.current.innerHTML = `#block-${parentBlockId} .slides > *:not(:nth-child(${ currentPage }) ) { display: none; }`;
	}, [ currentPage, styleRef, parentBlockId ] );

	return (
		<div className="inner-block-slider">
			<style ref={ styleRef } />
			<div { ...innerBlockProps } />
			<Navigation
				addSlide={ addSlide }
				addSlideEnabled={ totalPages < slideLimit }
				currentPage={ currentPage }
				nextEnabled={ currentPage < totalPages }
				prevEnabled={ currentPage > 1 }
				setCurrentPage={ setCurrentPage }
				totalPages={ totalPages }
			/>
		</div>
	);
};

InnerBlockSlider.defaultProps = {
	template: null,
	slideLimit: 5,
};

InnerBlockSlider.propTypes = {
	slidesPerPage: PropTypes.number,
	parentBlockId: PropTypes.string.isRequired,
	allowedBlock: PropTypes.string.isRequired,
	template: PropTypes.array,
	slideHeight: PropTypes.string,
};

export default InnerBlockSlider;
