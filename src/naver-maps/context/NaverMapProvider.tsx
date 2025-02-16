import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';

const NaverMapContext = createContext<naver.maps.Map | null>(null);

interface Props extends PropsWithChildren {
	mapId: string;
	options?: naver.maps.MapOptions;
}

// NOTE: mapId와 동일한 id를 가진 태그를 Provider내부에 함께 위치시킬 것
export const NaverMapProvider = ({ children, options = {}, mapId }: Props) => {
	const [map, setMap] = useState<naver.maps.Map | null>(null);

	useEffect(() => {
		if (map !== null) return;

		setMap(new naver.maps.Map(mapId, { ...options }));
	}, [map, mapId, options]);

	return (
		<NaverMapContext.Provider value={map}>{children}</NaverMapContext.Provider>
	);
};

export const useNaverMap = () => {
	const context = useContext(NaverMapContext);

	if (context === null) {
		throw new Error('NaverMapProvider 내부에서 사용해주세요');
	}

	return context;
};
