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
        const { email, password, admin, language } = credentials;
        console.log(email, password);

        try {
          await dbConnect();
          let user;
          if (admin) {
            user = await User.findOne({ email, role: "admin" });
          } else {
            user = await User.findOne({ email });
          }

          console.log(user);
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("password match", passwordsMatch);

          if (!passwordsMatch) {
            return null;
          }

          // Return user object with language included
          return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role || "user", // Default to "user" if role is missing
            language // Include language here
          };
        } catch (error) {
          console.log("Error: ", error);
          return null; // Return null on error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = user.id;
        token.role = user.role; // Include the role in the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role; // Include role in session
      
      return session;
    },
    // async redirect({ url, baseUrl, user }) {
    //   const language = user?.language || 'en'; // Fallback to 'en' if language is not set
    
    //   if (user) {
    //     if (user.role === "admin") {
    //       return `${baseUrl}/${language}/Admin_Restricted/Dashboard`;
    //     }
    //     return `${baseUrl}/${language}/${user.id}/Dashboard`; // Default redirect for regular users
    //   }
      
    //   return baseUrl; // Fallback redirect if user is not defined
    // }
    
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
