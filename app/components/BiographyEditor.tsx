import Button from '~/components/Button';
import Editor from '~/components/Editor';

type Props = {
  /**
   * A user's biography.
   */
  biography: string;
};

export default function BiographyEditor({ biography }: Props) {
  return (
    <Editor
      name="bio"
      action="/api/profiel/bio"
      initialValue={biography}
      saveButton={(dirty) => (
        <Button primary submit disabled={!dirty}>
          Opslaan
        </Button>
      )}
    />
  );
}
