import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { toast } from "sonner";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                const response = await res.json();

                user = response.data.user;
                user.token = response.data.token;

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error("User not found.")
                }

                user.image = `http://172.19.0.4:3002/files/${user.profileImage}`;
                // return user object with the their profile data
                return user
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    // callbacks: {
    //     jwt({ token, user }) {
    //       if (user) { // User is available during sign-in
    //         console.log("usercallnba: ",user);
    //         token.id = user.id
    //       }
    //       return token
    //     },
    //     session({ session, token }) {
    //       session.user.id = token.id as string;
    //       return session
    //     },
    //   },
})
