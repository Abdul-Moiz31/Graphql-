import "./App.css";
import { useQuery, gql } from "@apollo/client";
var require = createRequire(import.meta.url);
var module = { exports: {} };

const query = gql `
query GetTodosWithUser {
  getTodos {
    id
    title
    completed
    user {
      name
    }
  }
}
`;


function App() {
  const {data , loading} =useQuery(query);
  if(loading) return <h1> Loading............</h1>
  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;