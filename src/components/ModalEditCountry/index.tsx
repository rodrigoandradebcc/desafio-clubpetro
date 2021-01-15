/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';
import Modal from '../Modal';
import Input from '../Input';
import InputMask from '../InputMask';
import { Form, Label } from './styles';

interface ICountry {
  id: number;
  name: string;
  local: string;
  meta: string;
  flag: string;
  translation: string;
}

interface IEditCountryData {
  id: number;
  name: string;
  local: string;
  meta: string;
  flag: string;
  translation: string;
}

interface IEditCountryDataSelect {
  id?: string;
  name: string;
  flag: string;
  translations?: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateCountry: (country: ICountry) => void;
  editingCountry: ICountry | undefined;
  countries: IEditCountryDataSelect[];
}

const ModalEditCountry: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingCountry,
  handleUpdateCountry,
  countries,
}: IModalProps) => {
  const formRef = useRef<FormHandles>(null);

  // const [dataCountry, setDataCountry] = useState<IEditCountryData>(() => {
  //   if (editingCountry) {
  //     return editingCountry;
  //   }
  //   return {} as IEditCountryData;
  // });

  const handleSubmit = useCallback(
    async (data: IEditCountryData) => {
      console.log('MODAL', data);
      handleUpdateCountry(data);
      setIsOpen();
    },
    [handleUpdateCountry],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingCountry}>
        <div>
          <h1>Editar</h1>
        </div>

        <div>
          <Label>Local</Label>
          <Input name="local" />
        </div>

        <div>
          <Label>Meta</Label>
          <InputMask
            mask="99/9999"
            name="meta"
            placeholder="mês/ano"
            // defaultValue={editingCountry?.meta}
          />
        </div>

        <button type="submit" data-testid="edit-country-button">
          <div className="text">Editar</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditCountry;
