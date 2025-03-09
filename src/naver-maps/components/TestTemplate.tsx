import { useEffect, useRef } from 'react';
import Marker from './overlay/marker/Marker';
import { ImperativeMarker } from './overlay/marker/marker.types';
import { useNaverMap } from '../context/NaverMapProvider';
import useInfoWindow from './overlay/info-window/useInfoWindow';
import usePolyLine from './overlay/polyline/usePolyLine';

const position = [37.3595704, 127.105399] as [number, number];

export const TestTemplate = () => {
	const map = useNaverMap();
	const markerRef = useRef<ImperativeMarker | null>(null);
	const infoWindow = useInfoWindow({
		options: {
			content: <Greet count={Math.round(Math.random() * 100)} />,
		},
		eventListeners: {
			open: () => console.log('open??'),
		},
	});

	const polyline = usePolyLine({
		options: {
			map,
			path: [],
			strokeColor: '#5347AA',
			strokeWeight: 2,
		},
	});

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
			infoWindow.close();

			const prevPath = polyline.getPath();
			const point = e.coord;
			prevPath.push(point);
		};

		const clickEvent = map.addListener('click', clickHandler);

		return () => {
			map.removeListener(clickEvent);
		};
	}, [infoWindow, map, polyline]);

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
					click: ({ coord }) => {
						infoWindow.open(map, new naver.maps.LatLng(coord));
					},
				}}
			/>
		</div>
	);
};

const Greet = ({ count = 3 }: { count?: number }) => {
	console.log(count);
	return (
		<div
			style={{
				background: '#FFF',
			}}
		>
			안녕하세요? {count}
		</div>
	);
};
