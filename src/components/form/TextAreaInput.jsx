export default function TextAreaInput({ item, state }) {
  const [form, setForm] = state;

  return (
    <label>
      {item.label}
      <textarea
        value={form[item.key]}
        onChange={(event) =>
          setForm({ ...form, [item.key]: event.target.value })
        }
        required={item.required}
        disabled={item.disabled}
      ></textarea>
    </label>
  );
}
