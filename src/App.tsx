import React from 'react';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { AuthUser } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

interface AppProps {
  signOut?: () => void;
  user?: AuthUser;
}

const App: React.FC<AppProps> = ({ signOut, user }) => {
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
        {user && <p>Welcome, {user.username}</p>}
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
      {signOut && <button onClick={signOut}>Sign out</button>}
      <img src="/logo.png" alt="Logo" className="corner-logo" />
    </main>
  );
}

export default App;