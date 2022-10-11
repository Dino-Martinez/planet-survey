
import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { button } from "../styles/tw-components";
const Login:NextPage = () => {
    const {data: session, status} = useSession();
    if (status === 'loading')
        return <h1>Loading...</h1>;

    return (
        <div className="absolute inset-0 z-10 grid bg-black bg-opacity-50 place-items-center">
            <div className="flex flex-col items-center justify-center w-1/2 gap-6 bg-slate-900 h-1/2 rounded-xl">
                <h2 className="text-2xl font-semibold">You must be logged in to access this page.</h2>
                {session ? 
                    (
                        <div>
                            <button
                                className={button}
                                onClick={() => signOut()}
                            >Logout
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                className={button}
                                onClick={() => signIn("discord")}
                            >Log in with discord
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Login;