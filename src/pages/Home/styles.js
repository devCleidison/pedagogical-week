import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  
  min-height: calc(100vh - 6.8rem);
`;

export const Content = styled.div`
  margin-top: var(--nav-height);
  min-height: 100vh;

  position: relative;

  .warning {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 2rem;

    h2 {
      color: #facc15;
    }

    span {
      font-size: 3rem;
      text-align: center;
      max-width: 90%;
    }
  }

  .finished {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 90%;
    max-width: 50rem;
    /* height: 60rem; */

    padding: 2.8rem;
    border-radius: 1.6rem;

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    background-color: var(--black-color-light);

    button {
      position: absolute;
      top: 2rem;
      right: 2rem;

      font-size: 2.4rem;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      color: #facc15;
      font-size: 4rem;
    }

    p {
      margin-bottom: 1rem;
    }

    span, p {
      font-size: 2rem;
      text-align: center;
    }

    .canceled {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;

      h3 {
        color: #facc15;
        margin-top: 3rem;
      }

      p {
        margin-bottom: initial;
        font-size: initial;

        span {
          color: #facc15;
          font-size: initial;
        }
      }
    }
  }

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
  grid-template-columns: repeat(auto-fit, minmax(26rem, 35rem));
  gap: 2rem;
  place-content: center;

  max-width: 130rem;
  margin-inline: auto;
  padding: 2rem 2.4rem var(--nav-height);

  padding-bottom: 6rem;
`;
