import { useEffect, useState } from "react";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <header>
        <h1>TresAI under construction</h1>
      </header>

      <h1>My Type Something Here</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <AmplifySignOut />
      <img src="/logo.png" alt="Logo" className="corner-logo" />
    </main>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    header: 'Tres.AI',
  },
  components: {
    SignIn: {
      Header: () => <h1 className="login-header">Tres.AI</h1>
    },
  },
});
