import { verify } from "hono/jwt";

export const auth = async (c : any , next : any) => {
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
}