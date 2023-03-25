import * as RadixSwitch from '@radix-ui/react-switch';
import { useEffect, useState } from 'react';

type Props = {
  /**
   * The value of the switch.
   */
  value: 'checked' | 'unchecked';

  /**
   * The label of the switch.
   */
  label: string;

  /**
   * The name of the switch.
   */
  name: string;

  /**
   * The label of the switch when it is checked.
   */
  checkedLabel?: string;

  /**
   * The handler for when the switch is checked.
   */
  onCheckedChange?: (checked: boolean) => void;
};

export default function Switch({
  value,
  label,
  name,
  checkedLabel = '',
  onCheckedChange,
}: Props) {
  const [checked, setChecked] = useState(value === 'checked');

  useEffect(() => {
    setChecked(value === 'checked');
  }, [value]);

  const onCheckedHandler = (checked: boolean) => {
    setChecked(checked);
    if (onCheckedChange) {
      onCheckedChange(checked);
    }
  };

  let displayLabel = label;
  if (checked && checkedLabel) {
    displayLabel = checkedLabel;
  }

  return (
    <label className="flex flex-row gap-2.5 text-neutral-300">
      {displayLabel}
      <RadixSwitch.Root
        className="h-6 w-11 rounded-full bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 data-[state=checked]:bg-primary"
        checked={checked}
        name={name}
        onCheckedChange={onCheckedHandler}
        value="true"
      >
        <RadixSwitch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-neutral-100 shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[22px]" />
      </RadixSwitch.Root>
    </label>
  );
}
