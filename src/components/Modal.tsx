import { PropsWithChildren, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
import { getWidthScrollPage } from '../helpers/helpers';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({
  children,
  isOpen,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  const rootElement = document.getElementById('root');
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const container = document.querySelector<HTMLElement>('.container');
  const header = document.querySelector<HTMLElement>('header');

  const onWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // ts-ignore
    if (event.target.className === 'modal-wrapper') {
      onClose();
    }
  };

  if (rootElement) {
    return ReactDOM.createPortal(
      <>
        <Transition
          in={isOpen}
          timeout={350}
          nodeRef={nodeRef}
          unmountOnExit={true}
          appear={true}
          onEnter={() => {
            if (container && header) {
              header.style.paddingRight = `${parseInt(getComputedStyle(header).paddingRight) + getWidthScrollPage()}px`;
              container.style.marginRight = `${parseInt(getComputedStyle(container).marginRight) + getWidthScrollPage()}px`;
              document.body.style.overflow = 'hidden';
            }
          }}
          onExiting={() => {
            if (container && header) {
              header.style.padding = '1rem 2.5rem 1rem 2.5rem';
              document.body.style.overflow = '';
              container.style.marginRight = 'auto';
            }
          }}
        >
          {(state: any) => {
            return (
              <div
                ref={nodeRef}
                className={`modal modal--${state}`} // z-999 fixed left-0 top-0 h-full w-full overflow-hidden overflow-y-auto bg-black/30
              >
                <div
                  className="modal-wrapper" // absolute left-0 top-0 flex min-h-full w-full items-center justify-center
                  onClick={onWrapperClick}
                >
                  <div // relative m-20 w-full max-w-[600px] rounded-2xl bg-slate-700 p-[20px] text-white
                    className="modal-content"
                  >
                    {children}
                  </div>
                </div>
              </div>
            )
          }}
        </Transition>
      </>,
      rootElement,
    );
  }
};
