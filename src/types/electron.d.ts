
interface ElectronAPI {
  isElectron: boolean;
  checkNetworkConnection: () => Promise<boolean>;
}

interface Window {
  electron?: ElectronAPI;
}
