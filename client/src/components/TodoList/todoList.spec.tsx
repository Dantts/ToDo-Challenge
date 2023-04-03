import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import { TodoList } from ".";
import user from "@testing-library/user-event";
import { CategoryTodoProvider } from "../../contexts/useCategoryTodo.context";

jest.unmock("axios");

import axios from "axios";
import { api } from "../../services/api";
const data = {
  id: "f3c89c0b-aab5-4cdc-b073-e1a2988c50c1",
  title: "Counter-Strike",
  isComplete: false,
  createdAt: "2023-04-01T21:03:21.259Z",
  updatedAt: "2023-04-02T00:56:22.363Z",
  categoryId: "96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8",
};

const mockOpenModal = jest.fn();

describe("Todo List", () => {
  beforeEach(() => {
    mockOpenModal.mockClear();
    render(
      <CategoryTodoProvider>
        <TodoList todo={data} />
      </CategoryTodoProvider>
    );
  });

  it("Should display data title", async () => {
    const text = screen.getByDisplayValue("Counter-Strike");

    expect(text).toBeInTheDocument();
  });
});
