import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  

  return (
    <>
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <Link href="/create">
          <a>Create a Form</a>
        </Link>
      </div>
    </>
  );
};

export default Home;

