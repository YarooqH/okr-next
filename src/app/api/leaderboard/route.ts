
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { User } from "@prisma/client";

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
    const user = await prisma?.user?.findFirst({ where: {email: body?.email}})
    const leaderBoardUser = await prisma?.leaderBoard?.findFirst({where: {userEmail: body?.email}})

    let newPoints = body?.points > user!.highestPoints ? body?.points : user?.highestPoints

    const newUser = await prisma?.user?.update({
        where: {
            email: body?.email
        },
        data: {
            highestPoints: newPoints,
            totalPoints: {
                increment: body?.points
            }
        }
    })

    const leaderBoardRes = await prisma?.leaderBoard?.update({
        where: {
            id: leaderBoardUser?.id
        },
        data: {
            points: newUser?.totalPoints
        }
    })

    return NextResponse.json({...leaderBoardRes, ...newUser})
  } catch (e) {
    console.log(e);
  }
  // res.status(200).json(result);
};

export async function GET(req: NextRequest) {
  try {
    const user = await prisma?.leaderBoard?.findMany({
        orderBy: {
            points: "desc"
        },
        take: 10
    });
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ message: "Error: ", e }, { status: 500 });
  }

}
