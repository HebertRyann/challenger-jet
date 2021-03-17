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
import { useLoading } from '../../../../../hooks/loading';
interface ProductCategoryFormData {
  id?: number;
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
        idParentUpdate?: string;
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
  const [id, setId] = useState<any>(0);

  useEffect(() => {
    if (valueInput !== undefined) {
      setInputValue(valueInput);
    }
    if (typeForm.valueOf() !== 'create') {
      setId(typeForm);
      let obj = typeForm as {
        idUpdate: number;
        inputValue: string;
        idParentUpdate?: string;
      };
      formRef.current?.setFieldValue('id', obj.idUpdate);
      formRef.current?.setFieldValue('name', obj.inputValue);
    }
  }, [valueInput, isOpenInModal, typeForm]);

  const { activeLoading, disableLoading } = useLoading();

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
            const dataCreate: { name: string; parent_id: number } = {
              name: data.name,
              parent_id: idParent,
            };
            activeLoading();
            await api.post('/productCategories', dataCreate);
            handleOnClose();
            disableLoading();
          } else {
            const dataCreate: { name: string } = {
              name: data.name,
            };

            activeLoading();
            await api.post('/productCategories', dataCreate);
            disableLoading();

            history.push('/productCategories');
          }
        } else {
          if (isOpenInModal) {
            const { handleOnClose } = isOpenInModal;
            const id = data.id;

            let dataUpdate: { name: string } = {
              name: data.name,
            };

            const { status } = await api.put(
              `/productCategories/update/${id}`,
              dataUpdate,
            );

            if (status !== 200) {
              disableLoading();
              history.push('/productCategories');
              addToast({
                type: 'error',
                title: 'Erro ao atualizar o registro',
                description:
                  'Ocorreu um erro ao fazer cadastro, por favor, tente novamente.',
              });
            }
            handleOnClose();
          } else {
            let dataUpdate: { name: string } = {
              name: data.name,
            };
            const id = data.id;

            const { status } = await api.put(
              `/productCategories/update/${id}`,
              dataUpdate,
            );

            if (status !== 200) {
              disableLoading();
              history.push('/productCategories');
              addToast({
                type: 'error',
                title: 'Erro ao atualizar o registro',
                description:
                  'Ocorreu um erro ao fazer cadastro, por favor, tente novamente.',
              });
            }
            history.push('/productCategories');
          }
        }
        disableLoading();
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
            <Input name="id" style={{ display: 'none' }} />
          </div>
        </div>
        {isOpenInModal && typeForm === 'create' ? (
          <hr className="divider" />
        ) : (
          <div style={{ margin: '10px 0' }} />
        )}
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
