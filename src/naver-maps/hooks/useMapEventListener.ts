import { useCallback } from 'react';

export interface NaverMapEventHandlers {
	addLayer?: (layer: naver.maps.Layer) => void;
	bounds_changed?: (bounds: naver.maps.Bounds) => void;
	center_changed?: (center: naver.maps.Coord) => void;
	centerPoint_changed?: (centerPoint: naver.maps.Point) => void;
	click?: (pointerEvent: PointerEvent) => void;
	dblclick?: (pointerEvent: PointerEvent) => void;
	doubletap?: (pointerEvent: PointerEvent) => void;
	drag?: (pointerEvent: PointerEvent) => void;
	dragend?: (pointerEvent: PointerEvent) => void;
	dragstart?: (pointerEvent: PointerEvent) => void;
	idle?: () => void;
	init?: () => void;
	keydown?: (keyboardEvent: KeyboardEvent) => void;
	keyup?: (keyboardEvent: KeyboardEvent) => void;
	longtap?: (pointerEvent: PointerEvent) => void;
	mapType_changed?: (mapType: naver.maps.MapType) => void;
	mapTypeId_changed?: (mapTypeId: naver.maps.MapTypeId | string) => void;
	mousedown?: (pointerEvent: PointerEvent) => void;
	mousemove?: (pointerEvent: PointerEvent) => void;
	mouseout?: (pointerEvent: PointerEvent) => void;
	mouseover?: (pointerEvent: PointerEvent) => void;
	mouseup?: (pointerEvent: PointerEvent) => void;
	panning?: () => void;
	pinch?: (pointerEvent: PointerEvent) => void;
	pinchend?: (pointerEvent: PointerEvent) => void;
	pinchstart?: (pointerEvent: PointerEvent) => void;
	projection_changed?: (projection: naver.maps.Projection) => void;
	removeLayer?: (layername: string) => void;
	resize?: () => void;
	rightclick?: (pointerEvent: PointerEvent) => void;
	size_changed?: (size: naver.maps.Size) => void;
	tap?: (pointerEvent: PointerEvent) => void;
	tilesloaded?: () => void;
	touchend?: (pointerEvent: PointerEvent) => void;
	touchmove?: (pointerEvent: PointerEvent) => void;
	touchstart?: (pointerEvent: PointerEvent) => void;
	twofingertap?: (pointerEvent: PointerEvent) => void;
	zoom_changed?: (zoom: number) => void;
	zoomend?: () => void;
	zoomstart?: () => void;
}

export const useNaverMapEventListener = () => {
	const handleAddEventListeners = useCallback(
		(naverMap: naver.maps.Map, params: NaverMapEventHandlers) => {
			const listeners = Object.entries(params).map(
				([eventName, listeners]) => naverMap.addListener(eventName, listeners),
				[]
			);

			return () => {
				naverMap.removeListener(listeners);
			};
		},
		[]
	);

	return handleAddEventListeners;
};
