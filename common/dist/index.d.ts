import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninInput = z.infer<typeof signinInput>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    thumbnail?: string | undefined;
    published?: boolean | undefined;
}, {
    title: string;
    content: string;
    thumbnail?: string | undefined;
    published?: boolean | undefined;
}>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export declare const updateBlogInput: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    content: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: number;
    thumbnail?: string | undefined;
    published?: boolean | undefined;
}, {
    title: string;
    content: string;
    id: number;
    thumbnail?: string | undefined;
    published?: boolean | undefined;
}>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
