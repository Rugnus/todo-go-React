import { Box, List, ListItem } from "@mantine/core";
import useSWR from "swr";
import AddTodo from "./components/AddTodo";
import { ENDPOINT } from "./constants";

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

const fetcher = (url: string) => {
  return fetch(`${ENDPOINT}/${url}`)
    .then((r) => r.json())
    .catch((err) => console.error("Failed to fetch ", err));
};

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  return (
    <Box
      sx={(theme) => ({
        padding: "2rem",
        width: "100%",
        maxWidth: "40rem",
        margin: "0 auto",
      })}
    >
      {JSON.stringify(data)}
      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => {
          return <ListItem key={`todo__${todo.id}`}>{todo.title}</ListItem>;
        })}
      </List>
      <AddTodo mutate={mutate} />
    </Box>
  );
}

export default App;
