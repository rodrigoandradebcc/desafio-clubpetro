/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';
import Modal from '../Modal';
import { Form, Input, Select, Label } from './styles';
import api from '../../services/apiJson';

interface ICountry {
  id: number;
  name: string;
  local: string;
  meta: string;
  flag: string;
  translation: string;
}

interface IEditCountryData {
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
  handleUpdateCountry: (country: Omit<ICountry, 'id' | 'available'>) => void;
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
  const [countrySelected, setCountrySelected] = useState('');
  const [dataCountry, setDataCountry] = useState<IEditCountryData>(() => {
    if (editingCountry) {
      return editingCountry;
    }
    return {} as IEditCountryData;
  });
  console.log('OBJETO DATA', editingCountry);

  const [localState, setLocalState] = useState(editingCountry?.local);
  const [metaState, setMetaState] = useState(editingCountry?.meta);
  const [flag, setFlag] = useState(editingCountry?.flag);
  // const [name, setName] = useState(editingCountry.name);
  const [translation, setTranslation] = useState(editingCountry?.translation);

  const handleSubmit = useCallback(
    async (data: IEditCountryData) => {
      // EDIT A FOOD PLATE AND CLOSE THE MODAL
      handleUpdateCountryJsonApi(data);
      setIsOpen();
    },
    [handleUpdateCountryJsonApi, setIsOpen],
  );

  async function handleUpdateCountryJsonApi(
    country: Omit<ICountry, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const response = await api.put(`/add/${editingCountry?.id}`, {
        id: editingCountry?.id,
        flag: editingCountry?.flag,
        name: editingCountry?.name,
        translation: editingCountry?.translation,
        meta: metaState,
        local: localState,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingCountry}>
        <div>
          <h1>Editar</h1>
        </div>
        <div>
          <Label>País</Label>
          <Select onChange={event => setCountrySelected(event.target.value)}>
            <option value={editingCountry?.translation} selected>
              {editingCountry?.translation}
            </option>
            {countries.map(country => (
              <option
                key={country.name}
                value={country.name}
                onChange={() => {
                  setFlag(country.flag);
                  setTranslation(country.translations);
                }}
              >
                {country.translations}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Local</Label>
          <Input
            name="local"
            value={localState}
            defaultValue={editingCountry?.local}
            onChange={event => setLocalState(event.target.value)}
          />
        </div>

        <div>
          <Label>Meta</Label>
          <Input
            name="meta"
            placeholder="mês/ano"
            defaultValue={editingCountry?.meta}
            value={metaState}
            onChange={event => setMetaState(event.target.value)}
          />
        </div>

        <button
          type="submit"
          data-testid="edit-country-button"
          onClick={() => handleSubmit}
        >
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
