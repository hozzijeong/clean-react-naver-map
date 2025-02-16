import { NaverMapProvider } from './naver-maps/context/NaverMapProvider';
import useLoadNaverMapScript from './naver-maps/hooks/useLoadNaverMapScript';

function App() {
	const status = useLoadNaverMapScript({
		ncpClientId: import.meta.env.VITE_NCP_CLIENT_ID,
	});

	if (status === 'loading') return null;

	return (
		<NaverMapProvider mapId='map'>
			<div
				id='map'
				style={{
					width: '100%',
					height: '400px',
				}}
			/>
			<div></div>
		</NaverMapProvider>
	);
}

export default App;
