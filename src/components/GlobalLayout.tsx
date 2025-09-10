import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useRef } from "react";

function GlobalLayout({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    let smoother: { kill(): void };

    (async () => {
      if (typeof window === "undefined") return;

      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
        const { ScrollSmoother } = await import("gsap/dist/ScrollSmoother");

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        // DOM 이 완전히 로드된 후 실행
        await new Promise((resolve) => {
          if (document.readyState === "complete") {
            resolve(true);
          } else {
            window.addEventListener("load", () => resolve(true));
          }
        });

        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
          normalizeScroll: true, // 모바일호환성
          ignoreMobileResize: true // 모바일에서 resize event 무시
        });

        initialized.current = true;
        
      } catch {
        console.error("ScorllSmoother 초기화 실패");
      }
    })();

    return () => {
      if (smoother) {
        smoother.kill();
        initialized.current = false;
      }
    };
  });

  return (
    <>
      <Head>
        <title>Triangle</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="페이지 라우터를 통해 배우는 Next.js"
        />
        <link rel="shortcut icon" href="/vercel.svg" />
      </Head>
      <div id="smooth-wrapper" className="min-h-screen">
        <div id="smooth-content">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
export default GlobalLayout;
