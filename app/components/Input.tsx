type Props = JSX.IntrinsicElements['input'] & {
  label: string;
};

const Input = ({ label, className, ...props }: Props) => (
  <label className="flex cursor-pointer flex-col gap-1 text-stone">
    {label}

    <input
      className={`${className} text-lg w-full rounded border border-neutral-200 px-2 py-1 text-neutral-400 outline-none ring-neutral ring-offset-2 placeholder:italic placeholder:text-neutral focus:ring-2`}
      {...props}
    />
  </label>
);

export default Input;
