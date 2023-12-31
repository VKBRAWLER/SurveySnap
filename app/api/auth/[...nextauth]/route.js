import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();
        return session;
    },
    async signIn({ profile }) {
        try {
            // serverless  -> lamda  -> dbmongo
            await connectToDB();
            // check if a user already exists
            const userExists = await User.findOne({
                email: profile.email
            })

            // if not create a new user
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(' ', '').toLowerCase(),
                    image: profile.picture,
                    password: null,
                    membership: "basic",
                    interest_tag: [],
                    survey_created: 0,
                    survey_answered: 0,
                    snap_points: 0,
                }); 
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    }
})

export { handler as GET, handler as POST};
// to understand it more go to https://next-auth.js.org.