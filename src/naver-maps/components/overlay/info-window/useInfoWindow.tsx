import { useMemo, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { InfoWindowContent, InfoWindowOptions } from './info-window.types';

const contentToHTMLRender = (content: InfoWindowContent) => {
	if (!(content instanceof HTMLElement)) {
		return renderToStaticMarkup(content);
	}

	return content;
};

interface Props {
	options: InfoWindowOptions;
}

const useInfoWindow = ({ options }: Props) => {
	const infoWindowRef = useRef<naver.maps.InfoWindow>(
		new naver.maps.InfoWindow({
			...options,
			content: contentToHTMLRender(options.content),
		})
	);

	const infoWindow = useMemo(
		() => ({
			open: (
				map: naver.maps.Map,
				anchor?: naver.maps.Coord | naver.maps.Marker | naver.maps.CoordLiteral
			) => {
				infoWindowRef.current.open(map, anchor);
			},
			close: () => infoWindowRef.current.close(),
			getContent: () => infoWindowRef.current.getContent(),
			getContentElement: () => infoWindowRef.current.getContentElement(),
			getOptions: () => infoWindowRef.current.getOptions(),
			getPosition: () => infoWindowRef.current.getPosition(),
			getZIndex: () => infoWindowRef.current.getZIndex(),
			setContent: (content: InfoWindowContent) => {
				return infoWindowRef.current.setContent(contentToHTMLRender(content));
			},
			setOptions: (options: InfoWindowOptions) => {
				return infoWindowRef.current.setOptions({
					...options,
					content: contentToHTMLRender(options.content),
				});
			},
			setPosition: (position: naver.maps.Coord | naver.maps.CoordLiteral) =>
				infoWindowRef.current.setPosition(position),
			setZIndex: (number: number) => infoWindowRef.current.setZIndex(number),
		}),
		[]
	);

	return infoWindow;
};

export default useInfoWindow;
