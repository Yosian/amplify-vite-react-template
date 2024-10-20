import { useEffect, useState } from "react";
import { Authenticator, useTheme, View, Image, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { tokens } = useTheme();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  const components = {
    Header() {
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Tres.AI logo"
            src="/logo.png"
            height="50px"
          />
          <Text
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            fontSize={tokens.fontSizes.xxxxl}
            fontWeight={tokens.fontWeights.bold}
          >
            Tres.AI
          </Text>
        </View>
      );
    },
  };

  return (
    <Authenticator components={components}>
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