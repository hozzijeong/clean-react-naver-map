import { TestTemplate } from './naver-maps/components/TestTemplate';
import { NaverMapProvider } from './naver-maps/context/NaverMapProvider';
import useLoadNaverMapScript from './naver-maps/hooks/useLoadNaverMapScript';

function App() {
	const status = useLoadNaverMapScript({
		ncpClientId: import.meta.env.VITE_NCP_CLIENT_ID,
	});

	if (status === 'loading') return null;

	return (
		<NaverMapProvider
			mapElement={{
				id: 'map',
				style: {
					width: '100%',
					height: '100vh',
				},
			}}
			options={{
				center: new naver.maps.LatLng(37.3595704, 127.105399),
			}}
			eventHandlers={{
				click: () => console.log('click'),
				idle: () => console.log('idle'),
			}}
		>
			<TestTemplate />
		</NaverMapProvider>
	);
}

export default App;
