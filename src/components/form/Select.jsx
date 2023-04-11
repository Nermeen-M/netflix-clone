export default function Select({ item, state }) {
  const [form, setForm] = state;

  function ChangeHandler(event) {
    setForm({ ...form, [item.key]: event.target.value });
  }

  const selectOptions = item.options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <label className="select">
      {item.label}
      <select
        onChange={ChangeHandler}
        value={form[item.key]}
        required={item.required}
      >
        <option disabled={true} value="">
          --Choose an option--
        </option>
        {selectOptions}
      </select>
    </label>
  );
}
