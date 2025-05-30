type ButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = '',
  type = 'button',
  children,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block rounded-sm bg-marianblue text-white px-8 py-3 text-lg font-medium transition hover:scale-110 hover:bg-mahogany hover:shadow-xl focus:ring-3 focus:outline-hidden cursor-pointer ${
        disabled ? 'opacity-70 cursor-not-allowed' : ''
      } ${className}`}
      disabled={disabled}
    >
      {/* Show slot content if passed, else fallback to text prop */}
      {children ?? text}

      {/* Arrow icon (always shown at the end) */}
      <svg
        className="ml-2 inline-block"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.33325 8H12.6666"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 10.6667L12.6667 8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 5.33301L12.6667 7.99967"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default Button;
