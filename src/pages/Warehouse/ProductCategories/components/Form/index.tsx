import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import FormComponent from '../../../../../components/Form';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../../../../../services/api';
import { useToast } from '../../../../../hooks/toast';
import getValidationErrors from '../../../../../utlis/getValidationErros';
interface ProductCategoryFormData {
  parent_id?: number;
  name: string;
}

type IsOpenInModalProps = {
  idParent: number;
  handleOnClose: () => void;
};

type TypesFormProps = {
  valueInput?: string;
  isOpenInModal?: false | IsOpenInModalProps;
  typeForm:
    | 'create'
    | {
        idUpdate: number;
        inputValue: string;
      };
};

export const FormCategory = ({
  isOpenInModal,
  typeForm,
  valueInput,
}: TypesFormProps): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    if (valueInput !== undefined) {
      setInputValue(valueInput);
    }
  }, [valueInput]);

  const onSubmitForm = useCallback(
    async (data: ProductCategoryFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (typeForm === 'create') {
          if (isOpenInModal) {
            const { handleOnClose, idParent } = isOpenInModal;
            data.parent_id = Number(idParent);
            await api.post('/productCategories', data);
            handleOnClose();
          } else {
            await api.post('/productCategories', data);
            history.push('/productCategories');
          }
        } else {
          await api.put(`/productCategories/update/${typeForm.idUpdate}`, data);
          history.goBack();
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        if (typeForm === 'create') {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description:
              'Ocorreu um erro ao fazer cadastro, por favor, tente novamente.',
          });
          if (isOpenInModal) isOpenInModal.handleOnClose();
          return;
        }
      }
    },
    [addToast, history],
  );

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (typeForm !== 'create') {
      setInputValue(typeForm.inputValue);
    }
  }, []);

  const handleChangeInputValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.currentTarget.value);
    },
    [inputValue],
  );

  return (
    <FormComponent formRef={formRef} onSubmitForm={onSubmitForm}>
      <>
        <div className="row">
          <div className="form-content col-md-3">
            <Input
              onChange={handleChangeInputValue}
              value={inputValue}
              name="name"
              className="form-control"
              label="Nome"
            />
          </div>
        </div>
        {isOpenInModal && <hr className="divider" />}
        <div className="form-actions right">
          {isOpenInModal && (
            <button
              onClick={isOpenInModal.handleOnClose}
              type="reset"
              className="btn btn-default btn-sm sbold uppercase"
            >
              Fechar
            </button>
          )}
          <Button type="submit" className="btn dark btn-sm sbold uppercase">
            Salvar
          </Button>
        </div>
      </>
    </FormComponent>
  );
};
