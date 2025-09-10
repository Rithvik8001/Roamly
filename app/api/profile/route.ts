import { headers } from "next/headers";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const { user } = session;
  return new Response(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function PATCH(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const body = await req.json().catch(() => ({}));
  const name: string | undefined = body?.name;
  if (!name || !name.trim()) {
    return new Response(JSON.stringify({ error: "Missing name" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name.slice(0, 80) },
  });
  return new Response(null, { status: 204 });
}
