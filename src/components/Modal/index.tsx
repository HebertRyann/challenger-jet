import React, { useRef, useState } from 'react';
import { Container, CloseIcon } from './styles';

type TypeModalProps = {
  isOpenModal: boolean;
  pageTitle: string;
  portletTitle: string;
  onClickButtonSave: () => void;
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
  onClickButtonSave,
  portletTitle,
}: TypeModalProps): JSX.Element => {
  const handleClickCloseModal = () => {
    onClickButtonCancel();
  };

  const handleClickSaveButtonModal = () => {
    onClickButtonSave();
  };

  return (
    <Container openModal={isOpenModal}>
      <section ref={refModal}>
        <header>
          <div>{pageTitle}</div>
          <div>
            <CloseIcon onClick={handleClickCloseModal} />
          </div>
        </header>
        <hr />
        <span>{portletTitle}</span>
        <main>
          <Children />
        </main>
      </section>
    </Container>
  );
};

export default Modal;
