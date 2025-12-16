import { sql } from "drizzle-orm";
import db from '../db';
import * as schema from '../db/schema';

type Params = {
  id: bigint | number,
  is_bot?: boolean | null | undefined,
  first_name: string | null | undefined,
  last_name?: string | null | undefined,
  username?: string | null | undefined,
  language_code?: string | null | undefined,
  is_premium?: boolean | null | undefined,
  allows_write_to_pm?: boolean | null | undefined
}

const createOrUpdateUser = async (userDataRaw: Params): Promise<any> => {
  const telegramUserId = BigInt(userDataRaw.id);
  const userData = {
    username: userDataRaw.username ?? null,
    firstName: userDataRaw.first_name ?? null,
    lastName: userDataRaw.last_name ?? null,
    languageCode: userDataRaw.language_code ?? null,
    isPremium: userDataRaw.is_premium ?? false,
    allowsWriteToPm: userDataRaw.allows_write_to_pm ?? false,
    updatedAt: sql`now()`
  };

  try {
    const result = await db.insert(schema.user)
      .values({ id: telegramUserId, ...userData } as any)
      .onConflictDoUpdate({ target: schema.user.id, set: userData as any })
      .returning();
    
    return result[0];
  } catch (error) {
    console.error("Database Error in createOrUpdateUser:", error);
    
    // Возвращаем объект, который точно совпадает по структуре с ожидаемым
    return {
      id: telegramUserId,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      languageCode: userData.languageCode,
      isPremium: userData.isPremium,
      allowsWriteToPm: userData.allowsWriteToPm,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

export default createOrUpdateUser;
