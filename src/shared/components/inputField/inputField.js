import Style from "./inputField.module.scss";

const InputField = ({
  label,
  onChange,
  placeholder,
  type = "text",
  inputType,
  rowsNumber = "10",
  inputStyle,
  defaultValue,
  handler,
  error,
}) => {

    const handleChange = (e) => {
        onChange?.(e.target.value);
    }

    return (
        <div className={`d-flex flex-column mb-3 ${Style.container}`}>
            {
                label &&
                <label className={`${Style.label}`}>{label}</label>
            }
            {
                inputType?.toLowerCase() === 'textarea'
                    ? <textarea
                        className={`${Style.input} mt-1`}
                        rows={rowsNumber}
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                    : <input
                        className={`${Style.input + ' ' + Style.inputHeight} mt-1 ${inputStyle} ${error ? 'border border-danger': ''} text-truncate`}
                        type={type}
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        placeholder={placeholder}
                        {...handler?.()}
                    />
            }
        </div>
    );
}
export default InputField;
