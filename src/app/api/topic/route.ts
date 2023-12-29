/*
 * @Author: maozhixin maozx@aeroht.com
 * @Date: 2023-12-29 14:07:26
 * @LastEditors: maozhixin maozx@aeroht.com
 * @LastEditTime: 2023-12-29 16:02:10
 * @FilePath: \ticket\src\app\api\topic\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface TopicRequest {
  userId: string;
  avatar: string;
  content: string;
  images: string[];
  options: string[];
}

const prisma = new PrismaClient();

export async function GET() {
  try {
    const topic = await prisma.topic.findMany({
      include: {
        options: true,
      },
    });
    return NextResponse.json(
      {
        topic,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Internal error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as TopicRequest;

    const topic = await prisma.topic.create({
      data: {
        userId: data.userId,
        avatar: data.avatar,
        content: data.content,
        images: data.images,
        options: {
          create: data.options.map((i) => ({
            key: i,
            value: 0,
          })),
        },
      },
      include: {
        options: true,
      },
    });
    return NextResponse.json(topic, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Internal error",
      },
      { status: 500 }
    );
  }
}
