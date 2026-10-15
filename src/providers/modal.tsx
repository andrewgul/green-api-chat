import * as React from 'react';
import { closeModal, useModalStore } from '../modals';
import { Portal } from '../components/portal';

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const modal = useModalStore(({ modal }) => modal);

  return (
    <>
      {modal && (
        <Portal>
          <div
            className="fixed left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center z-10"
            onClick={closeModal}
          >
            <div className="relative z-20" onClick={(event) => event.stopPropagation()}>
              {modal}
            </div>
          </div>
        </Portal>
      )}
      {children}
    </>
  );
};
