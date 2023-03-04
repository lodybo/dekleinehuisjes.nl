type Props = JSX.IntrinsicElements['input'];

const Input = ({ className, ...props }: Props) => (
  <input
    className={`${className} border-gray-500 text-lg w-full rounded border px-2 py-1`}
    {...props}
  />
);

export default Input;
