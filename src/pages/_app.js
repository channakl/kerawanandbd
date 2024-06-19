import "@styles/globals.css";
import "@styles/components/mobile-edge.css";
import { SessionProvider } from "next-auth/react"
import { AccountProvider } from "@/contexts/accountContext";

export default function App({ Component, pageProps }) {
  const { session } = pageProps;

  return (
    <SessionProvider session={session}>
      <AccountProvider>
        <Component {...pageProps} />
      </AccountProvider>
    </SessionProvider>
  )
}
