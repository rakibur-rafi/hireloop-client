import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const ROLES = ["seeker", "recruiter", "admin"] as const;

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hireloopdb");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "seeker",
                input: true,
            },
        },
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-up/email") {
                const role = (ctx.body as { role?: string } | undefined)?.role;
                if (role !== undefined && !ROLES.includes(role as (typeof ROLES)[number])) {
                    throw new APIError("BAD_REQUEST", {
                        message: "Invalid role",
                    });
                }
            }
        }),
    },
    database: mongodbAdapter(db, {
        client,
    }),

});
