import "@testing-library/jest-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { NewToDoModal } from ".";
import { CategoryTodoProvider } from "../../contexts/useCategoryTodo.context";

jest.unmock("axios");
const mockClockModal = jest.fn();

describe("Category List", () => {
  beforeEach(() => {
    mockClockModal.mockClear();
    render(
      <CategoryTodoProvider>
        <NewToDoModal
          categoryId="1"
          isOpen={true}
          onRequestClose={mockClockModal}
        />
      </CategoryTodoProvider>
    );
  });

  it("Should display data title", () => {
    const input = screen.getByText("Cadastrar Novo ToDo");

    expect(input).toBeInTheDocument();
  });
});
