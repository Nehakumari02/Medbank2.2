import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password, admin } = credentials;
        console.log(email,password)

        try {
          await dbConnect();
          let user;
          if(admin){
            user = await User.findOne({email,role:"admin"})
          }
          else{
            user = await User.findOne({ email });
          }

          console.log(user)
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("password match",passwordsMatch)

          if (!passwordsMatch) {
            return null;
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name
          };
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        if (account) {
              // token.accessToken = account.access_token
              token.id = user.id
            }
            return token
      }
      return token;
    },
    async session({ session, token, user }) {
      // session.accessToken = token.accessToken
      session.user.id = token.id
      
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };