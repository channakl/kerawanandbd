import "@styles/globals.css";
import "@styles/components/mobile-edge.css";
import { SessionProvider, getSession } from "next-auth/react"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const { session } = pageProps;
  const router = useRouter();

  const LOGIN_PAGE_URL = '/';
  const PUBLIC_URL = '/public'
  const nonAuthPages = [LOGIN_PAGE_URL];
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const session = await getSession();
  //     if (!session && !nonAuthPages.includes(router.pathname)) {
  //       router.push(LOGIN_PAGE_URL);
  //     }
  //     // if (session && router.pathname === LOGIN_PAGE_URL) {
  //     //   router.push('/incident-rate');
  //     // }
  //   };

  //   checkAuth();
  // }, [router.pathname]);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
