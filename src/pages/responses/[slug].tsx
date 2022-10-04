import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { nanoid } from "nanoid";
import Image from "next/image";

const Responses: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const {data: formResponses, isLoading} = trpc.useQuery(["forms.getResponsesBySlug", slug]);
    if (!slug)
        return <h1>This form does not exist!</h1>;
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