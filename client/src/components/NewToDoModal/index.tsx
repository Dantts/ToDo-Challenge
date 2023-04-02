import React, { SyntheticEvent, useState } from "react";
import ReactModal from "react-modal";

import "./styles.scss";
import { useForm } from "react-hook-form";
import { todoSchema, todoSchemaProps } from "../../models/schema/todo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategoryTodo } from "../../contexts/useCategoryTodo.context";

interface NewToDoModalProps {
  isOpen: boolean;
  categoryId: string;
  onRequestClose: () => void;
}

export const NewToDoModal = ({
  isOpen,
  categoryId,
  onRequestClose,
}: NewToDoModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<todoSchemaProps>({
    resolver: yupResolver(todoSchema),
  });
  const { createTodoByCategory } = useCategoryTodo();
  const [isClose, setIsClose] = useState(false);

  const handleCreateNewToDo = async (dataForm: todoSchemaProps) => {
    await createTodoByCategory({ ...dataForm, category: categoryId });
    closeModal();
  };

  const closeModal = () => {
    setIsClose(true);
    setTimeout(() => {
      onRequestClose();
      setIsClose(false);
      setValue("title", "");
    }, 200);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className={`react-modal-content ${isClose ? "modal-close" : ""}`}
    >
      <form
        className="form-container"
        onSubmit={handleSubmit(handleCreateNewToDo)}
      >
        <h2>Cadastrar Novo ToDo</h2>

        <div>
          <input type="text" placeholder="Título" {...register("title")} />
        </div>

        <div>
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
