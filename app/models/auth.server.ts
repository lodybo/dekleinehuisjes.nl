import { generateToken, verifyToken } from 'node-2fa';

export function generate2faToken(secret: string) {
  return generateToken(secret);
}

export function verify2faToken(secret: string, token: string) {
  return verifyToken(secret, token);
}
