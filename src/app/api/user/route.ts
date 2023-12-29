/*
 * @Author: maozhixin maozx@aeroht.com
 * @Date: 2023-12-27 15:16:00
 * @LastEditors: maozhixin maozx@aeroht.com
 * @LastEditTime: 2023-12-29 14:28:04
 * @FilePath: \ticket\src\app\api\user\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserRequest {
  userId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = (await request.json()) as UserRequest;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Bad Request",
        },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          userId: userId,
        },
      });
    }

    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      {
        message: "Internal Error",
      },
      { status: 500 }
    );
  }
}
