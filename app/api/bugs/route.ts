import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "../../../prisma/db";

const bugSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    project: z.string().min(1),
    assignee: z.string().optional(),
    dueDate: z.string().optional()
});

export async function GET() {
    try {
        const bugs = await prisma.bug.findMany();

        return NextResponse.json({ bugs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch bugs", error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { success, error } = bugSchema.safeParse(body);

    if (!success) {
        return NextResponse.json({ message: "Incorrect Inputs", error }, { status: 400 });
    }

    try {
        const newBug = await prisma.bug.create({
            data: {
                title: body.title,
                description: body.description,
                project: body.project,
                assignee: body.assignee,
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
                priority:body.priority,
            },
        });

        return NextResponse.json({ message: "Issue created", data: newBug }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create a bug", error }, { status: 500 });
    }
}
