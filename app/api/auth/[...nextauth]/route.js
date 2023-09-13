import connect from '@/lib/db';
import User from '@/models/User';
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google"
import { toast } from 'react-toastify';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connect();
          const user = await User.findOne({ email });

          if (!user) {
            console.log("no user")
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

  ],


  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {
        await connect();
  
        const existingUser = await User.findOne({ email: profile.email });
  
        if (!existingUser) {
          // Create a user in the database based on Google profile
          await User.create({
            email: profile.email,
            name: profile.name.replace(" ", "").toLowerCase(),
            // You can add more properties here as needed
          });
        }
      }
      return {
        status: 'success',
        message: 'Logged in successfully',
      };
    },



    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },



    async session({ session, token, user}) {

      const existingUser = await User.findOne({ email: session.user?.email });
 ///////////////////////////////////
      session.accessToken = token.accessToken

      return session
    },

    async redirect({ url, baseUrl }) {
      return baseUrl
    },

  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };