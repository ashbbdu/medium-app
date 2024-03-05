import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


// blogRouter.use('/api/v1/blog/*', async (c, next) => {
//     const jwt = c.req.header('Authorization');
//     if (!jwt) {
//         c.status(401);
//         return c.json({ error: "unauthorized" });
//     }
//     const token = jwt.split(' ')[1];
//     const payload = await verify(token, c.env.JWT_SECRET);
//     if (!payload) {
//         c.status(401);
//         return c.json({ error: "unauthorized" });
//     }
//     c.set('userId', payload.id);
//     await next()
// })

const auth = async (c: any, next: any) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    c.set('userId', payload.id);
    await next()
}

blogRouter.post('/blog', auth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const authorId = c.get("userId")
    console.log(authorId, "authid");

    try {
        // do validation checks
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                thumbnail: body.thumbnail,
                published: body.published,
                authorId: parseInt(authorId)
            }
        })

        return c.json({
            success: true,
            msg: "Blog created successfully !",
            blog
        })

    } catch (e) {
        console.log(e, "errr");
        c.status(404)
        return c.json({
            success: false,
            msg: "Something went wrong"
        })
    }
})

blogRouter.put('/blog', auth, async (c) => {


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const authorId = c.get("userId")
    console.log(authorId, "authid");

    try {
        // do validation checks
        const blog = await prisma.post.update({
            where: {
                id: parseInt(body.id)
            },
            data: {
                title: body.title,
                content: body.content,
                thumbnail: body.thumbnail,
                published: body.published,
            }
        })

        return c.json({
            success: true,
            msg: "Blog updated successfully !",
            blog
        })

    } catch (e) {
        console.log(e, "errr");
        c.status(404)
        return c.json({
            success: false,
            msg: "Something went wrong"
        })
    }
})

blogRouter.get('/api/v1/blog/:id', (c) => {
    return c.text("signup")
})