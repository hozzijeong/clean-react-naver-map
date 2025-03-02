export interface CommonEventHandlers {
	click?: (event: PointerEvent) => void;
	dblclick?: (event: PointerEvent) => void;
	mousedown?: (event: PointerEvent) => void;
	mouseup?: (event: PointerEvent) => void;
	rightclick?: (event: PointerEvent) => void;
	touchend?: (event: PointerEvent) => void;
	touchstart?: (event: PointerEvent) => void;
}
