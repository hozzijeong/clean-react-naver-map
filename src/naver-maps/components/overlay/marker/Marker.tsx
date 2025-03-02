import {
	forwardRef,
	memo,
	useCallback,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from 'react';
import {
	ImperativeMarker,
	MarkerEventHandlers,
	MarkerOptions,
} from './marker.types';
import { useNaverMap } from '../../../context/NaverMapProvider';

import { convertNaverMapMarkerIcon } from './utils/convert-naver-map-marker-icon';
import { addEventListener } from './utils/add-event-listener';

interface Props {
	options: MarkerOptions;
	listeners?: MarkerEventHandlers;
}

const Marker = forwardRef<ImperativeMarker, Props>(
	({ options, listeners }, ref) => {
		const map = useNaverMap();

		const markerRef = useRef<naver.maps.Marker | null>(null);

		useImperativeHandle(ref, () => ({
			getMarker: () => ({
				marker: markerRef.current,
				markerId: options.markerId,
			}),
			setMarker: (options: Omit<MarkerOptions, 'markerId'>) => {
				if (!markerRef.current) return;
				const { icon, ...rest } = options;

				const markerIcon = convertNaverMapMarkerIcon(icon);

				markerRef.current.setOptions({ map, icon: markerIcon, ...rest });
			},
		}));

		const renderMarker = useCallback(() => {
			const { icon, ...rest } = options;

			const markerIcon = convertNaverMapMarkerIcon(icon);

			const marker = new naver.maps.Marker({
				map,
				icon: markerIcon,
				...rest,
			});

			let removeListeners: () => void;

			if (listeners) {
				removeListeners = addEventListener(marker, listeners);
			}

			markerRef.current = marker;

			return () => {
				marker.setMap(null);
				markerRef.current = null;
				removeListeners();
			};
		}, [listeners, map, options]);

		useLayoutEffect(() => {
			const unmount = renderMarker();

			return unmount;
		}, [renderMarker]);

		return <></>;
	}
);

export default memo(Marker);
