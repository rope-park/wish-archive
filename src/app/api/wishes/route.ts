import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: 메시지 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const member = searchParams.get("member"); // 멤버 필터링
    const cursor = searchParams.get("cursor"); // 커서 기반 페이지네이션
    const limit = 20;

    const whereClause = member ? { targetMember: member } : {};

    const messages = await prisma.wishMessage.findMany({
      where: whereClause,
      take: limit + 1, // 다음 페이지 확인용으로 +1
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
    });

    let nextCursor = null;
    if (messages.length > limit) {
      const nextItem = messages.pop();
      nextCursor = nextItem?.id;
    }

    return NextResponse.json({
      data: messages,
      nextCursor,
      error: null,
    });
  } catch (error) {
    console.error("Failed to fetch wishes:", error);
    return NextResponse.json(
      { data: null, error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

// POST: 메시지 작성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, authorName, isAnonymous, targetMember, craneColor } = body;

    // 유효성 검사
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { data: null, error: "Message is required" },
        { status: 400 },
      );
    }

    const newMessage = await prisma.wishMessage.create({
      data: {
        message,
        authorName: isAnonymous ? null : authorName,
        isAnonymous,
        targetMember: targetMember === "ALL" ? null : targetMember,
        craneColor: craneColor || "#FFB6C1",
        userAgent: request.headers.get("user-agent"),
      },
    });

    return NextResponse.json({
      data: newMessage,
      error: null,
    });
  } catch (error) {
    console.error("Failed to create wish:", error);
    return NextResponse.json(
      { data: null, error: "Failed to create message" },
      { status: 500 },
    );
  }
}
