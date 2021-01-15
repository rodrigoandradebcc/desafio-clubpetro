import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import apiJson from '../../services/apiJson';

import {
  Header,
  Container,
  SubNav,
  Label,
  Select,
  Input,
  Input2,
  ButtonAdd,
  CardsContainer,
  Form,
} from './styles';

import logoImg from '../../assets/logoclubpetro.svg';
import Card from '../../components/Card/index';
import ModalEditCountry from '../../components/ModalEditCountry';

interface ICountry {
  id?: string;
  name: string;
  flag: string;
  // br: Translate;
  translations?: string;
}

interface ICountryJson {
  id: number;
  name: string;
  local: string;
  meta: string;
  flag: string;
  translation: string;
  // -
}

const Dashboard: React.FC = () => {
  const [countrySelected, setCountrySelected] = useState('');
  const [
    countrySelectedEditForm,
    setCountrySelectedEditForm,
  ] = useState<ICountryJson>();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<ICountryJson>(
    {} as ICountryJson,
  );
  const [databaseCountries, setDatabaseCountries] = useState<ICountryJson[]>(
    [],
  );
  const [local, setLocal] = useState(editingCountry.local);
  const [meta, setMeta] = useState(editingCountry.meta);

  useEffect(() => {
    api.get('/all').then(response => {
      const array = response.data.map(
        (item: {
          name: string;
          flag: string;
          translations: { br: string };
        }) => {
          return {
            name: item.name,
            flag: item.flag,
            translations: item.translations.br,
          };
        },
      );
      setCountries(array);
    });

    loadCountries();
  }, []);

  async function handleAddCrountry(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const data = countries.filter(item => item.name === countrySelected);
    const { flag, translations: translation } = data[0];

    await apiJson.post('/add', {
      name: countrySelected,
      local,
      meta,
      flag,
      translation,
    });
    await loadCountries();
  }

  async function handleUpdateCountry(country: ICountryJson): Promise<void> {
    try {
      console.log('UPDATE', country);
      const response = await apiJson.put(`/add/${editingCountry.id}`, {
        ...editingCountry,
        ...country,
      });
      setDatabaseCountries(
        databaseCountries.map(mappedCountry =>
          mappedCountry.id === editingCountry.id
            ? { ...response.data }
            : mappedCountry,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function loadCountries(): Promise<void> {
    const response = await apiJson.get('/add');
    setDatabaseCountries(response.data);
  }

  async function handleDeleteCountry(id: number): Promise<void> {
    try {
      await apiJson.delete(`/add/${id}`);

      setDatabaseCountries(
        databaseCountries.filter(country => country.id !== id),
      );
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditCountry(country: ICountryJson): void {
    setEditingCountry(country);
    toggleEditModal();
  }

  function toggleModal(countrySel: ICountryJson): void {
    setModalOpen(!modalOpen);
    setCountrySelectedEditForm(countrySel);
  }

  function toggleEditModal(): void {
    setModalOpen(false);
    loadCountries();
  }

  return (
    <>
      <Header>
        <img src={logoImg} alt="Logo" />
      </Header>

      <Container>
        <ModalEditCountry
          isOpen={modalOpen}
          setIsOpen={toggleEditModal}
          handleUpdateCountry={handleUpdateCountry}
          editingCountry={countrySelectedEditForm}
          countries={countries}
        />
        <SubNav>
          <Form onSubmit={handleAddCrountry}>
            <div>
              <Label>País</Label>
              <Select
                onChange={event => setCountrySelected(event.target.value)}
              >
                <option value="" disabled selected>
                  Selecione ...
                </option>
                {countries.map(country => (
                  <option key={country.name} value={country.name}>
                    {country.translations}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Local</Label>
              <Input
                name="local"
                value={local}
                type="text"
                placeholder="Defina o local que deseja conhecer"
                onChange={event => setLocal(event.target.value)}
              />
            </div>

            <div>
              <Label>Meta</Label>
              <Input2
                name="meta"
                value={meta}
                type="text"
                placeholder="mês/ano"
                onChange={event => setMeta(event.target.value)}
              />
            </div>
            <ButtonAdd type="submit">Adicionar</ButtonAdd>
          </Form>
        </SubNav>
        <CardsContainer>
          {databaseCountries &&
            databaseCountries.map(country => (
              <Card
                openModal={() => toggleModal(country)}
                key={country.id}
                country={country}
                handleEditCountry={handleEditCountry}
                handleDeleteCountry={handleDeleteCountry}
              />
            ))}
        </CardsContainer>
      </Container>
    </>
  );
};

export default Dashboard;
