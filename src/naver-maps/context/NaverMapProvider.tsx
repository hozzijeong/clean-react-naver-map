import { createContext, PropsWithChildren, useEffect, useState } from 'react';

function initMap() {
	const map = new naver.maps.Map('map', {
		center: new naver.maps.LatLng(37.3595704, 127.105399),
		zoom: 10,
	});

	return map;
}

const NaverMapContext = createContext<naver.maps.Map | null>(null);

export const NaverMapProvider = ({ children }: PropsWithChildren) => {
	const [map, setMap] = useState<naver.maps.Map | null>(null);

	useEffect(() => {
		const map = initMap();

		setMap(map);
	}, []);

	return (
		<NaverMapContext.Provider value={map}>
			<div id='map' style={{ width: '100%', height: '400px' }} />
			{children}
		</NaverMapContext.Provider>
	);
};
