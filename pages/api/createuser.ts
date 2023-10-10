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
  if (req.method === 'POST') {
    try {
      const { email, fname, password,role_name } = req.body;
  
      // Create the user and connect it to the role
     const createUserAndRole = await prisma.user.create({
      data: {
        email,
        fname,
        password,
        roles: {
          create: [
            {
              assignedBy: 'Bob',
              assignedAt: new Date(),
              role: {
                create: {
                   role_name,
                },
              },
            },
          ],
        },

      },
      include: {roles:{
        include:{
          role:true
        }

      } }
     })
     console.log(createUserAndRole)
      res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); 
  }
}
