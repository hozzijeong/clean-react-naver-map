import { CommonEventHandlers, PointerEvent } from '../../../event.types';

export interface PolylineEventHandlers
	extends Pick<
		CommonEventHandlers,
		'click' | 'mousedown' | 'mouseup' | 'dblclick'
	> {
	clickable_changed?: (clickable: boolean) => void;
	mouseout?: (event: PointerEvent) => void;
	mouseover?: (event: PointerEvent) => void;
	visible_changed?: (visible: boolean) => void;
	zIndex_changed?: (zIndex: number) => void;
}
