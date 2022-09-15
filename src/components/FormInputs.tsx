import { inferQueryOutput } from "../utils/trpc";

type FormOutput = inferQueryOutput<'forms.getAll'>[0]

export const FormInputs: React.FC<{
    form: FormOutput
}> = ({form}) => {
    return (
        <>
            <form key={form.id}>
                <h2 className="mt-6 mb-2 text-3xl">{form.name}</h2>
                {form.description && <h3 className="text-xl text-gray-600">{form.description}</h3>}
                {form.inputs.map(input => {
                return (
                    <p
                        key={input.id}
                        className="mt-2"
                    >
                        <label className="mr-3 text-2xl capitalize">{input.name}</label>
                        <input
                            className="bg-transparent border rounded-md border-slate-100"
                            type={input.type}
                        />
                    </p>
                );
              })}
            </form>
        </>
    );
};