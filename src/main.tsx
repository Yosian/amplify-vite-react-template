import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from '@aws-amplify/ui-react';
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

const components = {
  Header() {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <img src="/logo.png" alt="Tres.AI logo" style={{ height: '50px' }} />
        <h1>Tres.AI</h1>
      </div>
    );
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render( 
  <React.StrictMode>
    <Authenticator components={components}>
      {({ signOut, user }) => (
        <App signOut={signOut} user={user} />
      )}
    </Authenticator>
  </React.StrictMode>
);