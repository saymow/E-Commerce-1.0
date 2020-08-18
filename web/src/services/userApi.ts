import api, { ApiType } from "./api";

import { Address, DeliveryState } from "../Types/buyingFlowRelated_types";
import { CartData } from "../Types/cartRelated_types";

interface CheckoutProp {
  token: any;
  address: Address;
  shippment: DeliveryState;
  cartData: CartData;
}

export default class ApiManager {
  api: ApiType;
  constructor() {
    this.api = api;
    /* The context has it inital data using this class to create UserApi object, therefore if the page is opened
     in an authenticated page the user should be able to load his/her (if correctly authenticaded) data in this first load.
     A workaround would be checking if the user loggedin state is already set in each api call (and set loggedin 
     as useEffect dependency) though it would be worse.*/
    this.retrieveToken();
  }

  async signIn(email: string, password: string) {
    const response = await this.api.post("/login", {
      email,
      password,
    });

    if (response.data.error) return response.data;

    this._storeToken(response.data.token);

    return response.data.userData;
  }

  async signUp(
    name: string,
    email: string,
    password: string,
    cpf: string,
    birthDate: string
  ) {
    const response = await this.api.post("/register", {
      name,
      email,
      password,
      cpf,
      birthDate,
    });

    this._storeToken(response.data.token);

    return response.data.userData;
  }

  async checkout(data: CheckoutProp) {
    const response = await this.api.post("/checkout", {
      data,
    });

    if (response.status !== 200) {
      return {
        error: response.data.message,
      };
    }

    return response.data.charge.receipt_url;
  }

  async getAddresses() {
    const response = await this.api.get("/users/addresses");
    return response;
  }

  async getPersonalInfo() {
    console.log(this.api.defaults.headers);
    const response = await this.api.get("/users/me");

    return response.data;
  }

  async getOrderHistory() {
    const response = await this.api.get("/users/purchases");

    return response.data;
  }

  retrieveToken() {
    const token = localStorage.getItem("@Auth:");

    if (!token) return false;

    this.api.defaults.headers["Authorization"] = `Bearer ${token}`;

    return true;
  }

  validifyToken() {
    return this.api
      .get("/account")
      .then((response) => response.data)
      .catch((error) => false);
  }

  _storeToken(token: string) {
    this.api.defaults.headers["Authorization"] = "Bearer " + token;
    localStorage.setItem("@Auth:", token);
  }
}
