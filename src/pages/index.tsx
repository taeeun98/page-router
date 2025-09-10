import { getRandomPhotos } from "@/utils/getRandomPhotos";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";


export const getStaticProps = async () => {
// export const getServerSideProps = async () => {
  
  const data = await getRandomPhotos();

  return {
    props: { data },
    revalidate: 10 // production
  }
}



export default function Home({data}:InferGetStaticPropsType<typeof getStaticProps>) {
// export default function Home({data}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  
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
        <ul className="flex flex-col gap-20 p-3 items-center">
          {
            data.map( (url,i) => (
              <li key={url+i}>
                <Image src={url} alt={''} width={400} height={300}/>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}