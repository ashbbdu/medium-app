import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { jwt, sign , verify } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

userRouter.post("/signup", async (c) => {
    // console.log(c.req.query("search")    , "context");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,

            },
            include: {
                posts: true
            }
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ user, token: jwt });
    } catch (e) {
        console.log(e, "eroor");

        c.status(403);
        return c.json({ error: "Error while signing up" });
    }
})


userRouter.post("/signin" , async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body =  await c.req.json()
    const { email , password } = body;
    if(!email || !password) {
      c.status(401);
      return c.json({
        success : false,
        message : "Please fill all the details !",
      })
    }
    const existingUser = await prisma.user.findUnique({
      
      where : {
        email : email
      }
    })
    if(!existingUser) {
      c.status(401);
      return c.json({
        success : false,
        message : "Invalid User !",
      })
    }
    if(password !== existingUser.password) {
      c.status(200);
      return c.json({
        success : false,
        message : "Invalid Password !",
      })
    }
      const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);
    return c.json({
      success : true,
      message : "User Logged in successfully !",
      user : existingUser,
      token
    })
  
  })