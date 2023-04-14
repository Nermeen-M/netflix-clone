import { render } from "@testing-library/react";
import AddItemForm from "./AddItemForm";
import { ItemsProvider } from "../../state/ItemsContext";
import { ModalProvider } from "../../state/ModalContext";

test("should render the fields passed with their types", () => {
  // Arrange
  const path = "media";
  const fields = [
    { key: "title", label: "Title", type: "text" },
    { key: "number", label: "Number", type: "number" },
  ];
  const data = { title: "Test series", number: 123 };
  const { getByLabelText } = render(
    <ModalProvider>
      <ItemsProvider>
        <AddItemForm path={path} fields={fields} data={data} />
      </ItemsProvider>
    </ModalProvider>
  );

  // Assert
  expect(getByLabelText("Title")).toBeInTheDocument();
  expect(getByLabelText("Number")).toBeInTheDocument();
});
