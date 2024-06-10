import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: 'email',
      profileFields: ['id', 'name', 'email', 'picture']
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    // brandColor: "#2dd4bf", // Hex color code
    // logo: "/img/hit-anti-nyamuk.jpg", // Absolute URL to image
    buttonText: "Social Login" // Hex color code
  },
}

export default NextAuth(authOptions)