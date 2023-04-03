import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./styles.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema, loginSchemaProps } from "../../models/schema/auth";
import { useAuth } from "../../contexts/useAuth.context";
import { toast } from "react-toastify";

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginSchemaProps>({
    resolver: yupResolver(loginSchema),
  });
  const { signIn } = useAuth();
  const token = sessionStorage.getItem("token");

  if (token) {
    window.location.replace("/todo");
    return null;
  }

  const handleLogin = async (formData: loginSchemaProps) => {
    try {
      await signIn(formData);
    } catch (error) {
      toast.info("Usuário ou senha errados.");
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <img src="/logo.svg" alt="to.do" className="login-form-img" />
        <input
          className="login-form-input"
          placeholder="Digite o usuário"
          {...register("username")}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <input
          className="login-form-input"
          placeholder="Digite a senha"
          type="password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <span className="login-form-span">
          Não possuí conta? <Link to={"/registrar"}>Click aqui.</Link>
        </span>
        <button type="submit" className="login-form-button">
          Entrar
        </button>
      </form>
    </div>
  );
};
