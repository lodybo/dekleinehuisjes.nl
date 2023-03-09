type Props = JSX.IntrinsicElements['input'] & {
  label: string;
  large?: boolean;
};

const Input = ({ label, large = false, className, ...props }: Props) => (
  <label
    className={`${
      large ? '' : 'w-full'
    } flex cursor-pointer flex-col gap-1 text-stone`}
  >
    {label}

    <input
      className={`${className} ${
        large ? 'w-40 px-2 py-1 text-headline-l' : 'w-full px-2 py-1'
      } rounded border border-neutral-200 text-neutral-400 outline-none ring-neutral ring-offset-2 placeholder:italic placeholder:text-neutral focus:ring-2`}
      {...props}
    />
  </label>
);

export default Input;
