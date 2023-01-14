import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: var(--nav-height);

  background-color: var(--black-color-light);

  z-index: 1000;
`;

export const Content = styled.div`
  height: 100%;
  max-width: 130rem;
  margin-inline: auto;
  padding-inline: 2.4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    display: flex;
    align-items: center;
    column-gap: 1rem;

    font-size: 2rem;
  }

  nav {
    position: absolute;
    top: var(--nav-height);
    right: -150%;

    ul {
      display: flex;
      column-gap: 2.4rem;

      a.active {
        color: var(--green-color);
      }
    }

    &.show {
      display: initial;
      right: initial;
      left: 0;

      height: calc(100vh - var(--nav-height));
      width: 100%;

      background-color: var(--black-color-light);

      ul {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        row-gap: 3rem;

        a, button {
          font-size: 2rem;
        }
      }
    }

    @media (min-width: 600px) {
      position: initial;
      top: initial;
      right: initial;
    }
  }

  button.toggle-menu {
    display: flex;
    align-items: center;

    font-size: 2.4rem;
    color: var(--white-color);

    @media (min-width: 600px) {
      display: none;
    }
  }
`;
