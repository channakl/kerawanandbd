import Layout from "@/modules/layout";
import "@styles/globals.css";
import "@styles/components/mobile-edge.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
