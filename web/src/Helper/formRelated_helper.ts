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

export { LoginSchema, RegisterSchema, cpfMask, dateMask };