import { z } from "zod";
import{todoInput} from '../../../types'
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const todoRouter = createTRPCRouter({
  

  all: protectedProcedure.query(async({ctx}) => {
    const todos= await ctx.prisma.todo.findMany({
        where:{
            userId:ctx.session.user.id,
        },

    });
    return todos.map(({id,text,done})=>({id,text,done}))
    
  }),
  create: protectedProcedure.input(todoInput).mutation(({ctx,input}) => {
    // throw new TRPCError({code:"BAD_REQUEST"})
    return ctx.prisma.todo.create({
        data:{
            text:input,
            user:{
                connect:{
                    id:ctx.session.user.id,
                }
            }
        }
    })
  }),

  delete: protectedProcedure.input(z.string()).mutation(({ctx,input}) => {
    return ctx.prisma.todo.delete({
        where:{
            id:input,
        },
    });
  }),

  toggle: protectedProcedure.input(z.object({
    id:z.string(),
    done:z.boolean()
  })).mutation(({ctx,input:{id,done}}) => {
    return ctx.prisma.todo.update({
        where:{
            id,
        },
        data:{
            done,
        }
    });
  }),

});
