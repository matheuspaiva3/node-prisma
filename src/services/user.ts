import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { strict } from "assert";
type PostCreateInput = {
  title: string;
  body: string;
  authorId: number;
};
type CreateUserProps = {
  name: string;
  email: string;
};
//To create a single user using find or create style
export const createUser = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.upsert({
    where: {
      email: data.email,
    },
    update: {},
    create: data,
  });
  return user;
};
//To create many users
export const createUsers = async (users: Prisma.UserCreateInput[]) => {
  try {
    const user = await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });
  } catch (error) {
    return false;
  }
};
//To list all the users in a paging style
export const getAllUser = async () => {
  let page = 0;
  let skip = page * 2;
  let take = 2;
  const users = await prisma.user.findMany({
    skip: skip,
    take: take,
  });
  return users;
};
//Get user by email that we sent by the param
export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });
  return user;
};
//To create a single post, I have to inform the authorId manually
export const createPost = async ({
  title,
  body,
  authorId,
}: PostCreateInput) => {
  const post = await prisma.post.create({
    data: {
      title,
      body,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
  return post;
};
//To update a user
export const updateUser = async () => {
  const updatedUser = await prisma.user.updateMany({
    where: {
      email: {
        endsWith: "@gmail.com",
      },
    },
    data: {
      role: "USER",
    },
  });
  return updatedUser;
};
//To delete a user if I do the onDelete Cascade
export const deleteUser = async(email:string) => {
  const deletedUser = await prisma.user.delete({
    where:{
      email: email
    }
  })
  return deletedUser
}
//Option to delete if I don't put onDelete: Cascade in prisma Schema
// export const deleteUser = async (email: string) => {
//   try {
//     // Fetch the user to get the ID
//     const user = await prisma.user.findUnique({
//       where: { email },
//       select: { id: true }
//     });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     const userId = user.id;

//     // First, delete the related posts
//     await prisma.post.deleteMany({
//       where: {
//         userId: userId // Use the userId directly
//       }
//     });

//     // Then, delete the user
//     const deletedUser = await prisma.user.delete({
//       where: { id: userId } // Use the userId directly
//     });

//     return deletedUser;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error deleting user');
//   }
// };

