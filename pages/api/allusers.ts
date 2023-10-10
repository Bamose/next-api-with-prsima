import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      /*   const allpost = await prisma.gab.findMany( { include: {user: {select:{id:true, image:true}}}
      const { email, fname, password,role_name } = req.body;
   */
      // Create the user and connect it to the role
      const allusers = await prisma.user.findMany({
        include: {
          roles: {
            select: {
              role: true,
            },
          },
        },
      })
      
     console.log(allusers)
      res.status(201).json({ message: 'ok' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); 
  }
}
