type Props = Omit<JSX.IntrinsicElements['input'], 'type'> & {
  label: string;
};

export default function FileInput({ label, className, ...props }: Props) {
  return (
    <label className="flex cursor-pointer flex-col gap-1 text-stone">
      {label}

      <input
        className={`${className} text-lg w-full rounded-full border border-neutral-200 text-neutral-400 outline-none ring-neutral ring-offset-2 placeholder:italic placeholder:text-neutral focus:ring-2`}
        type="file"
        {...props}
      />
    </label>
  );
}
