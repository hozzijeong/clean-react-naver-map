interface NCPCloudClient {
	ncpClientId: string;
	submodules?: string[];
}

interface GovernmentOfficeClient {
	govClientId: string;
	submodules?: string[];
}

interface FinancialInstitutionClient {
	finClientId: string;
	submodules?: string[];
}

export type ClientConfig =
	| NCPCloudClient
	| GovernmentOfficeClient
	| FinancialInstitutionClient;
