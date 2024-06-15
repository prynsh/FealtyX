import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/db';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { bugId, timeSpent } = req.body;

  if (!bugId || !timeSpent) {
    return res.status(400).json({ message: 'Bug ID and time spent are required' });
  }

  try {
    const updatedBug = await prisma.bug.update({
      where: { id: Number(bugId) },
      data: {
        totalTimeSpent: {
          increment: Number(timeSpent),
        },
      },
    });

    return res.status(200).json({ message: 'Time spent updated successfully', updatedBug });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update time spent', error });
  }
}
