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
  created_at?: Date;
}

export interface Url {
  id: string;
  original: string;
  shorter: string;
  created_at?: Date;
}

// Database operations for User
export const userOperations = {
  async findUnique(where: { email: string }): Promise<User | null> {
    const result = await sql`
      SELECT * FROM "user" WHERE email = ${where.email} LIMIT 1
    `;
    return result[0] as User || null;
  },

  async create(data: { email: string; password: string }): Promise<User> {
    const result = await sql`
      INSERT INTO "user" (email, password)
      VALUES (${data.email}, ${data.password})
      RETURNING *
    `;
    return result[0] as User;
  }
};

// Database operations for URLs
export const urlOperations = {
  async findUnique(where: { id?: string; original?: string }): Promise<Url | null> {
    if (where.id) {
      const result = await sql`
        SELECT * FROM urls WHERE id = ${where.id} LIMIT 1
      `;
      return result[0] as Url || null;
    }
    
    if (where.original) {
      const result = await sql`
        SELECT * FROM urls WHERE original = ${where.original} LIMIT 1
      `;
      return result[0] as Url || null;
    }
    
    return null;
  },

  async create(data: { id: string; original: string; shorter: string }): Promise<Url> {
    const result = await sql`
      INSERT INTO urls (id, original, shorter)
      VALUES (${data.id}, ${data.original}, ${data.shorter})
      RETURNING *
    `;
    return result[0] as Url;
  },

  async delete(where: { id: string }): Promise<void> {
    await sql`
      DELETE FROM urls WHERE id = ${where.id}
    `;
  }
};