import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for createRoot
import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import App from './App';
import theme from './components/theme'; // Import the custom theme

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Use createRoot from react-dom/client

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

