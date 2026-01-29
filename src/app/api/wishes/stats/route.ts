import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Group by targetMember to get counts per member
    // Note: targetMember can be null (for 'ALL')
    const groupStats = await prisma.wishMessage.groupBy({
      by: ["targetMember"],
      _count: {
        id: true,
      },
    });

    const totalCount = await prisma.wishMessage.count();

    // Format the result for easier consumption
    const stats: Record<string, number> = {
      TOTAL: totalCount,
      ALL: 0, // Initialize ALL (null targetMember)
    };

    groupStats.forEach((item) => {
      const key = item.targetMember || "ALL";
      stats[key] = item._count.id;
    });

    return NextResponse.json({
      data: stats,
      error: null,
    });
  } catch (error) {
    console.error("Failed to fetch wish stats:", error);
    return NextResponse.json(
      { data: null, error: "Failed to fetch statistics" },
      { status: 500 },
    );
  }
}
