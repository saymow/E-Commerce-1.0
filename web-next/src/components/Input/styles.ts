import styled, { css } from "styled-components";
import TextMaskInput from "react-text-mask";

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputStyles = css`
  background: var(--background-secondary);
  font-size: 2.4rem;
  padding: 0.5rem 1rem 0.5rem 4.7rem;
  color: var(--primary);
  outline: 0;
  border: 1px solid var(--shadow-lv1);
  border-radius: 0.5rem;
  width: 100%;

  &.haveError {
    border-color: #f00;

    ~ svg {
      border-color: #f00;
    }
  }

  &.haveNoErrors:focus {
    border-color: #0f0;

    ~ svg {
      border-color: #0f0;
    }
  }

  &.haveError:focus ~ span,
  &.haveError:hover ~ span {
    opacity: 1;
  }

  &:disabled {
    filter: brightness(90%);
  }
`;

export const Input = styled.input`
  ${InputStyles}
`;

export const MaskedInput = styled(TextMaskInput)`
  ${InputStyles}
`;

export const ErrorSpan = styled.span`
  position: absolute;
  opacity: 0;
  top: -2rem;
  height: 1.8em;
  width: 100%;
  padding: 0.2rem;

  font-size: 1.125rem;
  color: #f00;
  background-color: rgba(255, 0, 0, 0.1);

  border: 1px solid #f00;
  border-radius: 0.5rem 0.5rem 0 0;

  transition: opacity 200ms ease;
`;
