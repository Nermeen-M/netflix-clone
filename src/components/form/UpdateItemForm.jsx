import { useState, useEffect } from "react";

import FieldsGenerator from "../../components/form/FieldsGenerator";
import { updateDocument } from "../../scripts/firebase/fireStore";
import { useModal } from "../../state/ModalContext";
import { useItems } from "../../state/ItemsContext";

export default function UpdateItemForm({ path, fields, data }) {
  const { setModal } = useModal();
  const { dispatch } = useItems();

  const [form, setForm] = useState(data);
  const [formFields, setFormFields] = useState(fields);

  useEffect(() => {
    if (path == "titles") {
      if (form.type == "series") {
        const newFields = fields.filter((item) => item.key !== "url");
        setFormFields(newFields);
      } else {
        setFormFields(fields);
      }
    }
  }, [form]);

  async function submitHandler(event) {
    event.preventDefault();

    const result = await updateDocument(path, form.id, form);

    result.status ? onSuccess() : onFailure(result.message);
  }

  function onSuccess() {
    dispatch({ type: "updateItem", payload: form });
    setModal(null);
  }

  function onFailure(errorMessage) {
    alert(errorMessage);
  }

  return (
    <div className="admin-form">
      <h1>Edit item</h1>
      <form onSubmit={(event) => submitHandler(event)}>
        <FieldsGenerator fields={formFields} state={[form, setForm]} />
        <div className="buttons-group">
          <button className="primary-button">Save</button>
          <button className="primary-button" onClick={() => setModal(null)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
