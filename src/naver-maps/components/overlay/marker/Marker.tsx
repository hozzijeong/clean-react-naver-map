import { isValidElement, useCallback, useLayoutEffect, useRef } from 'react';
import { MarkerIcon, MarkerOptions } from './marker.types';
import { useNaverMap } from '../../../context/NaverMapProvider';
import { renderToStaticMarkup } from 'react-dom/server';

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

const Marker = (props: MarkerOptions) => {
	const map = useNaverMap();

	const markerRef = useRef<naver.maps.Marker | null>(null);

	const renderMarker = useCallback(() => {
		const { icon, ...rest } = props;

		const markerIcon = convertNaverMapMarkerIcon(icon);

		markerRef.current = new naver.maps.Marker({
			map,
			icon: markerIcon,
			...rest,
		});

		return () => {
			markerRef.current?.setMap(null);
			markerRef.current = null;
		};
	}, [map, props]);

	useLayoutEffect(() => {
		const unmount = renderMarker();

		return unmount;
	}, [renderMarker]);

	return <></>;
};

export default Marker;
