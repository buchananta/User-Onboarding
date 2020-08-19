import * as yup from 'yup';

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .required("Username is Required"),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required"),
  tos: yup
    .string()
    .oneOf(['true'], 'You must accept the terms of service.'),
    // required isn't required for checkboxes.
});

export default formSchema;