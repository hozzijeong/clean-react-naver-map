import { ClientConfig } from '../types';

const loadMapScript = async (src: string) => {
	const script = document.createElement('script');

	script.src = src;
	script.type = 'text/javascript';

	document.body.appendChild(script);
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

export const initializeMap = async (
	config: ClientConfig
): Promise<typeof naver.maps> => {
	const src = generateSrc(config);

	await loadMapScript(src);

	return new Promise((resolve) => {
		const naverMaps = window.naver.maps;

		return naverMaps.onJSContentLoaded(() => {
			resolve(naverMaps);
		});
	});
};
