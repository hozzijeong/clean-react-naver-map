import { useEffect, useRef } from 'react';
import Marker from './overlay/marker/Marker';
import { ImperativeMarker } from './overlay/marker/marker.types';
import { useNaverMap } from '../context/NaverMapProvider';

const position = [37.3595704, 127.105399] as [number, number];

export const TestTemplate = () => {
	const map = useNaverMap();
	const markerRef = useRef<ImperativeMarker | null>(null);

	useEffect(() => {
		const marker = markerRef.current;
		if (!marker) return;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const clickHandler = (e: any) => {
			marker.setMarker({
				position: new naver.maps.LatLng(e.latlng),
				icon: {
					content: <Greet />,
				},
			});
		};

		const clickEvent = map.addListener('click', clickHandler);

		return () => {
			map.removeListener(clickEvent);
		};
	}, [map]);

	return (
		<div>
			<Marker
				ref={markerRef}
				options={{
					position: new naver.maps.LatLng(...position),
					icon: {
						content: <Greet />,
					},
				}}
				listeners={{
					click: (event) => console.log(event, 'marker click'),
				}}
			/>
		</div>
	);
};

const Greet = () => {
	return (
		<div
			style={{
				background: '#FFF',
			}}
		>
			안녕하세요?
		</div>
	);
};
