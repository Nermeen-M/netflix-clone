import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import ImageInput from "./ImageInput";
import UrlInput from "./UrlInput";
import Select from "./Select";

export default function FieldsGenerator({ fields, state, path }) {
  const Fields = fields.map((item) => {
    switch (item.type) {
      case "email":
      case "number":
      case "password":
      case "url":
        return <UrlInput key={item.id} item={item} state={state} />;
      case "text":
        return <TextInput key={item.id} item={item} state={state} />;
      case "textarea":
        return <TextAreaInput key={item.id} item={item} state={state} />;
      case "file":
        return (
          <ImageInput key={item.id} item={item} state={state} path={path} />
        );
      case "select":
        return <Select key={item.id} item={item} state={state} />;
      default:
        throw new Error(`FieldsGenerator item type "${item.type}" not valid`);
    }
  });

  return <>{Fields}</>;
}
