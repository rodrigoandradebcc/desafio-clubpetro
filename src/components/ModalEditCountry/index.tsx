/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';
import Modal from '../Modal';
import { Form, Input, Select, Label } from './styles';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [countrySelected, setCountrySelected] = useState('');
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
          <Label>País</Label>
          <Select
            name="name"
            onChange={event => {
              setCountrySelected(event.target.value);
            }}
          >
            <option value={editingCountry?.translation} selected>
              {editingCountry?.translation}
            </option>
            {countries.map(country => (
              <option key={country.name} value={country.name}>
                {country.translations}
              </option>
            ))}
          </Select>
        </div>
        <Label>Local</Label>
        <Input
          name="local"
          defaultValue={editingCountry?.local}
          ref={inputRef}
        />
        <div />

        <div>
          <Label>Meta</Label>
          <Input
            name="meta"
            placeholder="mês/ano"
            defaultValue={editingCountry?.meta}
            ref={inputRef}
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
