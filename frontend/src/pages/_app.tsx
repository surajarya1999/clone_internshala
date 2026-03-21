import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import "@/styles/globals.css";
import { store } from "../store/store";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "@/Feature/Userslice";
import { auth } from "@/firebase/firebase";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export default function App({ Component, pageProps }: AppProps) {
  function AuthListener() {
    const dispatch = useDispatch();
    useEffect(() => {
      auth.onAuthStateChanged((authuser) => {
        if (authuser) {
          dispatch(
            login({
              uid: authuser.uid,
              photo: authuser.photoURL,
              name: authuser.displayName,
              email: authuser.email,
              phoneNumber: authuser.phoneNumber,
            })
          );
        } else {
          dispatch(logout());
        }
      });
    }, [dispatch]);
    return null;
  }
  return (
    <Provider store={store}>
      <LanguageProvider>
        <AuthListener />
        <div className="bg-white">
          <Navbar />
          <ToastContainer />
          <Component {...pageProps} />
          <Footer />
        </div>
      </LanguageProvider>
    </Provider>
  );

}
