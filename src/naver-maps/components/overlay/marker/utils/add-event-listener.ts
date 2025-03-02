import { MarkerEventHandlers } from '../marker.types';

export const addEventListener = (
	marker: naver.maps.Marker,
	eventHandlers: MarkerEventHandlers
) => {
	const listeners = Object.entries(eventHandlers).map(
		([eventName, listener]) => marker.addListener(eventName, listener),
		[]
	);

	return () => {
		marker.removeListener(listeners);
	};
};
