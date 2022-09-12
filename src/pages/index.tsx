import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";

/**
 * {name, description, inputs[]}
 */
type Input = {
  id: number,
  name: string,
  type: string
}
const Home: NextPage = () => {
  const [name, setName] = useState('');
  const [inputs, setInputs] = useState<Input[]>([]);
  const form = {name, inputs};
  const [lastId, setLastId] = useState(0);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  const addInput = () => {
    setInputs(prev=>([
      ...prev,
      {
        id: lastId,
        name: '',
        type: 'text'
      }
    ]));
    setLastId(lastId + 1);
    console.log(lastId);
  };

  const refreshInput = (id:number, name:string, type:string) => {
    setInputs(prev => ([
      ...prev.filter(input => input.id !== id),
      {
        id, name, type
      }
    ]).sort((a,b) => a.id - b.id));
  };

  const removeInput = (id:number) => {
    setInputs(prev => ([
      ...prev.filter(input => input.id !== id)
    ]));
  };

  useEffect(()=>{console.log(inputs);},[inputs]);

  return (
    <>
      <h1 className="text-5xl">Forms</h1>
      <label>Name your form:</label>
      <form onSubmit={handleSubmit}>
        <input className="border border-gray-500 rounded"  type="text" value={name} onChange={e => setName(e.target.value)}/>
        {inputs.map(input => <Input key={input.id} refresh={refreshInput} id={input.id} remove={removeInput}/>)}
        <button type="button" onClick={addInput}>Add an Input</button>
        <button type="submit">Create form</button>
      </form>
    </>
  );
};

export default Home;

