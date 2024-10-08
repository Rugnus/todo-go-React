import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { Todo } from "../App";
import { ENDPOINT } from "../constants";

export default function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  async function createTodo(values: { title: string; body: string }) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(updated);

    form.reset();

    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create ToDo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label={"Todo"}
            placeholder="What do you want to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label={"Body"}
            placeholder="Tell me more"
            {...form.getInputProps("body")}
          />

          <Button type="submit">Create todo</Button>
        </form>
      </Modal>

      <Group>
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          Add Todo
        </Button>
      </Group>
    </>
  );
}
