import { create } from 'zustand';

const getSavedCredentials = (): Credentials | null => {
  const idInstance = sessionStorage.getItem('idInstance');
  const apiTokenInstance = sessionStorage.getItem('apiTokenInstance');

  if (idInstance && apiTokenInstance) {
    return { idInstance, apiTokenInstance };
  }

  return null;
};

type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
  subdomain?: string;
};

export const useCredentialsStore = create<{ credentials: Credentials | null }>(() => ({
  credentials: getSavedCredentials(),
}));

export const setCredentials = (
  credentials: Credentials | null,
  { saveToSessionStorage = true }: { saveToSessionStorage?: boolean } = {},
) => {
  useCredentialsStore.setState({ credentials });

  if (saveToSessionStorage && credentials) {
    sessionStorage.setItem('idInstance', credentials?.idInstance);
    sessionStorage.setItem('apiTokenInstance', credentials.apiTokenInstance);
  }
};
