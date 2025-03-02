import { useCallback, useMemo } from 'react';
import { useNaverMap } from '../../../context/NaverMapProvider';

type ZoomAction = 'zoom-in' | 'zoom-out';

const useZoomControl = () => {
	const map = useNaverMap();

	const handleZoomControl = useCallback(
		(action: ZoomAction, level: number) => {
			const currentZoom = map.getZoom();
			map.setZoom(currentZoom + action === 'zoom-in' ? 1 : -1 * level);
		},
		[map]
	);

	const zoom = useMemo(() => map.getZoom(), [map]);

	return [zoom, handleZoomControl];
};

export default useZoomControl;
