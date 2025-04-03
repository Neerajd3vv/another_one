interface ButtonProps {
  onClick?: () => void;
  className: string;
  type? : "submit" | "button" | "reset";
  name: string;
  disabled?: boolean;
}
function Button({ onClick, className, name, disabled, type }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {name}
    </button>
  );
}

export default Button;
