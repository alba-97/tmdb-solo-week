import * as yup from "yup";

const signupSchema = yup.object({
  username: yup
    .string()
    .min(4, "Min 4 characters")
    .max(25, "Max 25 characters")
    .required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default signupSchema;
