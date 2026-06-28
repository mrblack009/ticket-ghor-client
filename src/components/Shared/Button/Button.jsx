const Button = ({text, onClick, type="button", className="", ...props}) => {
  return (
    <button
    type={type}
    onClick={onClick}
    {...props}
    className={`px-4 py-2 font-semibold bg-primary flex items-center justify-center rounded-md cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-100 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-secondary before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md hover:before:left-0 text-[#fff] ${className}`}>
      {text}
    </button>
  );
};

export default Button;
