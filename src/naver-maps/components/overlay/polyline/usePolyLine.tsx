import { useEffect, useMemo, useRef } from 'react';
import { PolylineEventHandlers } from './polyline.types';

interface Props {
	options: naver.maps.PolylineOptions;
	eventListeners?: PolylineEventHandlers;
}

const usePolyLine = ({ options, eventListeners }: Props) => {
	const polylineRef = useRef<naver.maps.Polyline>(
		new naver.maps.Polyline(options)
	);

	useEffect(() => {
		const infoWindow = polylineRef.current;
		if (!eventListeners) return;

		const listeners = Object.entries(eventListeners).map(
			([eventName, listener]) => infoWindow.addListener(eventName, listener)
		);

		return () => {
			infoWindow.removeListener(listeners);
		};
	}, [eventListeners]);

	const polyline = useMemo(() => {
		return {
			getBounds: () => polylineRef.current.getBounds(),
			getClickable: () => polylineRef.current.getClickable(),
			getDistance: () => polylineRef.current.getDistance(),
			getDrawingRect: () => polylineRef.current.getDrawingRect(),
			getMap: () => polylineRef.current.getMap(),
			getOptions: () => polylineRef.current.getOptions(),
			getPath: () => polylineRef.current.getPath(),
			getStyles: () => polylineRef.current.getStyles(),
			getVisible: () => polylineRef.current.getVisible(),
			getZIndex: () => polylineRef.current.getZIndex(),
			setClickable: (clickable: boolean) =>
				polylineRef.current.setClickable(clickable),
			setMap: (map: naver.maps.Map) => polylineRef.current.setMap(map),
			setOptions: (options: naver.maps.PolylineOptions) =>
				polylineRef.current.setOptions(options),
			setPath: (
				path:
					| naver.maps.ArrayOfCoords
					| naver.maps.KVOArrayOfCoords
					| naver.maps.ArrayOfCoordsLiteral
			) => polylineRef.current.setPath(path),
			setVisible: (isVisible: boolean) =>
				polylineRef.current.setVisible(isVisible),
			setZIndex: (index: number) => polylineRef.current.setZIndex(index),
		};
	}, []);

	return polyline;
};

export default usePolyLine;
