import { webConfig } from "@/lib/settings";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;

  if (!userId) {
    return NextResponse.json(
      { url: null, error: "userId não fornecido" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${webConfig.url}:${webConfig.port}/storage/${userId}/avatar`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ url: null }, { status: 404 });
    }

    const data = await response.json();
    const avatarUrl = data?.url;

    if (!avatarUrl) {
      return NextResponse.json({ url: null }, { status: 404 });
    }

    const headCheck = await fetch(avatarUrl, { method: "HEAD" });
    if (!headCheck.ok) {
      return NextResponse.json({ url: null }, { status: 404 });
    }

    return NextResponse.json(
      { url: avatarUrl },
      {
        status: 200,
        headers: { "Cache-Control": "public, max-age=300" },
      }
    );
  } catch (err) {
    console.error("Erro ao buscar avatar:", err);
    return NextResponse.json({ url: null }, { status: 500 });
  }
}
