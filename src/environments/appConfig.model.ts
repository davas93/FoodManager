export class AppGlobalConfig {
    APPLICATION_NAME: string = 'Food Manager';
    isProduction: boolean = false;
    environment: 'LOCAL' | 'DEV' | 'PROD' | 'STAGING' | 'MOCK' = 'DEV';
    mocking: boolean = false;

    constructor(input: Partial<AppGlobalConfig>) {
        Object.assign(this, input);
    }
}
