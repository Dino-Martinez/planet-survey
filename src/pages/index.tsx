import clsx from "clsx";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import {button} from "../styles/tw-components";
const Home: NextPage = () => {
  const [slug, setSlug] = useState('');

  return (
      <>
          <div className="flex items-center gap-5 justify-center">
              <Link href="/create">
                  <a className={button}>Create a Form</a>
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
                      <a className={clsx(button, "ml-3")}>Search</a>
                  </Link>
              </div>
          </div>
      </>
  );
};

export default Home;

