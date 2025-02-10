import { ClientConfig } from '../types';

const loadMapScript = async (src: string) => {
	const script = document.createElement('script');

	script.src = src;
	script.type = 'text/javascript';

	return script;
};

const generateSrc = (config: ClientConfig) => {
	let src = `https://oapi.map.naver.com/openapi/v3/maps.js`;

	const clientQuery =
		'ncpClientId' in config
			? `ncpClientId=${config.ncpClientId}`
			: 'govClientId' in config
			? `govClientId=${config.govClientId}`
			: 'finClientId' in config
			? `finClientId=${config.finClientId}`
			: null;

	if (clientQuery === null) {
		throw new Error('please type ncpClientId or govClientId or finClientId');
	}

	src += `?${clientQuery}`;

	if (config.submodules) {
		src += `&submodules=${config.submodules.join(',')}`;
	}

	return src;
};

interface LoadMapScriptParams {
	config: ClientConfig;
	loadCallback?: () => void;
	errorCallback?: () => void;
}

export const loadNaverMapScript = async ({
	config,
	loadCallback,
	errorCallback,
}: LoadMapScriptParams) => {
	const src = generateSrc(config);

	const script = await loadMapScript(src);

	script.addEventListener('load', () => loadCallback && loadCallback());
	script.addEventListener('error', () => errorCallback && errorCallback());

	return script;
};
