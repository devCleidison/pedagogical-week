import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  border-radius: 0.4rem;

  display: flex;
  flex-direction: column;

  background: rgba(38, 38, 38, 0.59);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.3px);
  -webkit-backdrop-filter: blur(6.3px);
  border: 1px solid rgba(38, 38, 38, 0.1);

  .title-card {
    font-size: 2rem;
    margin-bottom: .6rem;
  }

  .description-card {
    color: var(--gray-color);
  }

  .info-container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    height: 100%;

    span > span {
      color: var(--green-color);
      font-weight: 500;
    }

    .info-lecture {
      margin-top: 1rem;

      display: flex;
      flex-direction: column;
      row-gap: 1rem;

      .info {
        display: flex;
        align-items: center;
        justify-content: ${props => props.show ? 'center' : 'space-between'};

        height: 100%;

        .participants {
          width: 100%;

          span {
            font-size: 1.8rem;
          }

          ul {
            list-style: decimal;
            list-style-position: inside;

            li {
              color: var(--gray-color);
            }
          }
        }

        @media (min-width: 240px) {
          flex-direction: column;
          row-gap: 2rem;
        }

        .date {
          display: flex;
          flex-direction: column;
          margin-right: auto;
        }

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white-color);
          padding: 0.6rem;
          border-radius: 0.4rem;

          &.active {
            background-color: var(--green-color);
          }

          &.remove {
            background-color: var(--red-color);
          }

          &:disabled {
            background-color: var(--gray-color);
          }
        }
      }
    }
  }
`;
