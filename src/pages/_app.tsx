import GlobalLayout from "@/components/GlobalLayout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout: (page:React.ReactNode) => React.ReactNode
}

export default function App({ Component, pageProps }: AppProps & {Component : NextPageWithLayout}) {

  const getLayout = Component.getLayout ?? ((page) => page);
  console.log(getLayout);
  


  return (
    <>
      <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
      </GlobalLayout>
    </>
  );
}
