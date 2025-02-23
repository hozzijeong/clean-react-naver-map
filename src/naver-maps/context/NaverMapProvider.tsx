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
import {
	NaverMapEventHandlers,
	useNaverMapEventListener,
} from '../hooks/useMapEventListener';

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
