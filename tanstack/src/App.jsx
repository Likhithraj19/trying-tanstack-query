import { useQuery, useMutation } from "@tanstack/react-query";

export default function App() {

  const {data, error, isLoading} = useQuery({
    queryKey : ['todo'],
    // queryFn : () => fetch("https://jsonplaceholder.typicode.com/todos/").then((res) => res.json()),
    queryFn : () => fetch("https://jsonplaceholder.typicode.com/posts/").then((res) => res.json()),
  });

  const {mutate, isPending, isError, isSuccess} = useMutation({
    mutationFn : (newPost) => fetch("https://jsonplaceholder.typicode.com/posts/", {
      method : "POST",
      body : JSON.stringify(newPost),
      headers : {"Content-type" : "application/json; charset=UTF-8"},
    }).then((res) => res.json())
  })

  if(error || isError) return <div>There was an error!</div>

  if(isLoading) return <div> Data is loading... </div>

  return (
    <>
    <div>

    {isPending && <p>Data is being added</p> }

      <button
      onClick={() => mutate({
        userId : 6000,
        id : 4000,
        title : "Hello",
        body : "My name is Likhith",
      })}

      >Add post
      </button>
    </div>
    <div>
      {data?.map((todo, key) => (
        <div >
          {/* {console.log("res", todo)} */}
          <h4>ID: {todo?.id}</h4>
          <h4>Title: {todo?.title}</h4>
          <p>{todo.body}</p>
        </div>
      ))}
    </div>
    </>
  );
}