import { useState } from 'react';
import Switch from '~/components/Switch';
import Button from './Button';

type Props = {
  /**
   * Whether the button is dirty or not.
   */
  dirty: boolean;
};

export default function PostSaveButton({ dirty }: Props) {
  const [publish, setPublish] = useState(false);

  const checkedHandler = (checked: boolean) => {
    setPublish(checked);
  };

  return (
    <div className="flex items-center justify-end gap-2.5">
      <Switch
        value="unchecked"
        label="Post publiceren"
        name="post_publish"
        onCheckedChange={checkedHandler}
      />
      <Button width="w-32" submit disabled={!dirty} primary={publish}>
        {publish ? 'Publiceren' : 'Opslaan'}
      </Button>
    </div>
  );
}
