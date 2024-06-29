import { AppGlobalConfig } from './appConfig.model';

export const AppConfig = new AppGlobalConfig({
    isProduction: true,
    environment: 'PROD',
});
