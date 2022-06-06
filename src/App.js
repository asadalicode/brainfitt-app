import './App.scss';
import React from 'react';
import AppRouting from './appRouting';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/theme.scss';

function App() {
  return (
    <React.StrictMode>
      <AppRouting />
    </React.StrictMode>
  );
}

export default App;
