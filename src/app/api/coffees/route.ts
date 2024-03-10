import { insertIntoTable } from "@/utils/dbQuery/INSERT";
import { selectAllFromTable } from "@/utils/dbQuery/SELECT";
import { pool } from "@/utils/dbconnection";
import { ResultSetHeader } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await pool.query(selectAllFromTable, [`Coffees`]);

    const coffees = response[0];

    return Response.json({ data: coffees }, { status: 200 });
  } catch (error) {
    return Response.json({ message: `Unexpected error` }, { status: 500 });
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  const request = await req.json();
  try {
    /**
     * name country of origin
     * description
     * roast type
     * price
     * quantityInStock
     * distributorId (probably just default this to 1)
     */
    const {
      name,
      countryOrigin,
      description,
      roastType,
      price,
      quantityInStock,
      distributorId,
    } = request;

    const response = await pool.query<ResultSetHeader>(insertIntoTable, [
      "Coffees",
      name,
      countryOrigin,
      description,
      roastType,
      price,
      quantityInStock,
      distributorId,
    ]);

    const { insertId } = response[0];
    return Response.json(
      { data: `Successfully created coffee with coffeeId: ${insertId}` },
      { status: 201 }
    );
  } catch (error: any) {
    const { sqlMessage, sql, ...rest } = error;
    return Response.json(
      { message: `Error`, error: { ...rest } },
      { status: 500 }
    );
  }
}
