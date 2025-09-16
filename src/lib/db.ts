// Generate a 3-character ID using 1-9, A-Z
function generateShortId(): string {
  const chars = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 3; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

import { neon } from '@neondatabase/serverless';

// Get the database URL from environment variables
const getDatabaseUrl = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }
  return process.env.DATABASE_URL;
};

// Create a Neon SQL client
export const sql = neon(getDatabaseUrl());

// Database types for better TypeScript support
export interface User {
  id: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface Url {
  id: string;
  original: string;
  shorter: string;
  createdAt?: Date;
}

// Database operations for User
export const userOperations = {
  async findUnique(where: { email: string }): Promise<User | null> {
    const result = await sql`
      SELECT * FROM "User" WHERE email = ${where.email} LIMIT 1
    `;
    return result[0] as User || null;
  },

  async create(data: { email: string; password: string }): Promise<User> {
    const result = await sql`
      INSERT INTO "User" (email, password)
      VALUES (${data.email}, ${data.password})
      RETURNING *
    `;
    return result[0] as User;
  }
};

// Database operations for Urls
export const urlOperations = {
  async findUnique(where: { id?: string; original?: string; shorter?: string }): Promise<Url | null> {
    // Since id and shorter are now the same, search by id first
    if (where.id) {
      const result = await sql`
        SELECT * FROM "Urls" WHERE id = ${where.id} LIMIT 1
      `;
      return result[0] as Url || null;
    }

    if (where.shorter) {
      const result = await sql`
        SELECT * FROM "Urls" WHERE id = ${where.shorter} LIMIT 1
      `;
      return result[0] as Url || null;
    }

    if (where.original) {
      const result = await sql`
        SELECT * FROM "Urls" WHERE original = ${where.original} LIMIT 1
      `;
      return result[0] as Url || null;
    }

    return null;
  },

  async create(data: { original: string; id?: string }): Promise<Url> {
    // Always use the same value for id and shorter
    try {let id = data.id;
    if (!id) {
      // Try up to 5 times to avoid collision
      for (let i = 0; i < 5; i++) {
        const candidate = generateShortId();
        const exists = await sql`SELECT 1 FROM "Urls" WHERE id = ${candidate} LIMIT 1`;
        if (exists.length === 0) {
          id = candidate;
          break;
        }
      }
      if (!id) throw new Error('Failed to generate unique short ID');
    }
    const result = await sql`
      INSERT INTO "Urls" (id, original, shorter)
      VALUES (${id}, ${data.original}, ${id})
      RETURNING *
    `;
    return result[0] as Url;} catch (error) {
      console.error('Error creating URL:', error, ' Data:', data);
      throw error;
    }
  },

  async delete(where: { id: string }): Promise<void> {
    await sql`
      DELETE FROM "Urls" WHERE id = ${where.id}
    `;
  }
};