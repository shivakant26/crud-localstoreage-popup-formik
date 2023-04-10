import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required*"),
  email: Yup.string().email("Invalid email").required("Required*"),
  department: Yup.string()
    .required("Required*"),
  gender: Yup.string()
    .required("Required*"),
  phone: Yup.string()
  .matches("^[0-9]{10}$","only int allowed with 10 digits")
    .required("Required*"),
});