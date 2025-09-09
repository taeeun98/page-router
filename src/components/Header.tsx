import { naviItems } from "@/utils/navigaion";
import tw from "@/utils/tw";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  // next 는 navLink 가 없다. 그래서 현재 활성화 된 네비를 찾아야함
  const router = useRouter();

  return (
    <header className="bg-white text-slate-600 px-4 py-2 flex justify-between items-center">
      <h1>
        <Link href="/">❤️</Link>
      </h1>
      <nav>
        <h2 className="sr-only">메인 메뉴</h2>
        <ul className="flex gap-3">
          {naviItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={tw(
                "hover:text-red-400 transition-colors font-bold",
                router.pathname === href && "text-blue-500 underline"
              )}
            >
              {label}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
