import React from "react";
import "./styles.scss";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema, registerSchemaProps } from "../../models/schema/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../contexts/useAuth.context";

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registerSchemaProps>({
    resolver: yupResolver(registerSchema),
  });
  const { user, signUp } = useAuth();

  if (user) {
    window.location.replace("/todo");
    return null;
  }

  const handleRegister = async (formData: registerSchemaProps) => {
    await signUp(formData);
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
        <img src="/logo.svg" alt="to.do" className="register-form-img" />
        <input
          className="register-form-input"
          placeholder="Digite seu nome"
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          className="register-form-input"
          placeholder="Digite o usuário"
          {...register("username")}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <input
          className="register-form-input"
          placeholder="Digite a senha"
          type="password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <span className="register-form-span">
          Já possuí conta? <Link to={"/"}>Click aqui.</Link>
        </span>
        <button type="submit" className="register-form-button">
          Entrar
        </button>
      </form>
    </div>
  );
};
