const RadioButton = ({ id, label, onChange, value, checked }) => {
  return (
    <label
      htmlFor={id}
      className={`flex-1 cursor-pointer text-center rounded-md border py-2.5 px-4 text-sm font-medium transition-colors duration-200 ${
        checked
          ? "border-gold bg-gold/10 text-gold-bright"
          : "border-hairline bg-ink-800 text-muted hover:border-gold/40 hover:text-paper"
      }`}
    >
      <input
        name="type"
        type="radio"
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
        className="sr-only"
      />
      {label}
    </label>
  );
};

export default RadioButton;
