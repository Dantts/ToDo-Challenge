import * as yup from "yup";

export interface todoSchemaProps {
  title: string;
}

export const todoSchema = yup.object().shape({
  title: yup
    .string()
    .min(4, "Tamanho min de 4 caracteres")
    .max(20, "Tamanho max de 20 caracteres")
    .required("Campo obrigatório."),
});
