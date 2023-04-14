import React from "react";
import { render } from "@testing-library/react";
import TextInput from "./TextInput";

test("should render the TextInput component with correct props", () => {
  // Arrange
  const item = {
    key: "title",
    label: "Title",
    type: "text",
    required: true,
  };
  const form = {
    title: "Example Title",
  };
  const setForm = jest.fn();

  // Act
  const { getByLabelText } = render(
    <TextInput item={item} state={[form, setForm]} />
  );
  const inputElement = getByLabelText("Title");

  // Assert
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveValue("Example Title");
  expect(inputElement).toHaveAttribute("type", "text");
  expect(inputElement).toBeRequired();
});
