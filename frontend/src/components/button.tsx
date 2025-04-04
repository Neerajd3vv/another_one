interface ButtonProps {
  onClick?: () => void;
  className: string;
  type? : "submit" | "button" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
}
function Button({ onClick, className, disabled, type , children }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
