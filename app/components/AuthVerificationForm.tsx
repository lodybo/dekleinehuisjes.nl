import type { Form } from '@remix-run/react';
import Input from './Input';
import Button from '~/components/Button';
import type { APIResponse } from '~/types/Responses';

type Props = {
  /**
   * A reference to the Form or Fetcher.Form component
   */
  Form: typeof Form;

  /**
   * Action data from the server
   */
  actionData?: APIResponse;
};
export default function AuthVerificationForm({ Form, actionData }: Props) {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.slice(0, 6);
  };

  return (
    <Form
      className="flex flex-col items-center justify-center space-y-3"
      action="/verify"
      method="post"
    >
      <Input
        large
        label="6-cijferige code"
        name="code"
        type="number"
        inputMode="numeric"
        maxLength={6}
        autoComplete="one-time-code"
        onInput={handleInput}
        autoFocus
      />
      {!actionData?.ok && <p className="text-red">{actionData?.message}</p>}
      <Button submit width="w-32">
        Check code
      </Button>
    </Form>
  );
}
