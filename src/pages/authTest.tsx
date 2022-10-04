
import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthTest:NextPage = () => {
    const {data: session, status} = useSession();
    console.log(session);
    if (status === 'loading')
        return <h1>Loading...</h1>;

    return (
        <div>
            {session ? 
                (
                    <div>
                        <button onClick={() => signOut()} >Logout</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => signIn("discord")} >Log in</button>
                    </div>
                )
            }
        </div>
    );
};

export default AuthTest;