import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useGlobalState } from "../../Context";

import { Steps } from "../../Types/buyingFlowRelated_types";

interface Props {
  exact?: boolean;
  path: string;
  component: React.FC;
  currentStep: Steps;
  expectedStep: Steps;
  authenticate?: boolean;
}

const RestrictedRoute: React.FC<Props> = ({
  currentStep,
  expectedStep,
  authenticate,
  component: Component,
  ...rest
}) => {
  const {
    userController: { loggedIn },
  } = useGlobalState();

  console.log(currentStep + " === " + expectedStep);

  return (
    <Route
      {...rest}
      render={() => {
        if (currentStep === expectedStep && (authenticate ? loggedIn : true))
          return <Component />;
        else return <Redirect to="/checkout" />;
      }}
    />
  );
};

export default RestrictedRoute;
