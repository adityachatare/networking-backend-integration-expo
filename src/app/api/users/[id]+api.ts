import { db } from "@/lib/db";

type Ctx = { id: string };

export async function GET(_req: Request, { id }: Ctx) {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM "users_data" WHERE id = ?',
      args: [parseInt(id, 10)],
    });
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({
      error: "Failed to fetch users",
      status: 500,
    });
  }
}

export async function PATCH(_req: Request, {}: Ctx) {}

export async function DELETE(_req: Request, {}: Ctx) {}
