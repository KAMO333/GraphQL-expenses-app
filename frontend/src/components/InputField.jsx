const InputField = ({ label, id, name, type = "text", onChange, value }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-widest2 text-muted mb-2"
      >
        {label}
      </label>
      <input
        className="w-full bg-ink-800 border border-hairline rounded-md py-2.5 px-3 text-paper placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 transition-colors duration-200"
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
