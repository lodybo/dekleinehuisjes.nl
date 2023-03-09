import { useEffect, useState } from 'react';
import { useFetcher, Form } from '@remix-run/react';
import Button from '~/components/Button';
import Spinner from '~/components/Spinner';

type Props = {
  hasAuth: boolean;
};

export default function AuthSettingsForm({ hasAuth }: Props) {
  const fetcher = useFetcher();
  const [qr, setQr] = useState('');
  const [secret, setSecret] = useState('');

  useEffect(() => {
    if (fetcher.type === 'done' && fetcher.data) {
      setQr(fetcher.data.qr);
      setSecret(fetcher.data.secret);
    }
  }, [fetcher]);

  return (
    <div
      className={`${
        qr ? 'grid-cols-[20rem_1fr]' : 'grid-cols-[0_1fr]'
      } grid grid-rows-[1fr_2fr] gap-2 [grid-template-areas:_'auth-header_auth-header'_'auth-qr_auth-details']`}
    >
      <div className="[grid-area:auth-header]">
        <h2 className="text-display-m">2-factor authenticatie</h2>
        <p>
          Voor extra beveiliging kan je{' '}
          <strong className="text-body-l">2-factor authenticatie</strong>{' '}
          instellen voor je profiel.
        </p>
      </div>

      <div className="[grid-area:auth-qr]">
        <div className="flex items-center justify-center">
          {qr && <img src={qr} alt="QR code" />}
        </div>
      </div>

      <div className="h-full [grid-area:auth-details]">
        <div className="flex h-full flex-col justify-center space-y-3">
          {!hasAuth ? (
            !secret ? (
              <>
                <p>Je hebt nog geen 2-factor authenticatie ingesteld.</p>
                <fetcher.Form action="/auth/enable" method="get">
                  <Button
                    submit
                    width="w-32"
                    disabled={fetcher.state === 'submitting'}
                  >
                    Instellen
                  </Button>
                  {fetcher.state === 'submitting' && <Spinner />}
                </fetcher.Form>
              </>
            ) : (
              <>
                <p>
                  2-factor authenticatie is aangezet. Scan de QR code hiernaast
                  met je authenticatie app.
                </p>
                <p>
                  Kan je de QR code hiernaast niet scannen? Voer deze tekenreeks
                  in de authenticatie app: <code>{secret}</code>
                </p>
              </>
            )
          ) : null}

          {hasAuth ? (
            <div>
              <p>2-factor authenticatie staat ingesteld voor je.</p>
              <p>Wil je dit weer uitzetten?</p>
              <Form action="/auth/disable" method="get">
                <Button
                  submit
                  width="w-32"
                  danger
                  disabled={fetcher.state === 'submitting'}
                >
                  Uitzetten
                </Button>
                {fetcher.state === 'submitting' && <Spinner />}
              </Form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
