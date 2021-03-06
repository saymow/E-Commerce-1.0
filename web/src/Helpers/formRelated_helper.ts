import * as Yup from "yup";

const loginYup = {
  email: Yup.string()
    .required("Email is required.")
    .max(320, "Email must have 320 characters or less.")
    .email("Email must have a valid format."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must have at least 8 characters.")
    .max(32, "Password must have less than 32 characters.")
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/g,
      "Password must contain capitalized letters and digits."
    ),
};

const LoginSchema = Yup.object(loginYup);

const RegisterSchema = Yup.object({
  ...loginYup,
  name: Yup.string()
    .required("Name is required.")
    .min(4, "Name must have at least 4 characters.")
    .max(60, "Name must have 60 characters or less."),
  confirmPassword: Yup.string()
    .required("Confirmation password is required.")
    .oneOf([Yup.ref("password")], "Confirmation does not match with password."),
  cpf: Yup.string()
    .required("Cpf is required.")
    .matches(
      /(\d{3})(.{1})(\d{3})(.{1})(\d{3})(-{1})(\d{2})/,
      "Invalid format of CPF."
    ),
  birthDate: Yup.string().required("Birth date is required"),
});

const changePassSchema = Yup.object({
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must have at least 8 characters.")
    .max(32, "Password must have less than 32 characters.")
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/g,
      "Password must contain capitalized letters and digits."
    ),
  newPassword: Yup.string()
    .required("Password is required.")
    .min(8, "Password must have at least 8 characters.")
    .max(32, "Password must have less than 32 characters.")
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/g,
      "Password must contain capitalized letters and digits."
    ),
  confirmation: Yup.string()
    .required("Confirmation password is required.")
    .oneOf(
      [Yup.ref("newPassword")],
      "Confirmation does not match with password."
    ),
});

const DetailedUserSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(4, "Name must have at least 4 characters.")
    .max(60, "Name must have 60 characters or less."),
  cpf: Yup.string()
    .required("Cpf is required.")
    .matches(
      /(\d{3})(.{1})(\d{3})(.{1})(\d{3})(-{1})(\d{2})/,
      "Invalid format of CPF."
    ),
  birth_date: Yup.string().required("Birth date is required"),
  sex: Yup.number()
    .required("Sex options must be filled")
    .oneOf([0, 1, 2, 9], "Sex option invalid"),
  telephone: Yup.string()
    .nullable()
    .matches(
      /(\d{2})( {1})(\d{1})( {1})(\d{4})( {1})(\d{4})/,
      "Invalid telephone format"
    ),
});

const AddressSchema = Yup.object().shape({
  state: Yup.string().required("State is required."),
  city: Yup.string().required("City is required."),
  neighborhood: Yup.string().required("Neighborhood is required."),
  street: Yup.string().required("Street is required"),
  number: Yup.number()
    .required("House number is required.")
    .integer("Number must be integer.")
    .min(1, "Invalid format.")
    .max(9999, "Invalid format."),
  postalCode: Yup.string()
    .required("Postal code is required")
    .matches(/(\d{5})(-{1})(\d{3})/, "Invalid format"),
});

const cpfMask = [
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

const dateMask = [/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

const postalCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

const telephoneMask = [
  /\d/,
  /\d/,
  " ",
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export {
  LoginSchema,
  DetailedUserSchema,
  RegisterSchema,
  changePassSchema,
  AddressSchema,
  cpfMask,
  dateMask,
  postalCodeMask,
  telephoneMask,
};
