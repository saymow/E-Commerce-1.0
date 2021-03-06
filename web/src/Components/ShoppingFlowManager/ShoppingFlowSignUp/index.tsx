import React from "react";
import { FormikHelpers } from "formik";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../../Context";
import { useBuyingFlowState } from "../Controller";

import { Container, SignUpContainer, LinkWrapper, LoginIcon } from "./styles";
import SignUpForm from "../../SignUpForm";

interface DataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  cpf: string;
}

const SignUp: React.FC = () => {
  const { next } = useBuyingFlowState();
  const {
    userController: { dispatch },
    buyingController: { dispatch: FlowDispatch },
    modalController: { dispatch: modalDispatch },
    UserApi,
  } = useGlobalState();

  async function handleSubmit(
    values: DataProps,
    { setErrors }: FormikHelpers<DataProps>
  ) {
    try {
      const { name, email, password, cpf, birthDate } = values;

      const response = await UserApi.signUp(
        name,
        email,
        password,
        cpf,
        birthDate
      );

      dispatch({
        type: "set-loggedIn",
        payload: {
          email: response.email,
          name: response.name,
        },
      });

      FlowDispatch({
        type: "set-logged",
      });

      next();
    } catch (err) {
      if (err.response.status === 409) return setErrors(err.response.data);

      const { message } = err.response.data;
      modalDispatch({
        type: "error",
        payload: {
          title: "Network connection error",
          message,
        },
      });
    }
  }

  return (
    <Container>
      <SignUpContainer>
        <SignUpForm handleSubmit={handleSubmit} />
      </SignUpContainer>
      <LinkWrapper>
        <LoginIcon />
        <Link to="/checkout/authenticate">Sign in</Link>
      </LinkWrapper>
    </Container>
  );
};

export default SignUp;
