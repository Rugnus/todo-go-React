import { Box } from "@mantine/core";
import useSWR from "swr";
import { ENDPOINT } from "./constants";

const fetcher = (url: string) => {
  fetch(`${ENDPOINT}/${url}`)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.error("Failed to fetch ", err));
};

function App() {
  const { data, mutate } = useSWR("api/todos", fetcher);

  console.log(data);

  return <Box>{JSON.stringify(data)}</Box>;
}

export default App;
