import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CategoryList } from ".";
import user from "@testing-library/user-event";

jest.unmock("axios");

const data = {
  id: "96d3a7ce-dab4-4ee0-8e9a-42bf063f2ce8",
  title: "Games",
  userId: "5e84d8c0-cfde-40ad-aee8-60886fdcf5cf",
  todo: [],
};
const mockOpenModal = jest.fn();

describe("Category List", () => {
  beforeEach(() => {
    mockOpenModal.mockClear();
    render(<CategoryList data={data} handleOpenNewToDoModal={mockOpenModal} />);
  });

  it("Should display data title", () => {
    const input = screen.getByDisplayValue("Games");

    expect(input).toBeInTheDocument();
  });

  it("Should click button to open modal", () => {
    const button = screen.getByTestId("open-modal");

    user.click(button);

    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });
});
