import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  

  return (
      <>
          <div>
              <Link href="/create">
                  <a className="px-4 py-2 border rounded-md border-slate-100 hover:bg-sky-900">Create a Form</a>
              </Link>
          </div>
      </>
  );
};

export default Home;

