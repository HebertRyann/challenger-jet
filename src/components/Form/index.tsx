import React from 'react';
import { FormHandles } from '@unform/core';
import { Form as FormUnForm } from '@unform/web';
import Button from '../Button';
import Input from '../Input';

type TypesFormProps<T> = {
  formRef: React.Ref<FormHandles>;
  onSubmitForm: (data: T) => Promise<void>;
  children?: JSX.Element;
};

const Form = <T extends {}>({
  formRef,
  onSubmitForm,
  children,
}: TypesFormProps<T>): JSX.Element => {
  return (
    <div className="form-body">
      <FormUnForm ref={formRef} onSubmit={onSubmitForm}>
        <div className="row">
          <div className="form-content col-md-3">
            <Input name="name" className="form-control" label="Nome" />
          </div>
        </div>
        {children && children}
      </FormUnForm>
    </div>
  );
};

export default Form;
