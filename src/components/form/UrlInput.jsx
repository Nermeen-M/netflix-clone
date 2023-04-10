export default function UrlInput({ item, state }) {
  const [form, setForm] = state;

  return (
    <label className="text-input">
      {item.label}
      <input
        value={form[item.key]}
        onChange={(event) => {
          setForm({ ...form, [item.key]: event.target.value });
        }}
        type={item.type}
        required={item.required}
        disabled={item.disabled}
        placeholder={item.placeholder}
        pattern={item.pattern}
      />
    </label>
  );
}
