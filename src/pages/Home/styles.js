import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;

export const Content = styled.div`
  padding-top: var(--nav-height);
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(26rem, 35rem));
  gap: 2rem;
  place-content: center;

  max-width: 130rem;
  margin-inline: auto;
  padding: 2rem 2.4rem var(--nav-height);
`;
