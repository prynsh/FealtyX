import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';

export async function POST(req: NextRequest) {
  try {
    const { bugId, timeSpent } = await req.json();

    if (!bugId || !timeSpent) {
      return NextResponse.json({ message: 'Bug ID and time spent are required' }, { status: 400 });
    }

    const updatedBug = await prisma.bug.update({
      where: { id: Number(bugId) },
      data: {
        totalTimeSpent: {
          increment: Number(timeSpent),
        },
      },
    });

    return NextResponse.json({ message: 'Time spent updated successfully', updatedBug });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update time spent', error }, { status: 500 });
  }
}
