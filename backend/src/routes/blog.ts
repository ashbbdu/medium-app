import { createBlogInput, updateBlogInput } from "@ash7007/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

blogRouter.use('/*', async (c, next) => {
    const token = c.req.header('Authorization')?.replace("Bearer ", "");
    if (!token) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    try {
        const payload = await verify(token, c.env.JWT_SECRET);
        if (payload) {
            c.set("userId", payload.id);
            await next();
        }
    } catch (error) {
        c.status(401);
        return c.json({ msg: "Invalid Token" });
    }
})

// const auth = async (c: any, next: any) => {
//     try {
//         const token = c.req.header("Authorization") || "";
//         console.log(token , "token");

//         // if (!token) {
//         //     c.status(401);
//         //     return c.json({ error: "unauthorized" });
//         // }

//         const payload = await verify(token, c.env.JWT_SECRET);
//         console.log(payload , "payload");

//         if (payload) {
//             c.set("userId", payload.id);
//              await next();
//         } else {
//             c.status(401);
//             return c.json({ error: "Invalid Token" });
//         }

//     } catch (e) {
//         c.status(401);
//         c.json({
//             success: false,
//             message: "Please login to perform this action",
//         })
//     }


// };

blogRouter.post("/blog", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const authorId = c.get("userId");
    console.log(authorId, "authid");

    try {
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
          c.status(403);
          return c.json({
            success: false,
            msg: "Invalid Inputs",
          });
        }
        // do validation checks
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                thumbnail: body.thumbnail,
                published: body.published,
                authorId: parseInt(authorId),
            },
        });

        return c.json({
            success: true,
            msg: "Blog created successfully !",
            blog,
        });
    } catch (e) {
        c.status(404);
        return c.json({
            success: false,
            msg: "Something went wrong",
        });
    }
});

blogRouter.put("/blog", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const authorId = c.get("userId");

    try {
        const { success } = updateBlogInput.safeParse(body);
        if (!success) {
          c.status(403);
          return c.json({
            success: false,
            msg: "Invalid Inputs",
          });
        }
        // do validation checks
        const blog = await prisma.post.update({
            where: {
                id: parseInt(body.id),
            },
            data: {
                title: body.title,
                content: body.content,
                thumbnail: body.thumbnail,
                published: body.published,
            },
        });

        return c.json({
            success: true,
            msg: "Blog updated successfully !",
            blog,
        });
    } catch (e) {
        console.log(e, "errr");
        c.status(404);
        return c.json({
            success: false,
            msg: "Something went wrong",
        });
    }
});

// TODO : Add Pagination
blogRouter.get("/blog",  async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogs = await prisma.post.findMany({
            select : {
                content : true,
                id : true,
                title : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
        c.status(200);
        return c.json({
            success: true,
            msg: "Blogs fetched successfully !",
            blogs,
        });
    } catch (error) {
        c.status(404);
        return c.json({
            success: false,
            msg: "Something went wrong",
        });
    }
});

blogRouter.get("/blog/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param("id");
    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
            select : {
                content : true,
                id : true,
                title : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
        console.log(id, typeof id, "id");

        c.status(200);
        return c.json({
            success: true,
            msg: "Blog fetched successfully !",
            blog,
        });
    } catch (error) {
        c.status(404);
        return c.json({
            success: false,
            msg: "Something went wrong",
        });
    }
});
