import { useEffect } from "react";

export default function Select({ item, state }) {
  const [form, setForm] = state;

  useEffect(() => {
    setForm({ ...form, [item.key]: item.options[0].toLowerCase() });
  }, []);

  function ChangeHandler(event) {
    setForm({ ...form, [item.key]: event.target.value.toLowerCase() });
    // console.log("selected", event.target.value.toLowerCase());
  }
  //   console.log("form", form);

  const selectOptions = item.options.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  return (
    <label className="select">
      {item.label}
      <select onChange={ChangeHandler}>{selectOptions}</select>
    </label>
  );
}
