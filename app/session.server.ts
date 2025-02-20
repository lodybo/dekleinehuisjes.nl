import { createCookieSessionStorage, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

import type { User } from '~/models/user.server';
import { getUserById } from '~/models/user.server';

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set');

type SessionData = {
  userId?: User['id'];
  authVerified?: boolean;
};

export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

const USER_SESSION_KEY = 'userId';

export async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}

export async function getUserId(
  request: Request
): Promise<User['id'] | undefined> {
  const session = await getSession(request);
  return session.get(USER_SESSION_KEY);
}

export async function checkAuthVerification(request: Request) {
  const session = await getSession(request);
  return session.get('authVerified');
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }

  return userId;
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (user) {
    if (user.authEnabled) {
      const authVerified = await checkAuthVerification(request);
      if (authVerified) {
        return user;
      }
    } else {
      return user;
    }
  }

  throw await logout(request);
}

export async function requireAdminUser(request: Request) {
  const user = await requireUser(request);
  if (user.role === 'ADMIN') {
    return user;
  }

  return redirect('/profiel');
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  session.set('authVerified', false);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

export async function verifyLogin(request: Request, redirectURL: string) {
  const session = await getSession(request);
  session.set('authVerified', true);
  return redirect(redirectURL, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}
