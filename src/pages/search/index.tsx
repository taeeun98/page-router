import TopBadgeLayout from "@/components/TopBadgeLayout"
import fetchPhotos from "@/utils/fetchPhotos";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import Head from "next/head"
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";


/* 

1. getServerSideProps or getStaticProps를 사용해 데이터 패칭 ( 전체 데이터 )
  - fetchPhotos()

2. 데이터 컴포넌트 안에서 받기
3. 받은 데이터 필터링 (파생 데이터)
4. 필터링된 데이터 랜더링

*/


// export const getServerSideProps = async() => {
export const getStaticProps = async() => {
  const data = await fetchPhotos();

  // filter 

  return {
    props :{
      data
    }
  }
}


// function Page({data}:InferGetServerSidePropsType<typeof getServerSideProps>) {
function Page({data}:InferGetStaticPropsType<typeof getStaticProps>) {

  // Tanstack query 

  
  const router = useRouter();
  const q = (router.query.q as string)?.trim() ?? '';

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector<HTMLInputElement>('#search')!;
    const keyword = input.value.trim();
    
    router.push({
      pathname:'/search',
      query: keyword ? {q : keyword} : {}
    })
    
  }

  // 파생 데이터
  const results = q ? data.filter((p)=> p.author.toLowerCase().includes(q.toLowerCase())) : []


  return (

    <>
      <Head>
        <title>Triangle | Search</title>
      </Head>

      <div>
        <form onSubmit={onSubmit} className="border border-gray-600 m-4 p-2 rounded flex justify-center items-center">
          <label htmlFor="search">
            <input id="search" type="search" className="border border-amber-50 rounded indent-2"/>
          </label>
          <button type="submit" className="bg-blue-500 px-2 rounded py-0.5 font-bold ml-2">검색</button>
        </form>
        <div className="px-4">
          {
            q && (
              <p className="text-sm mb-4"> 
                <b>{q}</b> 
                검색 결과 : {results.length}건
              </p>
            )
          }
          <ul className="grid grid-cols-2 gap-4">
            {
              results.map((p)=>(
                <li key={p.id}>
                  <Link 
                    href={`/photos/${p.id}`}
                    aria-label={`${p.id}페이지로 이동`}
                  >
                    <Image 
                      src={p.download_url}
                      alt={p.author}
                      width={400}
                      height={300}
                      style={{width:'100%',height:'auto'}}
                    />
                  </Link>
                  <span>
                    Photo by {p.author}
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
} 

export default Page



Page.getLayout = (page:React.ReactNode) => {
  return <TopBadgeLayout>{page}</TopBadgeLayout>
}