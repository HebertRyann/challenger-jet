import React from 'react';
import { Container, CloseIcon } from './styles';

type TypeModalProps = {
  isOpenModal: boolean;
  pageTitle: string;
  onClickButtonCancel: () => void;
  Children: () => JSX.Element;
  refModal: React.LegacyRef<HTMLElement>;
};

const Modal = ({
  pageTitle,
  isOpenModal,
  Children,
  refModal,
  onClickButtonCancel,
}: TypeModalProps): JSX.Element => {
  const handleClickCloseModal = () => {
    onClickButtonCancel();
  };

  return (
    <Container openModal={isOpenModal}>
      <section ref={refModal}>
        <header>
          <h4 className="modal-title">{pageTitle}</h4>
          <div>
            <CloseIcon onClick={handleClickCloseModal} />
          </div>
        </header>
        <hr />
        <main>
          <Children />
        </main>
      </section>
    </Container>
  );
};

export default Modal;
