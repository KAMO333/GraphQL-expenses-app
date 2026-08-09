const RadioButton = ({ id, label, onChange, value, checked, name }) => {
  return (
    <label
      htmlFor={id}
      className={`flex-1 cursor-pointer text-center rounded-xl border py-3 px-4 text-sm font-bold transition-all duration-200 ${
        checked
          ? "border-violet-600 bg-violet-50 text-violet-700 shadow-sm"
          : "border-slate-200 bg-slate-50 text-slate-500 hover:border-violet-300 hover:bg-white hover:text-slate-800"
      }`}
    >
      <input
        name={name || "type"}
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
