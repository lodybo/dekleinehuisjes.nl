export function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length > 3 && email.includes('@');
}

export function validateUserPassword(password: unknown): password is string {
  return (
    typeof password === 'string' &&
    password.length !== 0 &&
    password.length >= 8
  );
}

export function validateName(name: unknown): name is string {
  return typeof name === 'string' && name.length !== 0;
}

export function validateAuthToken(token: unknown): token is string {
  return typeof token === 'string' && token.length >= 6;
}
