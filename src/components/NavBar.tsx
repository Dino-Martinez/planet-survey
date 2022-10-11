import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { navLink } from "../styles/tw-components";
import Image from "next/image";
export const NavBar:React.FC = () => {
    const {data: session, status} = useSession();
    return (
        <nav className="flex justify-center gap-6 py-4 border-b-2 bg-neutral-900 text-slate-100">
            <Link href="/login">
                <a className={navLink}>
                    {status === 'unauthenticated' &&
                        <>Login</>
                    }
                    {status === 'authenticated' &&
                        <>Logout</>
                    }
                </a>
            </Link>
            <Link href="/create">
                <a className={navLink}>Create a Form</a>
            </Link>
            {session && session.user && 
                <Image
                    alt="profile picture"
                    src={session.user?.image ?? "/profile-picture.png"}
                    width={36}
                    height={36}
                    className="rounded-full"
                />
            }
        </nav>
    );
};
