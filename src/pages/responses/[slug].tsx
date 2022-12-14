import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Login from "../login";

const Responses: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const {data: formResponses, isLoading, error} = trpc.useQuery(["auth.getResponsesBySlug", slug]);
    const {status} = useSession();

    if (status === 'loading')
        return <h1>Loading...</h1>;

    if (status === 'unauthenticated')
        return <Login />;
    
    if (!slug)
        return <h1>This form does not exist!</h1>;

    if (error)
    {
        console.error(error);
        router.push('/');
    }

    return (
        <>
            {formResponses && !isLoading &&
                <div className="flex flex-col gap-4">
                    {formResponses.map(formResponse => {
                        return formResponse.responses.map(response => {
                        return (
                            <div key={nanoid()} >
                                <Image
                                    alt="profile picture"
                                    src={formResponse.author.image ?? "/profile-picture.png"}
                                    width={64}
                                    height={64}
                                />
                                <h1>{response.name}</h1>
                                <p>{response.value}</p>
                            </div>
                        );
                        });
                    })}
                </div>
            }
            {isLoading &&
                <h1>Loading...</h1>
            }
        </>
    );
};

export default Responses;