type Language = 'en' | 'ko' | 'ja' | 'zh';

interface CommonClient {
	language?: Language;
}

interface NCPCloudClient extends CommonClient {
	ncpClientId: string;
	submodules?: string[];
}

interface GovernmentOfficeClient extends CommonClient {
	govClientId: string;
	submodules?: string[];
}

interface FinancialInstitutionClient extends CommonClient {
	finClientId: string;
	submodules?: string[];
}

export type ClientConfig =
	| NCPCloudClient
	| GovernmentOfficeClient
	| FinancialInstitutionClient;
