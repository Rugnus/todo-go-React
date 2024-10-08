import { Box, List, ListItem, ThemeIcon } from "@mantine/core";
import { CheckCircleFillIcon, DiffRemovedIcon } from "@primer/octicons-react";
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

  async function markTodoAsDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());

    mutate(updated);
  }

  async function removeTodoById(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/delete`, {
      method: "DELETE",
    }).then((r) => r.json());

    mutate(updated);
  }

  return (
    <Box
      ml={"auto"}
      mr={"auto"}
      mt={"0"}
      mb={"0"}
      maw={"40rem"}
      w={"100%"}
      p={"2rem"}
    >
      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => {
          return (
            <ListItem
              key={`todo__${todo.id}`}
              onClick={() => markTodoAsDone(todo.id)}
              icon={
                todo.done ? (
                  <ThemeIcon color="teal" size={24} radius={"xl"}>
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color="grey" size={24} radius={"xl"}>
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                )
              }
            >
              {todo.title}
              <ThemeIcon
                color="teal"
                size={24}
                radius={"xl"}
                onClick={() => removeTodoById(todo.id)}
              >
                <DiffRemovedIcon size={20} />
              </ThemeIcon>
            </ListItem>
          );
        })}
      </List>
      <AddTodo mutate={mutate} />
    </Box>
  );
}

export default App;
