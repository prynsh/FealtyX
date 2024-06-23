// import { NextRequest, NextResponse } from "next/server";
// import { z } from 'zod';
// import prisma from "../../../prisma/db";

// const bugSchema = z.object({
//   id: z.number(),
//   title: z.string().min(1),
//   description: z.string().min(1),
//   project: z.string().min(1),
//   assignee: z.string().optional(),
//   dueDate: z.string().optional(),
//   priority: z.string()
// });

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');

//   if (id) {
//     try {
//       const bug = await prisma.bug.findUnique({
//         where: {
//           id: Number(id),
//         },
//       });

//       if (!bug) {
//         return NextResponse.json({ message: "Bug not found" }, { status: 404 });
//       }

//       return NextResponse.json({ bug }, { status: 200 });
//     } catch (error) {
//       return NextResponse.json({ message: "Failed to fetch bug", error }, { status: 500 });
//     }
//   } else {
//     try {
//       const bugs = await prisma.bug.findMany();
//       return NextResponse.json({ bugs }, { status: 200 });
//     } catch (error) {
//       return NextResponse.json({ message: "Failed to fetch bugs", error }, { status: 500 });
//     }
//   }
// }

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const { success, error } = bugSchema.safeParse(body);

//   if (!success) {
//     return NextResponse.json({ message: "Incorrect Inputs", error }, { status: 400 });
//   }

//   try {
//     const newBug = await prisma.bug.create({
//       data: {
//         title: body.title,
//         description: body.description,
//         project: body.project,
//         assignee: body.assignee,
//         dueDate: body.dueDate ? new Date(body.dueDate) : null,
//         priority: body.priority,
//       },
//     });

//     return NextResponse.json({ message: "Issue created", data: newBug }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to create a bug", error }, { status: 500 });
//   }
// }

// export async function DELETE(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');

//   if (!id) {
//     return NextResponse.json({ message: "ID is required" }, { status: 400 });
//   }

//   try {
//     const bugId = Number(id);

//     const deletedBug = await prisma.bug.delete({
//       where: { id: bugId },
//     });

//     if (!deletedBug) {
//       return NextResponse.json({ message: `Bug with ID ${bugId} not found`, error: null }, { status: 404 });
//     }

//     return NextResponse.json({ message: `Bug with ID ${bugId} deleted successfully`, data: deletedBug }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: `Failed to delete bug with ID ${id}`, error }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "../../../prisma/db";

const bugSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  project: z.string().min(1),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.string().min(1)
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    try {
      const bug = await prisma.bug.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!bug) {
        return NextResponse.json({ message: "Bug not found" }, { status: 404 });
      }

      return NextResponse.json({ bug }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to fetch bug", error }, { status: 500 });
    }
  } else {
    try {
      const bugs = await prisma.bug.findMany();
      return NextResponse.json({ bugs }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to fetch bugs", error }, { status: 500 });
    }
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
        priority: body.priority,
      },
    });

    return NextResponse.json({ message: "Issue created", data: newBug }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create a bug", error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    const bugId = Number(id);

    const deletedBug = await prisma.bug.delete({
      where: { id: bugId },
    });

    if (!deletedBug) {
      return NextResponse.json({ message: `Bug with ID ${bugId} not found`, error: null }, { status: 404 });
    }

    return NextResponse.json({ message: `Bug with ID ${bugId} deleted successfully`, data: deletedBug }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Failed to delete bug with ID ${id}`, error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const body = await request.json();
  const { success, error } = bugSchema.safeParse(body);

  if (!success) {
    return NextResponse.json({ message: "Incorrect Inputs", error }, { status: 400 });
  }

  try {
    const bugId = Number(id);

    const updatedBug = await prisma.bug.update({
      where: { id: bugId },
      data: {
        title: body.title,
        description: body.description,
        project: body.project,
        assignee: body.assignee,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        priority: body.priority,
      },
    });

    if (!updatedBug) {
      return NextResponse.json({ message: `Bug with ID ${bugId} not found`, error: null }, { status: 404 });
    }

    return NextResponse.json({ message: `Bug with ID ${bugId} updated successfully`, data: updatedBug }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Failed to update bug with ID ${id}`, error }, { status: 500 });
  }
}
