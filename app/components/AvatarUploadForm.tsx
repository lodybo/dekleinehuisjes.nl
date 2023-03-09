import { useEffect, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import Button from '~/components/Button';
import FileInput from '~/components/FileInput';
import FileDropField from '~/components/FileDropField';
import Modal from '~/components/Modal';
import Spinner from '~/components/Spinner';
import Notification from '~/components/Notification';
import { APIResponse } from '~/types/APIResponse';

export default function AvatarUploadForm() {
  const upload = useFetcher<APIResponse>();
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (upload.type === 'done' && upload.data.ok) {
      setOpen(false);
      // Wait for the modal to close before showing the notification.
      setTimeout(() => setShowNotification(true), 250);
    }
  }, [upload]);

  return (
    <>
      <Modal
        title="Verander je avatar"
        description="Verander hier je avatar door er eentje up te loaden. Je avatar wordt gebruikt op profiel pagina's en bij de recepten."
        caption="Verander avatar"
        open={open}
        onOpenChange={setOpen}
      >
        <upload.Form
          className="flex flex-col gap-5"
          action="/api/images/upload"
          method="post"
          encType="multipart/form-data"
        >
          <FileInput
            id="file-input"
            name="avatar-image"
            label="Kies een afbeelding om te uploaden"
            accept="image/*"
          />
          Of sleep een afbeelding hierheen.
          <FileDropField name="avatar-field" />
          {upload.type === 'done' && !upload.data.ok ? (
            <div className="text-red">{upload.data.message}</div>
          ) : null}
          <div className="flex flex-row items-center gap-2.5 self-end">
            {upload.state === 'submitting' && <Spinner />}
            <Button
              disabled={upload.state === 'submitting'}
              onClick={() => setOpen(false)}
            >
              Annuleren
            </Button>
            <Button disabled={upload.state === 'submitting'} primary submit>
              Opslaan
            </Button>
          </div>
        </upload.Form>
      </Modal>
      <Notification
        title="Je avatar is geüpload"
        description="Nu kan iedereen je nieuwe zelf zien :)"
        open={showNotification}
        onOpenChange={setShowNotification}
      />
    </>
  );
}
