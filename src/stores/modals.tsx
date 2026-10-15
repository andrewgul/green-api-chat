import { create } from 'zustand';

export const useModalStore = create<{ modal: React.ReactNode | null }>(() => ({
  modal: null,
}));

export const openModal = (modal: React.ReactNode) => useModalStore.setState({ modal });

export const closeModal = () => useModalStore.setState({ modal: null });
