import { Hono } from 'hono'
import { blogRouter } from './routes/blog';
import { userRouter } from './routes/user';

const app  =  new Hono()
// const app = new Hono<{
//   Bindings: {
//     DATABASE_URL: string,
//     JWT_SECRET: string
//   },
//   Variables: {
//     userId: string
//   }
// }>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blogs" , blogRouter)

export default app
