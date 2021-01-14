import styled from 'styled-components';

export const Title = styled.h1`
  color: #aaaaaa;
`;

export const Header = styled.header`
  background: #000000;
  height: 5.31rem;

  img {
    margin-left: 3.31rem;
    /* height: 8.68rem;
    width: 9.5rem; */
  }
`;

export const Container = styled.div`
  width: 100%;
`;

export const SubNav = styled.div`
  background: #4f9419;
  width: 100%;
  height: 12.68rem;
  display: flex;
  margin: auto 0;
  /* align-items: center; */
  justify-content: center;
  margin-bottom: 3.31rem;

  div {
    display: flex;
    flex-direction: column;
    padding-top: 3.75rem;
  }

  div:first-child {
    padding-left: 4.5rem;
    padding-right: 2.12rem;
    /* padding: 3.75rem 1.06rem 4.56rem 4.5rem; */
  }

  div + div + div {
    padding-left: 1.75rem;
  }

  /* div + div {
    display: flex;
    flex-direction: column;
  } */
`;

export const Form = styled.form`
  display: flex;
`;

export const Label = styled.label`
  color: #ffffff;
  padding-left: 0.12rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  padding-bottom: 0.18rem;
`;

export const Select = styled.select`
  padding: 0.5em 3.5em 0.5em 1em;
  width: 18.93rem;
  height: 3rem;
  border-color: #fff;
  /* border: 10px solid #cad5df; */
  border-radius: 7px;

  /* cursor: pointer; */

  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, #000000 50%),
    linear-gradient(135deg, #000000 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 5px),
    calc(100% - 15px) calc(1em + 5px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 3em;
  background-repeat: no-repeat;
`;

export const Input = styled.input`
  height: 3rem;
  width: 28.43rem;
  border-radius: 7px;
  box-shadow: none;
  box-shadow: 0 0 0 0;
  padding: 14px 16px;
`;

export const Input2 = styled.input`
  height: 3rem;
  width: 14.87rem;
  border-radius: 7px;
  box-shadow: none;
  box-shadow: 0 0 0 0;
  padding: 14px 16px;
`;

export const ButtonAdd = styled.button`
  width: 12.68rem;
  height: 3rem;
  margin-top: 5rem;
  border-radius: 7px;
  background: #006c18;
  color: #fff;
  border: 0;
  margin-left: 2.12rem;
`;

export const CardsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  justify-content: center;

  display: grid;

  grid-template-columns: repeat(5, 1fr);
  grid-gap: 32px;
`;
