import { deleteById } from "@/utils/dbQuery/DELETE";
import { selectById } from "@/utils/dbQuery/SELECT";
import { updateById } from "@/utils/dbQuery/UPDATE";
import { pool } from "@/utils/dbconnection";
import { has, isEmpty } from "lodash";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param req
 * @param res (this has the dynamic id for whatever reason)
 */

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { method } = req;
  try {
    const response: RowDataPacket[string] = await pool.query(selectById, [
      `Coffees`,
      "coffeeId",
      id,
    ]);

    const coffee = response[0][0];
    if (isEmpty(coffee)) {
      return Response.json(
        { message: `Could not find coffee with coffeeId: ${id}` },
        { status: 404 }
      );
    }

    return Response.json({ data: coffee }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `Error finding coffee with id: ${id}`, error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { method } = req;
  const request = await req.json();

  try {
    const valuesFromRequest = {
      ...(has(request, "name") && { name: request.name }),
      ...(has(request, "countryOrigin") && {
        countryOrigin: request.countryOrigin,
      }),
      ...(has(request, "description") && { description: request.description }),
      ...(has(request, "roastType") && { roastType: request.roastType }),
      ...(has(request, "price") && { price: request.price }),
      ...(has(request, "quantityInStock") && {
        quantityInStock: request.quantityInStock,
      }),
      ...(has(request, "distributorId") && {
        distributorId: request.distributorId,
      }),
    };

    const updateResponse = await pool.query<ResultSetHeader>(updateById, [
      "Coffees",
      valuesFromRequest,
      "coffeeId",
      id,
    ]);

    const affectedRows = updateResponse[0].affectedRows;
    if (affectedRows === 0) {
      return Response.json(
        { message: `Could not find coffee with coffeeId: ${id}` },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: `Successfully updated coffee with coffeeId: ${id}`,
        updatedValues: valuesFromRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `Error updating coffee with id: ${id}`, error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { method } = req;

  try {
    const deleteResponse = await pool.query<ResultSetHeader>(deleteById, [
      "Coffees",
      "coffeeId",
      id,
    ]);

    const affectedRows = deleteResponse[0].affectedRows;
    if (affectedRows === 0) {
      return Response.json(
        { message: `Could not find coffee with coffeeId: ${id}` },
        { status: 404 }
      );
    }

    return Response.json(
      { message: `Successfully deleted coffee with coffeeId: ${id}` },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `Error deleteing coffee with id: ${id}`, error },
      { status: 500 }
    );
  }
}
