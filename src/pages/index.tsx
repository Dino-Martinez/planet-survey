import type { NextPage } from "next";
import { Form } from "../components/Form";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(["forms.getAll"]);
  return (
    <>
    <h1 className="text-5xl">Forms</h1>
      {data && !isLoading &&
        data.map(form => {
          return (
            <Form key={form.id} form={form} />
            );
        })
      }

      {isLoading &&
        <h1>Loading...</h1>
      }
    </>
  );
};

export default Home;

