/*
[id] : dynamic route
[...id] : catch-all segments
[[...id]] : optional catch-all segments
*/

import fetchPhotosByOne from "@/utils/fetchPhotosByOne";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";



// export const getServerSideProps = async ({
//   query,
// }: GetServerSidePropsContext) => {
//   const { id } = query;

//   console.log(id);
//   const data = await fetchPhotosByOne(id as string);

//   return {
//     props: { data },
//   };
// };


export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '40' } },
      { params: { id: '41' } },
      { params: { id: '42' } },
    ],
    fallback: true
  }
}


export const getStaticProps = async ({params}:GetStaticPropsContext) => {
  const {id} = params!;
  const data = await fetchPhotosByOne(id as string);

  return {
    props: { data },
  };
};



// function Page({
//   data,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
function Page({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) {

  // const router = useRouter();
  // const query = router.query.id;

  if (!data) return <div>이미지 로드 실패</div>;

  return (
    <div className="flex flex-col p-4">
      <h2>👀 작품 자세히 보기 👀</h2>
      <h3>Image Id : {data.id}</h3>
      <Image
        src={data.download_url}
        alt={data.author}
        width={data.width}
        height={data.height}
      />
      <h4>Photo by : {data.author}</h4>
      <p>
        Image URL :
        <a className="text-amber-300" href={data.url}>
          {data.url}
        </a>
      </p>
    </div>
  );
}

export default Page;
