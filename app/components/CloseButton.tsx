import Icon from '~/components/Icon';

export default function CloseButton() {
  return (
    <button
      className="absolute top-2 right-2 inline-flex h-6 w-6 cursor-pointer appearance-none items-center justify-center rounded-full text-stone opacity-50 ring-neutral ring-offset-1 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2"
      aria-label="Close"
    >
      <Icon name="circle-xmark" prefix="far" />
    </button>
  );
}
