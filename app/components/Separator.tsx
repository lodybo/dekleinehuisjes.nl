import * as RadixSeparator from '@radix-ui/react-separator';

type Props = Pick<RadixSeparator.SeparatorProps, 'orientation'> & {
  /**
   * The color of the separator
   */
  color?: string;
};

export default function Separator({
  orientation = 'horizontal',
  color = 'bg-primary-300',
}: Props) {
  return (
    <RadixSeparator.Root
      className={`${color} data-[orientation=horizontal]:my-[15px] data-[orientation=vertical]:mx-[15px] data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px`}
      decorative
      orientation={orientation}
    />
  );
}
