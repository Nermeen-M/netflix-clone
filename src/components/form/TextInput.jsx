export default function TextInput({ item, state }) {
  const [form, setForm] = state;

  return (
    <label className="text-input">
      {item.label}
      <input
        value={form[item.key]}
        onChange={(event) =>
          setForm({ ...form, [item.key]: event.target.value })
        }
        type={item.type}
        required={item.required}
        disabled={item.disabled}
        placeholder={item.placeholder}
        maxLength={item.maxLength}
        min={item.min}
        max={item.max}
      />
    </label>
  );
}
