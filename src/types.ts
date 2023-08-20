import { z } from "zod";
import type { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "./server/api/root";
// import { type } from "os";

type  RouterOutputs=inferRouterOutputs<AppRouter>
type allTodosOutput=RouterOutputs['todo']['all']
export type Todo=allTodosOutput[number]

export const todoInput=z.string({
    required_error:"describe your todo"
}).min(1).max(50)