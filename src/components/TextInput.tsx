import { useRef, useState, type InputHTMLAttributes } from "react";

export default function TextInput({
  name,
  label,
  ...props
}: { name: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(props.value || "");
  return (
    <div
      onClick={() => {
        if (inputRef.current === null) return;
        inputRef.current.focus();
      }}
    >
      <label htmlFor={name}>{label}</label>
      <input
        ref={inputRef}
        {...props}
        type="text"
        name={name}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
