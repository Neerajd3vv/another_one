interface InputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string;
  placeholder: string;
  id?: string;
  type: string;
}

function Input({ type, className, placeholder, ...props }: InputTypes) {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
