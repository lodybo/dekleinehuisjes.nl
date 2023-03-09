import type { Password, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { prisma } from '~/db.server';

export type { User } from '@prisma/client';

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User['email'], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User['email']) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User['email'],
  password: Password['hash']
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = bcrypt.compare(password, userWithPassword.password.hash);

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function updateUserAvatar(
  email: User['email'],
  avatar: User['avatar']
) {
  return prisma.user.update({
    where: { email },
    data: { avatar },
  });
}

export async function updateUserBio(email: User['email'], bio: User['bio']) {
  return prisma.user.update({
    where: { email },
    data: { bio },
  });
}

export async function updateUserPassword(
  email: User['email'],
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.update({
    where: { email },
    data: {
      password: {
        update: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function updateUserEmail(
  currentEmail: User['email'],
  newEmail: User['email']
) {
  return prisma.user.update({
    where: { email: currentEmail },
    data: { email: newEmail },
  });
}

export async function updateUserName(email: User['email'], name: User['name']) {
  return prisma.user.update({
    where: { email },
    data: { name },
  });
}
