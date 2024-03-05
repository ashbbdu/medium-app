// import { Hono } from "hono";
// import { verify } from "hono/jwt";

// const app = new Hono<{
// 	Bindings: {
// 		DATABASE_URL: string,
//     JWT_SECRET : string
// 	},
//   Variables : {
// 		userId: string
// 	}
// }>()

// export const auth = () => async (c, next) => {
// 	const jwt = c.req.header('Authorization');
// 	if (!jwt) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
// 	const token = jwt.split(' ')[1];
// 	const payload = await verify(token, c.env.JWT_SECRET);
// 	if (!payload) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
// 	c.set('userId', payload.id);
// 	await next()
// }