import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
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