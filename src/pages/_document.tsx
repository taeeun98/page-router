import { Html, Head, Main, NextScript } from "next/document";

// antialiased : 폰트 렌더링을 부드럽게 처리 (글꼴 가장자리 부드럽게 보정하는 tailwind)
export default function Document() {
  return (
    <Html lang="ko-KR">
      <Head />
      <body className="antialiased ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
