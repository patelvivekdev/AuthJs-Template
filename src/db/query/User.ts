import { db } from '..';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const loginUser = async (username: string, password: string) => {
  // check if user is sign up with oauth
  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (user.length === 0) {
    return null;
  }

  const isValid = bcrypt.compare(password, user[0].password!);
  if (!isValid) {
    return null;
  }
  return user[0];
};
