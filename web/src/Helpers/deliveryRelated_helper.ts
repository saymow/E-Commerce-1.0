import { calcularPrecoPrazo, consultarCep } from "correios-brasil";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Services, DeliveryResponse } from "../Types/deliveryRelated_types";

interface LocationByCep {
  logradouro: string;
  bairro: string;
  uf: string;
  localidade: string;
  cep: string;
}

export default class DeliveryManager {
  locationByCep: {
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    cep: string;
  };
  constructor() {
    this.locationByCep = {
      uf: "",
      city: "",
      neighborhood: "",
      street: "",
      cep: "",
    };
  }

  async calcDelivery(
    cep: string,
    qntd: number
  ): Promise<DeliveryResponse[] | undefined> {
    let Services = {
      Sedex: "04014",
      Pac: "04510",
    };

    let arg = {
      sCepOrigem: "02513010",
      sCepDestino: cep,
      nVlPeso: (0.2 * qntd).toString(),
      nCdFormato: "3",
      nVlComprimento: "20",
      nVlAltura: "3",
      nVlLargura: "10",
      nVlDiametro: "0",
    };

    let args = Object.keys(Services).map((service) => ({
      ...arg,
      nCdServico: Services[service as Services],
    }));

    const data: DeliveryResponse[] = await Promise.all(
      args.map((arg) => {
        return calcularPrecoPrazo(arg);
      })
    );

    if (
      data.find(
        (option) => option.MsgErro || option?.message === "Failed to fetch"
      )
    ) {
      return;
    }

    const serializedData = data.map((option) => ({
      ...option,
      Metodo: Object.keys(Services).find(
        (service) => Services[service as Services] === option.Codigo
      ),
      Valor: option.Valor.replace(",", "."),
    }));

    return serializedData;
  }

  async searchLocationByCep(cep: string) {
    await consultarCep(cep)
      .then((data: LocationByCep) => {
        console.log(data);

        this._setLocationByCep({
          uf: data.uf,
          city: data.localidade,
          neighborhood: data.bairro,
          street: data.logradouro,
          cep: data.cep,
        });
      })
      .catch((error: any) => console.log(error));
  }

  _setLocationByCep(data: {
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    cep: string;
  }) {
    this.locationByCep = {
      ...data,
    };
  }
}