import React, { useState } from "react";

import { useGlobalState } from "../../../../Context";

import ModalMockup from "../../../../Components/Modal";
import AddressForm from "../../../../Components/AddressForm";
import LoadingBars from "../../../../Components/LoadingBars";

import { Container } from "./styles";

import { Address } from "../../../../Types/buyingFlowRelated_types";

interface Props {
  closeModal: () => void;
  cb: () => Promise<void>;
  address: Address;
}

type FormProperties =
  | "state"
  | "city"
  | "postalCode"
  | "neighborhood"
  | "number"
  | "street";

const UpdateAddressModal: React.FC<Props> = ({ closeModal, cb, address }) => {
  const {
    UserApi,
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();

  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(data: Address) {
    let formIsIntact = Object.keys(data).every(
      (key) => address[key as FormProperties] === data[key as FormProperties]
    );

    if (formIsIntact) return closeModal();

    try {
      setIsLoading(true);
      await UserApi.updateAddress(data);
      cb();
    } catch (err) {
      const { message } = err.response.data;
      modalDispatch({
        type: "error",
        payload: {
          title: "Network connection error",
          message,
        },
      });
    }

    setIsLoading(false);
    closeModal();
  }

  return (
    <ModalMockup closeModal={closeModal}>
      {isLoading ? (
        <LoadingBars height={"10rem"} width={"30%"} />
      ) : (
        <Container>
          <AddressForm
            initialState={address}
            submitHandler={submitHandler}
            action="Update"
          />
        </Container>
      )}
    </ModalMockup>
  );
};

export default UpdateAddressModal;
