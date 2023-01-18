import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;

export const Content = styled.div`
  padding-top: var(--nav-height);

  .select-turn {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 2rem;
    margin-bottom: 2rem;

    select {
      padding: 0.6rem 1.4rem;
      border-radius: 0.4rem;

      background-color: var(--black-color-light);

      outline-color: var(--green-color);
      color: var(--white-color);

      &:invalid,
      option:disabled {
        color: var(--gray-color);
      }

      option {
        color: var(--white-color);
      }
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(26rem, 60rem));
  gap: 2rem;
  place-content: center;

  max-width: 130rem;
  margin-inline: auto;
  padding: 2rem 2.4rem var(--nav-height);
`;