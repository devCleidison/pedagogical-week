import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  justify-content: center;

  max-width: 112rem;
  margin-inline: auto;
  padding: var(--nav-height) 2.4rem 4rem;

  form {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    max-width: 50rem;
    width: 100%;

    background-color: var(--black-color-light);
    padding: 3rem;

    border-radius: 1.6rem;

    label {
      display: flex;
      flex-direction: column;
      row-gap: 0.6rem;

      input, input[type="datetime-local"] {
        border-radius: 0.4rem;
        padding: 0.6rem 1.4rem;
        width: 100%;

        outline-color: var(--green-color);
      }
    }

    button {
      background-color: var(--green-color);
      margin-inline: auto;

      margin-top: 3rem;
      padding: .8rem 1.4rem;
      border-radius: 0.4rem;

      box-shadow: 0 0.4rem 0 var(--green-color-dark);

      font-weight: 500;
      color: var(--white-color);

      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: var(--green-color-hover);
      }
    }
  }
`;
