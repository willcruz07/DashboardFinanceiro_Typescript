import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from './hooks/theme';
import { AuthProvider } from './hooks/auth';

import App from './App';

/*
  * Adicionado o ThemeProvider no Index pois só é possível recuperar todas as informações de um contexto
  "Context" quando temos o ThemeProvider na hierarquia, tudo que estiver dentro do app vai poder acessar.
*/

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
