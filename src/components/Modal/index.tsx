import React from 'react';

interface ContainerProps {
  pageTitle: string;
  portletTitle: string;
  handleSave(): void;
}

const Modal: React.FC<ContainerProps> = ({
  pageTitle,
  portletTitle,
  handleSave,
  children,
}) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{pageTitle}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default btn-sm sbold uppercase" data-dismiss="modal">Fechar</button>
                <button type="button" className="btn dark btn-sm sbold uppercase" data-dismiss="modal" onClick={() => { handleSave() }}>Salvar</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
