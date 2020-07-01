import { Dispatch } from "react";

import {
  CartData,
  Action,
  Product,
  ContextData,
} from "../Types/cartRelated_types";

export function action(state: CartData, action: Action): CartData {
  switch (action.type) {
    case "add-product":
      const productAlreadyInCart = state.cart.some(
        (item) => item.id === action.payload.id
      );

      if (productAlreadyInCart) {
        const newCart = state.cart.map((item) =>
          item.id !== action.payload.id
            ? item
            : { ...item, qntd: item.qntd + action.payload.qntd }
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...state.cart, action.payload] };

    case "delete-product":
      const newCart = state.cart.reduce((accumulator: Product[], item) => {
        if (item.id !== action.payload.id) return [...accumulator, item];

        if (item.qntd > 1) {
          return [
            ...accumulator,
            {
              ...item,
              qntd: item.qntd - 1,
            },
          ];
        }

        return accumulator;
      }, []);

      return {
        ...state,
        cart: newCart,
      };

    case "refresh-totalCart":
      let total = state.cart
        .reduce((accumulator, item) => {
          let priceParsed = item.price.replace(",", ".");
          return (
            accumulator + parseFloat(priceParsed) * (item.qntd ? item.qntd : 1)
          );
        }, 0.0)
        .toFixed(2);

      return { ...state, totalCart: total };

    default:
      return state;
  }
}

export function loadStoragedData() {
  try {
    const loadedStorage = localStorage.getItem("@CartData:");
    if (!loadedStorage) {
      throw new Error("empty local storage");
    }
    const data: CartData = JSON.parse(loadedStorage);
    if (!(data.cart && data.totalCart)) {
      localStorage.clear();
      throw new Error("malformated local storage");
    }
    return data;
  } catch {
    return {
      totalCart: "",
      cart: [],
    };
  }
}

export function saveCartOnStorage(cartData: CartData) {
  const { cart, totalCart } = cartData;
  localStorage.setItem(
    "@CartData:",
    JSON.stringify({
      cart,
      totalCart,
    })
  );
}

export function updatePrice(dispatch: Dispatch<Action>) {
  dispatch({
    type: "refresh-totalCart",
  });
}

export const InitialContext: ContextData = {
  cartManager: {
    totalCart: "",
    cart: [],
    dispatch: (Action: Action) => null,
  },
  modalController: {
    showModal: false,
    setShowModal: (prevState: Boolean | string) => null,
  },
};

export const InitalCart = {
  totalCart: "",
  cart: [],
};
