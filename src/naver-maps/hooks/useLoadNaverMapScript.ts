import { useCallback, useEffect, useRef, useState } from 'react';
import { loadNaverMapScript } from '../utils/render-map-script';
import { ClientConfig } from '../script.types';

type Status = 'success' | 'loading' | 'error';

const useLoadNaverMapScript = ({ ...config }: ClientConfig) => {
	const [status, setStatus] = useState<Status>('loading');

	const isInitialRef = useRef(true);

	const loadMapScriptCallback = useCallback(async (config: ClientConfig) => {
		const loadCallback = () => setStatus('success');
		const errorCallback = () => setStatus('error');

		const script = await loadNaverMapScript({
			config,
			loadCallback,
			errorCallback,
		});

		document.head.insertBefore(script, document.head.firstChild);

		return () => {
			script.removeEventListener('load', loadCallback);
			script.removeEventListener('error', errorCallback);
			document.head.removeChild(script);
		};
	}, []);

	useEffect(() => {
		if (!isInitialRef.current) return;
		isInitialRef.current = false;
		let cleanup: (() => void) | null = null;

		loadMapScriptCallback(config).then((fn) => (cleanup = fn));

		return () => {
			isInitialRef.current = true;
			if (cleanup) {
				cleanup();
			}
		};
	}, [config, loadMapScriptCallback]);

	return status;
};

export default useLoadNaverMapScript;
