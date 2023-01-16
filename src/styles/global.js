import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root{ 
    --font: 'Poppins', sans-serif;

    --black-color: #1e1e1e;
    --black-color-light: #262626;
    --white-color: #fafafa;
    --gray-color: #a3a3a3;
    --green-color: #22c55e;
    --green-color-dark: #166534;
    --green-color-hover: #16a34a;
    --red-color: #ef4444;

    --nav-height: 8vh;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body, input, button, select, a {
    font-family: var(--font);
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;

    color: var(--white-color);
  }

  body {
    background-color: var(--black-color);

    min-width: 32rem;
  }

  img {
    max-width: 100%;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  input {
    border: none;
    color: var(--black-color);
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  h1.title {
    font-weight: 500;
    font-size: 2.4rem;
    text-align: center;

    margin-block: 2rem;
  }
`;
