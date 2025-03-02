import { isValidElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MarkerIcon } from '../marker.types';

export const convertNaverMapMarkerIcon = (icon?: MarkerIcon) => {
	if (typeof icon === 'object' && icon !== null && 'content' in icon) {
		const { content, ...rest } = icon;

		let convertedContent: string | HTMLElement = content as
			| string
			| HTMLElement;

		if (isValidElement(content)) {
			convertedContent = renderToStaticMarkup(content);
		}

		return {
			...rest,
			content: convertedContent,
		};
	}

	return icon;
};
