import { getRandomPhotos } from "@/utils/getRandomPhotos";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const getStaticProps = async () => {
  // export const getServerSideProps = async () => {

  const data = await getRandomPhotos();

  return {
    props: { data },
    revalidate: 10, // production
  };
};

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // export default function Home({data}:InferGetServerSidePropsType<typeof getServerSideProps>) {

  const listRef = useRef<HTMLUListElement>(null);

  // 1. Next.js(SSR 환경) + React 에서는 gsap 같은 라이브러리를 useEffect 안에서 동적 import
  // 왜? gsap, ScrollTrigger 같은 애니메이션 라이브러리는 내부에서 window, document 객체를 바로 참조함.
  // 그런데 **서버 렌더링 시점(Next.js의 pre-render)**에는 window/document가 존재하지 않음 → 에러 발생.
  // 그래서 브라우저 환경에서만 import 되도록 useEffect 안에서 동적 import
  useEffect(() => {
    let ctx: { revert(): void } | undefined;

    (async () => {
      if (typeof window === "undefined") return;

      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

       // 2. gsap.context 사용 (cleanup까지 포함)
      ctx = gsap.context(() => {
        // 3. 대상 찾아서 배열로 만들기
        const items = gsap.utils.toArray<HTMLElement>(".photo-item");

        // 4. 각 요소에 애니메이션 적용
        items.forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger:{
              trigger:el, // 애니메이션 대상
              start: 'top 80%', // el위치, brower위치. el위치가 brower에 닿으면 애니메이션 시작
              toggleActions: 'play none none reverse',
              markers: true // 마커 표시
            }
          });
        });
      }, listRef);

      // 5. cleanup (컴포넌트 언마운트 시 애니메이션 해제)
      return () => ctx?.revert();
    })();
  }, []);


  
  return (
    <>
      <Head>
        <title>Triangle | Home</title>
      </Head>
      <div>
        <h1 className="text-center p-10">
          <strong className="text-3xl">Triangle에서</strong>
          <span className="block">다양한 작가들의</span>
          <span>사진들을 만나보세요</span>
        </h1>
        <ul ref={listRef} className="flex flex-col gap-20 p-3 items-center">
          {data.map((url, i) => (
            <li key={url + i}>
              <Image src={url} alt={""} width={400} height={300} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
