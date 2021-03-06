import React from "react";

import { useGlobalState } from "../../context";

import CartModal from "../CartModal";
import NotificationError from "../NotificationError";
import CreateAddressModal from "../../Pages/Profile/Addresses/CreateAddressModal";
import UpdateAddressModal from "../../Pages/Profile/Addresses/UpdateAddressModal";
import UpdateUserModal from "../../Pages/Profile/UserInformation/UpdateUserInfoModal";

const ModalManager: React.FC = () => {
  const {
    modalController: { config, dispatch },
  } = useGlobalState();

  function closeModal() {
    dispatch({
      type: "closed",
    });
  }

  switch (config.name) {
    case "closed":
      return null;
    case "cart":
      return <CartModal closeModal={closeModal} />;
    case "create-address":
      return (
        <CreateAddressModal
          closeModal={closeModal}
          cb={config.cb as () => Promise<void>}
        />
      );
    case "update-address":
      return (
        <UpdateAddressModal
          closeModal={closeModal}
          cb={config.cb as () => Promise<void>}
          address={config.payload.address}
        />
      );
    case "update-user": {
      return (
        <UpdateUserModal
          closeModal={closeModal}
          cb={config.cb as () => Promise<void>}
          user={config.payload.user}
        />
      );
    }
    case "error": {
      return (
        <NotificationError
          title={config.payload.title}
          message={config.payload.message}
          cb={(config.cb as unknown) as () => void}
          closeModal={closeModal}
        />
      );
    }

    default:
      return null;
  }
};

export default ModalManager;
