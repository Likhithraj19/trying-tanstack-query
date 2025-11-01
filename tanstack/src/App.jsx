import { useQuery } from "@tanstack/react-query";

export default function App() {

  const {data, error, isLoading} = useQuery({
    queryKey : ['todo'],
    queryFn : () => fetch("https://jsonplaceholder.typicode.com/todos/").then((res) => res.json(),
  )
  });

  if(error) return <div>There was an error!</div>

  if(isLoading) return <div> Data is loading... </div>

  return (
    <>
    <div>
      {data?.map((todo, key) => (
        <div>
          {/* {console.log("res", todo)} */}
          <h1>ID: {todo?.id}</h1>
          <h1>Title: {todo?.title}</h1>
        </div>
      ))}
    </div>
    </>
  );
}