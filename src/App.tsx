import { useEffect, useState } from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
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
    <Authenticator
      components={{
        Header() {
          return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>Tres.AI</h1>
            </div>
          );
        },
        Footer() {
          return (
            <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
              <img src="/logo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
            </div>
          );
        },
      }}
    >
      {({ signOut }) => (
        <main>
          <header>
            <h1>TresAI under construction</h1>
          </header>

          <h1>Type Something Here</h1>
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
          <button onClick={signOut}>Sign out</button>
          <img src="/logo.png" alt="Logo" className="corner-logo" />
        </main>
      )}
    </Authenticator>
  );
}

export default App;