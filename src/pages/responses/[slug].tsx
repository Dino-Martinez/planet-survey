import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { nanoid } from "nanoid";

const Responses: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const {data: responses, isLoading} = trpc.useQuery(["forms.getResponsesBySlug", slug]);
    if (!slug)
        return <h1>This form does not exist!</h1>;

    return (
        <>
            {responses && !isLoading &&
                <div className="flex flex-col gap-4">
                    {responses.map(response => {
                        return (
                            <div key={nanoid()} >
                                <h1>{response.name}</h1>
                                <p>{response.value}</p>
                            </div>
                        );
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