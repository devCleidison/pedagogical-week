import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 6.4rem;
    color: var(--white-color);

    animation: animationBounceLoadingIcon 1s infinite;

    @keyframes animationBounceLoadingIcon {
      0%,
      100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }
  }
`;
