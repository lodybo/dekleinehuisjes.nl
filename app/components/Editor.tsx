import { useFetcher } from '@remix-run/react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { ReactNode, useEffect, useState } from 'react';
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

  /**
   * The ID of the form that will be used to submit the editor's content.
   * Can be used to associate other inputs with the form.
   */
  formID?: string;

  /**
   * The image upload URL.
   */
  imageUploadUrl?: string;

  /**
   * Whether the parent form is considered dirty or not.
   */
  formIsDirty?: boolean;

  /**
   * A component that will be rendered for the save button. It gets passed a `dirty` prop that indicates whether the form is dirty or not.
   */
  saveButton: (dirty: boolean) => ReactNode;
};

export default function Editor({
  action,
  initialValue,
  name,
  formID = '',
  imageUploadUrl = '',
  formIsDirty = false,
  saveButton,
}: Props) {
  const fetcher = useFetcher<APIResponse>();
  const [dirty, setDirty] = useState(formIsDirty || false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  const dirtyHandler = () => {
    setDirty(true);
  };

  useEffect(() => {
    if (formIsDirty) {
      console.log('Form is dirty');
      setDirty(true);
    }

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
  }, [fetcher, formIsDirty]);

  return (
    <fetcher.Form id={formID} action={action} method="post">
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
          images_upload_url: imageUploadUrl,
          automatic_uploads: !!imageUploadUrl,
          file_picker_callback: function (callback, value, meta) {
            // Taken from the TinyMCE documentation: https://www.tiny.cloud/docs/tinymce/6/image/#interactive-example
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.addEventListener('change', (e) => {
              const file = e.target?.files[0];

              const reader = new FileReader();
              reader.addEventListener('load', () => {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                const id = 'blobid' + new Date().getTime();
                const blobCache = (window as any).tinymce.activeEditor
                  .editorUpload.blobCache;
                const base64 = reader.result?.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                callback(blobInfo.blobUri(), { title: file.name });
              });
              reader.readAsDataURL(file);
            });

            input.click();
          },
          file_picker_types: 'image',
          a11y_advanced_options: true,
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
            `alignright alignjustify | ${
              imageUploadUrl ? 'image' : ''
            } | bullist numlist outdent indent | ` +
            'removeformat | help',
          block_formats:
            'Paragraph=p; Heading 1=h2; Heading 2=h3; Heading 3=h4;',
          content_style:
            'body { font-family:Assistant,sans-serif; font-size:16px }',
        }}
      />
      <div className="mt-5 flex flex-row gap-5">
        <div className="flex h-8 w-3/4 flex-row items-center gap-2 text-neutral">
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

        <div className="w-1/4">{saveButton(dirty)}</div>
      </div>
    </fetcher.Form>
  );
}
