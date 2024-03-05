import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign , verify } from 'hono/jwt'

// const app  new Hono()
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET : string
	},
  Variables : {
		userId: string
	}
}>();

app.use('/api/v1/blog/*', async (c, next) => {
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
})

app.get('/', (c) => {
  return c.text('Hello Hono!!!')
})



app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body =  await c.req.json()
  
  try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,

			},
      include : {
        posts : true
      }
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ user , token : jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

app.post('/api/v1/signin', async (c) => {
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

app.post('/api/v1/blog', (c) => {
  return c.text(c.get("userId"))
})

app.put('/api/v1/blog', (c) => {
  return c.text("signup")
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text("signup")
})


export default app
