import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Modal } from 'Components/Modal';

import { Label } from 'Components/Label';
import { Form } from 'Containers/Form';
import classes from '../contract.module.css';

interface Props {
  isOpen: boolean;
  closeModal: (val: boolean) => void;
}

const CreateModal = ({ isOpen, closeModal }: Props) => {
  return (
    <Modal
      classes={classes}
      title="Add Contract Form"
      setIsOpen={closeModal}
      leftHeaderIcon="projects"
      isOpen={isOpen}
      modalHeader
    >
      <>
        <div className={classes.formComp}>
          <div>
            <Label ariaLabel="formName" id="form" htmlFor="formName">
              Form Name
            </Label>
            <input id="formName" type={'text'} placeholder="Authorization Form"></input>
          </div>
          <div>
            <Label ariaLabel="requiredSignature" id="signature" htmlFor="requiredSignature">
              Required Signature
            </Label>
            <input id="requiredSignature" type={'checkbox'}></input>
          </div>
          <Label ariaLabel="TextFields">Contract Template</Label>
          <div className={classes.textArea}>
            <textarea id="smaller" max-rows={5} cols={10} />
            <textarea id="larger" rows={30} cols={30} />
          </div>
          <div className={`d-flex justify-content-between ${classes.buttonGroup}`}>
            <button className={classes.addBtn}>Add Form</button>
          </div>
        </div>
      </>
    </Modal>
  );
};

const CreateModalMemo = memo(CreateModal, areEqual);
export { CreateModalMemo as CreateModal };
