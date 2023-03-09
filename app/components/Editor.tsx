import { useFetcher } from '@remix-run/react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import type { APIResponse } from '~/types/Responses';
import Spinner from '~/components/Spinner';

type Props = {
  /**
   * The action to perform when the form is submitted.
   */
  action: string;

  /**
   * The initial value of the editor.
   */
  initialValue?: string;

  /**
   * The name of the textarea that will be used to store the editor's content.
   * This will be used when submitting the form.
   */
  name: string;
};

export default function Editor({ action, initialValue, name }: Props) {
  const fetcher = useFetcher<APIResponse>();
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  const dirtyHandler = () => {
    setDirty(true);
  };

  useEffect(() => {
    if (fetcher.type === 'done') {
      setSaving(false);
      setSaved(true);

      if (fetcher.data.ok) {
        setDirty(false);
      } else {
        setSaveError(fetcher.data.message);
      }
    }

    if (fetcher.state === 'submitting') {
      setSaving(true);
    }
  }, [fetcher]);

  return (
    <fetcher.Form action={action} method="post">
      <TinyMCEEditor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        textareaName={name}
        initialValue={initialValue}
        onDirty={dirtyHandler}
        init={{
          font_css:
            'https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600;700&display=swap',
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          block_formats:
            'Paragraph=p; Heading 1=h2; Heading 2=h3; Heading 3=h4;',
          content_style:
            'body { font-family:Assistant,sans-serif; font-size:16px }',
        }}
      />
      <div className="mt-5 flex flex-row gap-5">
        <div className="flex h-8 w-full flex-row items-center gap-2 text-neutral">
          {dirty && !saving ? (
            <p>Jouw wijzigingen zijn nog niet opgeslagen.</p>
          ) : null}
          {saving ? (
            <>
              <Spinner /> <p>Wijzigingen worden opgeslagen...</p>
            </>
          ) : null}
          {saved && !dirty ? <p>Alles is opgeslagen!</p> : null}
          {saveError ? <p className="text-red">{saveError}</p> : null}
        </div>

        <div className="w-32">
          <Button primary submit disabled={!dirty}>
            Opslaan
          </Button>
        </div>
      </div>
    </fetcher.Form>
  );
}
