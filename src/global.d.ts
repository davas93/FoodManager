export interface ElectronAPI {
    deleteUser: (uid: string) => Promise<void>;
}

declare global {
    interface Window {
        electron: ElectronAPI;
    }
}
