import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Modal } from 'Components/Modal';

import classes from '../contract.module.css';

interface Props {
  isOpen: boolean;
  closeModal: (val: boolean) => void;
  contractId: string;
}

const DeleteModal = ({ isOpen, closeModal, contractId }: Props) => {
  const del = async () => {
    fetch(`/contract-forms/${contractId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((dat) => dat);
  };
  return (
    <Modal
      classes={classes}
      title="Delete Modal"
      setIsOpen={closeModal}
      leftHeaderIcon="projects"
      isOpen={isOpen}
      modalHeader
    >
      <>
        <div className={classes.text}>Are You Sure You Want To Delete This Form? </div>

        <div className={`d-flex justify-content-between ${classes.buttonGroup}`}>
          <button className={classes.actionButton}>Delete</button>
          <button
            className={classes.actionCancelButton}
            onClick={() => {
              del();
              closeModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </>
    </Modal>
  );
};

const DeleteModalMemo = memo(DeleteModal, areEqual);
export { DeleteModalMemo as DeleteModal };
