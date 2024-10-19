const Input = ({ type = 'text', placeholder, value, onChange, className, required }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        required={required}
      />
    );
  };
  
  export default Input;
  