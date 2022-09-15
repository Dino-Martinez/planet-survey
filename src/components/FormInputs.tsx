import { inferQueryOutput } from "../utils/trpc";

type FormOutput = inferQueryOutput<'forms.getAll'>[0]

export const FormInputs: React.FC<{
    form: FormOutput
}> = ({form}) => {
    return (
        <>
            <form key={form.id}>
              <h2 className="text-3xl mt-6 mb-2">{form.name}</h2>
              {form.description && <h3 className="text-xl text-gray-600">{form.description}</h3>}
              {form.inputs.map(input => {
                return (
                  <p key={input.id} className="mt-2">
                    <label className="text-2xl capitalize mr-3">{input.name}</label>
                    <input className="border border-gray-500 rounded" type={input.type} />
                  </p>
                );
              })}
            </form>
        </>
    );
};