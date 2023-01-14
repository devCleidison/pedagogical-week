import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  row-gap: 3rem;

  position: relative;

  .greetings {
    z-index: 100;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    max-width: 90rem;
    width: 90%;

    text-align: center;

    h1 {
      font-size: 2.4rem;
      margin-bottom: 1.4rem;
    }

    span {
      font-size: 1.8rem;
      color: var(--white-color);
      max-width: 90%;
    }
  }

  @media (max-width: 700px) {
    overflow-x: hidden;

    padding-bottom: 4rem;
  }
`;

export const Content = styled.div`
  max-width: 90rem;
  width: 90%;

  display: flex;

  z-index: 10;

  border-radius: 1.6rem;
  overflow: hidden;

  background: rgba(38, 38, 38, 0.59);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.3px);
  -webkit-backdrop-filter: blur(6.3px);
  border: 1px solid rgba(38, 38, 38, 0.1);

  .form-container {
    padding: 3rem;
    width: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      color: var(--green-color);
      margin-bottom: 3rem;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 90%;

      input {
        width: 100%;
        padding: 0.8rem 1.4rem;
        border-radius: 0.4rem;

        &::placeholder {
          color: var(--gray-color);
        }

        & + input {
          margin-top: 2rem;
        }

        &:focus {
          outline-color: var(--green-color);
        }
      }

      select {
        width: 100%;
        padding: 0.8rem 1.4rem;
        margin-top: 2rem;
        border-radius: 0.4rem;

        outline-color: var(--green-color);
        color: var(--black-color-light);

        &:invalid,
        option:disabled {
          color: var(--gray-color);
        }

        option {
          color: var(--black-color-light);
        }
      }

      button {
        background-color: var(--green-color);
        width: 100%;

        margin-top: 3rem;
        padding: 1rem 1.4rem;
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

    p {
      margin-top: 3rem;

      button {
        color: var(--green-color);
      }
    }
  }

  img {
    max-width: 50%;
    margin-left: auto;
  }

  @media (max-width: 846px) {
    .form-container {
      width: 60%;
    }

    img {
      max-width: 40%;
    }
  }

  @media (max-width: 700px) {
    .form-container {
      width: 80%;
      margin-inline: auto;
    }

    img {
      display: none;
    }
  }

  @media (max-width: 550px) {
    .form-container {
      width: 100%;
      padding: 2rem;

      p {
        text-align: center;
      }
    }
  }

  @media (max-width: 340px) {
    .form-container {
      padding: 1rem;
    }
  }
`;


export const Ball = styled.div`
  position: absolute;
  top: ${(props) => props.positionY}%;
  left: ${(props) => props.positionX}%;

  width: ${(props) => props.w}rem;
  height: ${(props) => props.h}rem;

  border-radius: 50%;

  background: rgba(34, 197, 94, 0.35);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.3px);
  -webkit-backdrop-filter: blur(6.3px);
  border: 1px solid rgba(34, 197, 94, 0.1);

  @media (max-width: 1000px) {
    width: calc(${(props) => props.w}rem - 15rem);
    height: calc(${(props) => props.w}rem - 15rem);
  }

  @media (max-width: 700px) {
    top: 0;
    left: 50%;

    transform: translate(-50%, -50%);

    width: calc(${(props) => props.w}rem + 10rem);
    height: calc(${(props) => props.w}rem + 10rem);
  }
`;
