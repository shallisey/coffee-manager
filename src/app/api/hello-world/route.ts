import { test } from "@/utils/dbconnection";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  test();
  return NextResponse.json({ message: "Hello from /api/hello-world" });
}
