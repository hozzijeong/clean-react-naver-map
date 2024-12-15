import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<button onClick={() => setOpen(true)}>클릭</button>
			{open && <Temp onClose={() => setOpen(false)} />}
		</div>
	);
}

export default App;

interface Props {
	onClose: () => void;
}

const Temp = ({ onClose }: Props) => {
	//모달창에 있는 X 버튼을 누르면 실행되는 모달창을 닫는 함수
	const goBackClicledRef = useRef(false);

	const closer = useCallback(() => {
		setTimeout(() => {
			onClose();
		}, 700);
	}, [onClose]);

	const goBack = useCallback(() => {
		goBackClicledRef.current = true;
		closer();
	}, [closer]);

	useEffect(() => {
		//모달이 켜질때마다 새로운 state를 추가한다.
		history.pushState({ page: 'modal' }, document.title);

		window.addEventListener('popstate', goBack);
		return () => {
			window.removeEventListener('popstate', goBack);

			if (!goBackClicledRef.current) {
				history.back();
			}
		};
	}, [goBack]);

	return <div>안녕하세요?</div>;
};
