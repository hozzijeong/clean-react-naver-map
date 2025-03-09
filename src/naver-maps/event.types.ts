export interface PointerEvent {
	coord: naver.maps.Coord;
	point: naver.maps.Point;
	offset: naver.maps.Point;
	originalEvent: Event;
	pointerEvent: Event;
	overlay?: naver.maps.OverlayView;
}

export interface CommonEventHandlers {
	click?: (event: PointerEvent) => void;
	dblclick?: (event: PointerEvent) => void;
	mousedown?: (event: PointerEvent) => void;
	mouseup?: (event: PointerEvent) => void;
	rightclick?: (event: PointerEvent) => void;
	touchend?: (event: PointerEvent) => void;
	touchstart?: (event: PointerEvent) => void;
}
