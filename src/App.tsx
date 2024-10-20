import { useEffect, useState } from "react";
import { withAuthenticator, useAuthenticator, AmplifySignOut, Authenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
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

      <h1>Type Something Here</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}</ul>
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
  );
}

const CustomSignInHeader = () => (
  <div>
    <h1 style={{ textAlign: "center" }}>Tres.AI</h1>
    <p style={{ textAlign: "center" }}>Welcome to Tres.AI</p>
  </div>
);

const CustomSignInFooter = () => (
  <div style={{ textAlign: "right", padding: "10px" }}>
    <img src="/logo.png" alt="Logo" style={{ width: "50px", height: "50px" }} />
  </div>
);

function CustomAuthenticator() {
  return (
    <Authenticator
      loginMechanisms={['username']}
      components={{
        Header: CustomSignInHeader,
        Footer: CustomSignInFooter
      }}
    >
      <App />
    </Authenticator>
  );
}

export default CustomAuthenticator;
