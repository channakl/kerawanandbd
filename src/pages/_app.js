import "@styles/globals.css";
import "@styles/components/mobile-edge.css";
import { SessionProvider } from "next-auth/react"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function App({ Component, pageProps }) {
  const firebaseConfig = {
    apiKey: "AIzaSyC4ZW4fQRT6R_i3tqRF0tEAfW6POZtIoNU",
    authDomain: "kerawanan-db.firebaseapp.com",
    projectId: "kerawanan-db",
    storageBucket: "kerawanan-db.appspot.com",
    messagingSenderId: "911260976922",
    appId: "1:911260976922:web:e2e1f52db19e1e860f0ea3"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { session } = pageProps;
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
