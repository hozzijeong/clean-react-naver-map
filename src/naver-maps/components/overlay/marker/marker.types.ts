import { ReactNode } from 'react';

type ImageIcon = {
	url: string;
	size?: { width: number; height: number };
	scaledSize?: { width: number; height: number };
	origin?: { x: number; y: number };
	anchor?: { x: number; y: number };
};

type SymbolIcon = {
	path: naver.maps.SymbolPath | naver.maps.Point[] | naver.maps.PointLiteral[];
	fillColor?: string;
	fillOpacity?: number;
	strokeColor?: string;
	strokeOpacity?: number;
	strokeWeight?: number;
	scale?: number;
	anchor?: { x: number; y: number };
};

type HtmlIcon = {
	content: ReactNode | HTMLElement;
	size?: { width: number; height: number };
	anchor?: { x: number; y: number };
};

export type MarkerIcon = string | ImageIcon | SymbolIcon | HtmlIcon;

// 마커 인터랙션 영역 타입
type MarkerShape = {
	type: 'circle' | 'rect' | 'poly';
	coords: number[];
};

// MarkerOptions 타입 정의
// NOTE: map은 필수지만 훅 내부에서 map을 추가할 예정
export interface MarkerOptions {
	markerId?: string | number;
	animation?: naver.maps.Animation; // 마커 애니메이션
	position: naver.maps.Coord | naver.maps.CoordLiteral; // 마커 위치 (좌표)
	icon?: MarkerIcon; // 마커 아이콘
	shape?: MarkerShape; // 마커 인터랙션 영역
	title?: string; // 마커 툴팁 (마우스 오버 시 표시)
	cursor?: string; // 마우스 오버 시 커서 모양 (기본: 'pointer')
	clickable?: boolean; // 클릭 가능 여부 (기본: true)
	draggable?: boolean; // 드래그 가능 여부 (기본: false)
	visible?: boolean; // 마커 표시 여부 (기본: true)
	zIndex?: number; // 마커의 z-index 값 (레이어 순서)
}

// NOTE: 제대로된 getMarker를 얻기 위해선 1회 렌더링된 이후에 호출해야 얻을 수 있다 (marker자체가 layoutEffect에서 생성되기 때문)
export interface ImperativeMarker {
	getMarker: () => {
		marker: naver.maps.Marker | null;
		markerId?: string | number;
	};
	setMarker: (options: MarkerOptions) => void;
}

export interface MarkerEventHandlers {
	click?: (event: PointerEvent) => void;
	clickable_changed?: (clickable: boolean) => void;
	dblclick?: (event: PointerEvent) => void;
	draggable_changed?: (draggable: boolean) => void;
	icon_changed?: (icon: MarkerIcon) => void;
	icon_loaded?: (marker: naver.maps.Marker) => void;
	mousedown?: (event: PointerEvent) => void;
	mouseup?: (event: PointerEvent) => void;
	position_changed?: (position: naver.maps.Coord) => void;
	rightclick?: (event: PointerEvent) => void;
	title_changed?: (title: string) => void;
	touchend?: (event: PointerEvent) => void;
	touchstart?: (event: PointerEvent) => void;
	visible_changed?: (visible: boolean) => void;
	zIndex_changed?: (zIndex: number) => void;
}
