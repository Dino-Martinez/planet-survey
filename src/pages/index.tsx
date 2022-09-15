import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const Home: NextPage = () => {
  const [slug, setSlug] = useState('');

  return (
      <>
          <div className="flex items-center gap-5 justify-center">
              <Link href="/create">
                  <a className="px-4 py-2 border rounded-md border-slate-100 hover:bg-sky-900">Create a Form</a>
              </Link>
              <p>OR</p>
              <div>
                  <input
                      type="text"
                      placeholder="Enter form identifier"
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                      className="bg-transparent border rounded-md border-slate-100"
                  />
                  <Link href={`/forms/${slug}`}>
                      <a className="ml-3 px-4 py-2 border rounded-md border-slate-100 hover:bg-sky-900">Search</a>
                  </Link>
              </div>
          </div>
      </>
  );
};

export default Home;

