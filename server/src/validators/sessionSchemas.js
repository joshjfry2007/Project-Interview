import { z } from "zod";

export const createSessionSchema = z.object({}).strict();

export const submitAnswerSchema = z.object({
    questionId: z.number().int().positive(),
    prompt: z.string().trim().min(1, "Question cannot be empty").max(1000),
    answer: z.string().trim().min(1, "Answer cannot be empty").max(5000)
}).strict();

//bacsically limits size of prompt and ans (min & max)