import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Switch, useHistory } from "react-router-dom";

import { useGlobalState } from "../../../Context";
import DeliveryApiManager from "../../../Helpers/deliveryRelated_helper";
import { useShoppingRoutes } from "../../../Hooks/RouteConfig";

import RestrictedRoute from "../ShoppingFlowRestrictedRoute";

import {
  Container,
  ProgressMock,
  Progress,
  ProgressMade,
  Step,
} from "./styles";

import { Steps } from "../../../Types/buyingFlowRelated_types";

const BuyingFlowContext = createContext(
  {} as {
    DeliveryApi: DeliveryApiManager;
    next: () => void;
    resetFlow: () => void;
    receipt_url: string;
    setReceipt_url: Dispatch<SetStateAction<string>>;
  }
);

const BuyingFlowManager: React.FC = () => {
  const history = useHistory();
  const {
    userController: { loggedIn },
    buyingController: { step: currentStep, dispatch },
  } = useGlobalState();
  const DeliveryApi = useMemo(() => new DeliveryApiManager(), []);
  const routeConfig = useShoppingRoutes(loggedIn, currentStep);
  const [receipt_url, setReceipt_url] = useState("");

  const next = useCallback(() => {
    // Since when this function is called, the context has not yet been updated,
    // i'm considering current step + 1, which isn't that bad because the data has already been validated.
    const route = routeConfig.find((route) => route.step === currentStep + 1);
    const path = route?.path || "/checkout";

    history.push(path);
  }, [currentStep, history, routeConfig]);

  const resetFlow = useCallback(() => dispatch({ type: "set-reset-flow" }), [
    dispatch,
  ]);

  useEffect(() => {
    return resetFlow();
  }, [resetFlow]);

  return (
    <Container>
      <ProgressMock>
        <Progress>
          <ProgressMade
            position={currentStep}
            stepsTotal={routeConfig.length}
          />
          {routeConfig.map((route, index) => (
            <Step
              key={route.step}
              position={index}
              stepsTotal={routeConfig.length}
              reached={currentStep >= route.step}
            >
              <div />
              <p>{route.name}</p>
            </Step>
          ))}
        </Progress>
      </ProgressMock>
      <BuyingFlowContext.Provider
        value={{
          DeliveryApi,
          next,
          resetFlow,
          receipt_url,
          setReceipt_url,
        }}
      >
        <Switch>
          {routeConfig.map((route) => (
            <RestrictedRoute
              key={route.step}
              expectedStep={route.step as Steps}
              currentStep={currentStep}
              exact={route.exact}
              path={route.path}
              availablePaths={route.availablePaths}
              component={route.component}
            />
          ))}
        </Switch>
      </BuyingFlowContext.Provider>
    </Container>
  );
};

export function useBuyingFlowState() {
  const context = useContext(BuyingFlowContext);

  return context;
}

export default BuyingFlowManager;
