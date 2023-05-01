import Layout from "../components/Layout";
import "../styles/globals.scss";
import React from "react";
import useStore from "@/hooks/useStore";
import BlackMask from "@/components/UI/BlackMask";
import UnityBuild from "@/components/UnityBuild";

export default function MyApp({ Component, pageProps }: any) {
  
  const videoSequence = useStore((state: any) => state.videoSequence);

  return (
    <Layout>
      <Component {...pageProps} />
      {videoSequence && (
        <BlackMask />
      )}
      <UnityBuild />
    </Layout>
  );
}
