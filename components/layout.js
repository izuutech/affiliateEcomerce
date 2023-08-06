import Head from "next/head";
import Footer from "./footer";
import Header from "./header";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";

function Layout({ simpleHeader, hideAuth, children }) {
  const authUser = useContext(AuthContext);
  const hideAuthen = hideAuth ? hideAuth : authUser?.isUserAuthenticated;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Best e-commerce app" />
        <link rel="icon" href="/favicon.ico" />
        <title>The Affiliate</title>
      </Head>
      <div className="d-flex flex-column h-100">
        <Header simple={simpleHeader} hideAuth={hideAuthen} />
        <main className="flex-shrink-0">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
