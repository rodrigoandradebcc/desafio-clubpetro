import React from 'react';

import { HiPencil, HiX } from 'react-icons/hi';
import { Container, IconsContainer } from './styles';

interface ICountry {
  id: number;
  name: string;
  local: string;
  meta: string;
  flag: string;
  translation: string;
  // -
}

interface IProps {
  country: ICountry;
  handleDeleteCountry: (id: number) => {};
  openModal: (country: ICountry) => void;
}

const Card: React.FC<IProps> = ({
  country,
  handleDeleteCountry,
  openModal,
}: IProps) => {
  return (
    <Container>
      <header>
        <div>
          <img src={country.flag} alt="flag" />
          <h2>{country.translation}</h2>
        </div>
        <IconsContainer>
          <button type="button" onClick={() => openModal(country)}>
            <HiPencil size={20} />
          </button>

          <button type="button" onClick={() => handleDeleteCountry(country.id)}>
            <HiX size={20} />
            {/* <img src={x} alt="x" /> */}
          </button>
        </IconsContainer>
      </header>

      <section>
        <div className="body">
          <p>{country.local}</p>
          <p>{country.meta}</p>
        </div>
      </section>
    </Container>
  );
};

export default Card;
