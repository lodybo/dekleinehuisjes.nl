type Props = JSX.IntrinsicElements['input'];

export default function PostTitleInput({ defaultValue = '', onInput }: Props) {
  return (
    <input
      className="w-full rounded border border-neutral-100 px-2 py-1 text-headline-l text-neutral-300 outline-none ring-neutral ring-offset-2 placeholder:italic placeholder:text-neutral focus:ring-2"
      name="post_title"
      form="post_form"
      defaultValue={defaultValue}
      onInput={onInput}
      placeholder="Titel van de post"
    />
  );
}
