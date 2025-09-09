import { User } from "@/@types/type";
import Head from "next/head";
import { useEffect, useState } from "react";

function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Head>
        <title>Triangle | Photos</title>
      </Head>
      <h1>Photos Page</h1>
      <ul>
        {users.map((u: User) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </>
  );
}
export default Page;
