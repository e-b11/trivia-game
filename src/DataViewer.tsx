import { useEffect, useState } from "react";
import { fetchJsonUnknown } from "./api";
import { isTodo, type Todo } from "./todo";

type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

//Added a sleep function so that I can actually see if loading is working
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//render state based on different states
function renderState(state: AsyncState<Todo>) {
  switch (state.status) {
    case "idle":
      return <p>Click the button to load a Todo.</p>;

    case "loading":
      return <p>Loading...</p>;

    case "success":
      return (
        <div>
          <p>
            <strong>ID:</strong> {state.data.id}
          </p>
          <p>
            <strong>User ID:</strong> {state.data.userId}
          </p>
          <p>
            <strong>Title:</strong> {state.data.title}
          </p>
          <p>
            <strong>Completed:</strong> {state.data.completed ? "Yes" : "No"}
          </p>
        </div>
      );

    case "error":
      return (
        <div>
          <h3>Error</h3>
          <p>{state.message}</p>
        </div>
      );

    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}

const DataViewer = () => {
  //url in its own state so that it can be changed upon refetch and trigger the useEffect
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/todos/1",
  );

  const [state, setState] = useState<AsyncState<Todo>>({
    status: "idle",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadTodo(signal: AbortSignal): Promise<void> {
      setState({ status: "loading" });

      await sleep(5000);

      const result = await fetchJsonUnknown(url, signal);

      if (!result.ok) {
        const error = result.error;

        switch (error.type) {
          case "network":
            console.log(error.message);
            setState({ status: "error", message: "Network Failure" });
            return;

          case "http":
            setState({
              status: "error",
              message: `HTTP error: ${error.status} ${error.statusText}`,
            });
            return;

          case "parse":
            setState({ status: "error", message: "JSON parse failure" });
            return;

          default: {
            const _exhaustive: never = error;
            return _exhaustive;
          }
        }
      }

      const data = result.data;

      if (!isTodo(data)) {
        setState({
          status: "error",
          message: "Schema mismatch: Response was not a valid Todo",
        });
        return;
      }

      setState({ status: "success", data });
    }

    loadTodo(controller.signal);

    return () => {
      controller.abort();
    };
  }, [url]);

  //Refetch button goes and gets a different Todo
  return (
    <div>
      <h2>Todo</h2>
      {renderState(state)}
      <button
        onClick={() => setUrl("https://jsonplaceholder.typicode.com/todos/2")}
      >
        Refetch
      </button>
    </div>
  );
};

export default DataViewer;
