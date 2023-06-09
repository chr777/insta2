
import NextAuth from "next-auth"
import GoogleProvide from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvide({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),   
  ],
  pages: {
      signIn: "/auth/signin"
  },
  callbacks: {
    async session({session, token, user}) {
      session.user.username = session.user.name
      .split(' ')
      .join('')
      .toLocaleLowerCase();

      session.user.uuid = token.sub
      return session;
    }


  }
}
export default NextAuth(authOptions)