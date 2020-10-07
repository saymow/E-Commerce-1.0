import styled from "styled-components";

import { SignInAlt } from "styles/icons";

export const Container = styled.div`
  position: relative;
  max-width: 86rem;
  width: 90%;
  padding: 2rem 1rem 5rem 1rem;
  background-color: var(--shadow-lv1);
  margin: auto;

  border-radius: 0.5rem;
`;

export const FormContainer = styled.main`
  margin: auto;
  width: 70%;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const LinkWrapper = styled.span`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
  font-size: 1.6rem;
  > a {
    text-decoration: none;
    color: var(--primary);
  }
`;

export const SignInIcon = styled(SignInAlt)`
  width: 2rem;
  height: 2rem;
  margin-right: 0.3rem;
`;
