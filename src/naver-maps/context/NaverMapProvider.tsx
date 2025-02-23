import {
	createContext,
	createElement,
	CSSProperties,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

const NaverMapContext = createContext<naver.maps.Map | null>(null);

interface Props extends PropsWithChildren {
	mapElement: string | HTMLElement;
	options?: naver.maps.MapOptions;
	eventHandlers?: NaverMapEventHandlers;
	className?: string;
	style?: CSSProperties;
}

// NOTE: mapElement 동일한 id를 가진 태그를 Provider내부에 함께 위치시킬 것
export const NaverMapProvider = ({
	children,
	options = {},
	eventHandlers = {},
	mapElement,
	className,
	style,
}: Props) => {
	const [map, setMap] = useState<naver.maps.Map | null>(null);

	const handleAddEventListeners = useNaverMapEventListener();
	const renderNaverMap = useCallback(() => {
		if (map) return;

		const naverMap = new naver.maps.Map(mapElement, { ...options });

		setMap(naverMap);

		const removeListeners = handleAddEventListeners(naverMap, eventHandlers);

		return () => {
			if (map) {
				naverMap.destroy();
				removeListeners();
			}
		};
	}, [eventHandlers, handleAddEventListeners, map, mapElement, options]);

	useEffect(() => {
		const unmount = renderNaverMap();

		return unmount;
	}, [renderNaverMap]);

	const memoizedMap = useMemo(() => map, [map]);

	return (
		<NaverMapContext.Provider value={memoizedMap}>
			{typeof mapElement === 'string' &&
				createElement('div', { id: mapElement, className, style })}
			<>{memoizedMap && children}</>
		</NaverMapContext.Provider>
	);
};

export const useNaverMap = () => {
	const context = useContext(NaverMapContext);

	if (context === null) {
		throw new Error('NaverMapProvider 내부에서 사용해주세요');
	}

	return context;
};

interface NaverMapEventHandlers {
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
