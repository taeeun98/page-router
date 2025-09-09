// next 에서의 데이터 패치
import fetchPhotos from "@/utils/fetchPhotos";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// 이름 정해져있음
// getServerSideProps 라는 함수는 내보내는 순간
// 알아서 이 전체 코드가 서버에 올라갔을때 실행되고
// 다시 돌아왔을때는 실행되지 않음
// 그럼 이 데이터를 어떻게 사용하냐?
// export const getServerSideProps = async () => {
//   const data = await fetchPhotos();

//   return {
//     props: {
//       data,
//     },
//   };
// };

export const getStaticProps = async () => {
  const data = await fetchPhotos();

  return {
    props: {
      data,
    },
  };
};

// 서버에서 실행시킨 함수의 리턴값을 여기서 받을수있음
// 당연히 InferGet...Type 타입도 정해진 이름

// function Page({
//   data,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
function Page({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Triangle | Photos</title>
      </Head>
      <h1>Photos Page</h1>
      <ul className="grid grid-cols-2 gap-4 p-4">
        {data.map(({ id, author, download_url, width }) => (
          <li key={id} className="mb-4">
            {/* img 대신 Image 사용. 이미지 최적화를 위해 */}
            <Link href={`photos/${id}`}>
              <Image
                priority={width > 4000}
                src={download_url}
                alt={author}
                width={300}
                height={200}
                style={{ width: "auto", height: "100%" }}
              />
            </Link>
            <span className="block w-10/12 overflow-hidden text-ellipsis whitespace-nowrap">
              작가 : {author}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Page;
