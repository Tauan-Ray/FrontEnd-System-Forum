import { webConfig } from "@/lib/settings";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${webConfig.url}:${webConfig.port}/questions/all?page=0&limit=5`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 60 * 3 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: 400 });
    }

    const questions = await response.json();
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Erro na requisição", error);
    return NextResponse.json(
      { message: "Erro ao processar a requisição." },
      { status: 500 }
    );
  }
}
