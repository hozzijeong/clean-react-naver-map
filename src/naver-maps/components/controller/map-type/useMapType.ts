import { useCallback } from 'react';
import { useNaverMap } from '../../../context/NaverMapProvider';

type DEFAULT_MAP_TYPE_ID = keyof typeof naver.maps.MapTypeId;

// TODO: 개인형 지도 유형 기능도 추가할 것 https://navermaps.github.io/maps.js.ncp/docs/tutorial-MapTypes.html
const useMapType = () => {
	const map = useNaverMap();

	const updateDefaultMapType = useCallback(
		(type: DEFAULT_MAP_TYPE_ID) => {
			map.setMapTypeId(naver.maps.MapTypeId[type]);
		},
		[map]
	);

	return { updateDefaultMapType };
};

export default useMapType;
