import { create } from 'zustand';

type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export const useCredentialsStore = create<{ credentials: Credentials | null }>(() => ({
  credentials: null,
}));

export const setCredentials = (credentials: Credentials | null) =>
  useCredentialsStore.setState({ credentials });
