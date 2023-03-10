import type { Password, User as PrismaUser } from '@prisma/client';
import type { SerializeFrom } from '@remix-run/node';
import bcrypt from 'bcryptjs';

import { prisma } from '~/db.server';

export type User = SerializeFrom<Omit<PrismaUser, 'authSecret'>>;

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      bio: true,
      authEnabled: true,
      authSecret: true,
      recipies: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      bio: true,
      authEnabled: true,
      recipies: true,
      role: true,
    },
  });
}

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      bio: true,
      authEnabled: true,
      recipies: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
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

  // compare returns a Promise
  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

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

export async function updateUserRole(id: User['id'], role: User['role']) {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
}

export async function countAdminUsers() {
  return prisma.user.count({
    where: { role: 'ADMIN' },
  });
}

export async function enableUserAuth(email: User['email'], secret: string) {
  return prisma.user.update({
    where: { email },
    data: { authEnabled: true, authSecret: secret },
  });
}

export async function disableUserAuth(email: User['email']) {
  return prisma.user.update({
    where: { email },
    data: { authEnabled: false, authSecret: null },
  });
}
