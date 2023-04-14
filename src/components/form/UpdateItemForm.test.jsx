import { render } from "@testing-library/react";
import UpdateItemForm from "./UpdateItemForm";
import { ItemsProvider } from "../../state/ItemsContext";
import { ModalProvider } from "../../state/ModalContext";

test("should render the fields with their values", () => {
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
        <UpdateItemForm path={path} fields={fields} data={data} />
      </ItemsProvider>
    </ModalProvider>
  );

  // Assert
  expect(getByLabelText("Title")).toHaveValue("Test series");
  expect(getByLabelText("Number")).toHaveValue(123);
});
