import { ReactElement } from "react";

interface ButtonProps {
  text: string;
  link?: string;
  className?: string;
  onClick?: () => void;
  children?: ReactElement;
  style?: any;
}

function Button({
  text,
  link,
  className,
  onClick,
  children,
  style,
}: ButtonProps) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={link}
      className={
        "cursor-pointer inline-block bg-green text-white py-5 px-12 font-bold w-fit " +
        className
      }
      onClick={onClick}
      style={style}
    >
      {children}
      {text}
    </a>
  );
}

export default Button;
