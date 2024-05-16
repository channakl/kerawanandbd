import "@styles/globals.css";
import "@styles/components/mobile-edge.css";
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
