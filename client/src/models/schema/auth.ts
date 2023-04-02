import * as yup from "yup";

export interface registerSchemaProps {
  username: string;
  password: string;
  name: string;
}

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Tamanho min de 4 caracteres")
    .max(20, "Tamanho max de 20 caracteres")
    .required("Campo obrigatório."),
  password: yup
    .string()
    .min(4, "Tamanho min de 4 caracteres")
    .max(20, "Tamanho max de 20 caracteres")
    .required("Campo obrigatório."),
  name: yup
    .string()
    .min(4, "Tamanho min de 4 caracteres")
    .max(20, "Tamanho max de 20 caracteres")
    .required("Campo obrigatório."),
});

export interface loginSchemaProps {
  username: string;
  password: string;
}

export const loginSchema = yup.object().shape({
  username: yup.string().required("Campo obrigatório."),
  password: yup.string().required("Campo obrigatório."),
});
