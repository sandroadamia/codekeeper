import * as yup from "yup";

export const validationSchema = yup.object().shape({
  q: yup.string().required(),
  startYear: yup
    .number()
    .positive()
    .nullable()
    .min(1920)
    .max(new Date().getFullYear()),
  endYear: yup
    .number()
    .positive()
    .nullable()
    .min(1920)
    .max(new Date().getFullYear()),
});
