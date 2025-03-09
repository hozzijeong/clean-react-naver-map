import { ReactNode } from 'react';

export type InfoWindowContent = ReactNode | HTMLElement;

export interface InfoWindowOptions
	extends Omit<naver.maps.InfoWindowOptions, 'content'> {
	content: InfoWindowContent;
}

export interface ImperativeInfoWindow {
	close: () => void;
	getContent: () => string | HTMLElement;
	getContentElement: () => HTMLElement;
	getOptions: (key?: string) => naver.maps.InfoWindowOptions;
	getPosition: () => naver.maps.Coord;
	getZIndex: () => number;
	open: (
		map: naver.maps.Map,
		anchor?: naver.maps.Coord | naver.maps.CoordLiteral | naver.maps.Marker
	) => void;
	setContent: (content: InfoWindowContent) => void;
	setOptions: (options: naver.maps.InfoWindowOptions) => void;
	setPosition: (position: naver.maps.Coord | naver.maps.CoordLiteral) => void;
	setZIndex: (zIndex: number) => void;
}
