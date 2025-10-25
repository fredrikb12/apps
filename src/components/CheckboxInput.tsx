import { useRef, type InputHTMLAttributes } from "react";

export default function CheckboxInput({
  name,
  label,
  ...props
}: { name: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div style={{ cursor: "pointer" }}>
      <label
        onClick={() => {
          if (inputRef.current === null) return;
          inputRef.current.click();
        }}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        {...props}
        type="checkbox"
        name={name}
        defaultChecked={props.defaultChecked || false}
      />
    </div>
  );
}
