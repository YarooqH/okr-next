// import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
// import connectMongo from "@/utils/dbConfig";
// import User from "@/models/user";
// import { prisma } from "../../../../prisma";
// import prisma


// const prisma = new PrismaClient()
async function main() {
  try {
    await prisma.$connect();
  } catch (r) {
    return Error("Database Connection Error: ");
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  console.log("body", req?.body)
  try {
    const body = await req.json();
    const isExist = await prisma?.user?.findFirst({ where: {email: body?.email}})
    if(isExist){
      return NextResponse.json(isExist);
    } else {
      const user = await prisma?.user?.create({
        data: {
          email: body?.email,
          name: body?.name,
        },
      });
  
      return NextResponse.json(user);
    }
  } catch (e) {
    console.log(e);
  }
  // res.status(200).json(result);
};

export async function GET(req: NextRequest) {
  try {
    const user = await prisma?.leaderBoard?.findMany();
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ message: "Error: ", e }, { status: 500 });
  }

}
