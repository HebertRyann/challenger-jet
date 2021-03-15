import React from 'react';
import { FormHandles } from '@unform/core';
import { Form as FormUnForm } from '@unform/web';

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
    <FormUnForm ref={formRef} onSubmit={onSubmitForm}>
      {children && children}
    </FormUnForm>
  );
};

export default Form;
