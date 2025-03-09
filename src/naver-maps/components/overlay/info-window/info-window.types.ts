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

export interface InfoWindowEventHandlers {
	anchorColor_changed?: (anchorColor: string) => void;
	anchorSize_changed?: (anchorSize: naver.maps.Size) => void;
	anchorSkew_changed?: (anchorSkew: boolean) => void;
	backgroundColor_changed?: (backgroundColor: string) => void;
	borderColor_changed?: (borderColor: string) => void;
	borderWidth_changed?: (borderWidth: number) => void;
	close?: (pointerEvent: PointerEvent) => void;
	content_changed?: (content: HTMLElement) => void;
	disableAnchor_changed?: (disableAnchor: boolean) => void;
	disableAutoPan_changed?: (disableAutoPan: boolean) => void;
	maxWidth_changed?: (maxWidth: number) => void;
	open?: (pointerEvent: PointerEvent) => void;
	pixelOffset_changed?: (pixelOffset: naver.maps.Point) => void;
	position_changed?: (position: naver.maps.Coord) => void;
	zIndex_changed?: (zIndex: number) => void;
}
