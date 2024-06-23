// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        height: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        backgroundColor: 'black',
        fontFamily: 'Manrope, system-ui, sans-serif', // Use the Manrope font
      },
      body: {
        lineHeight: '1.5',
      },
    },
  },
  fonts: {
    heading: 'Manrope, system-ui, sans-serif',
    body: 'Manrope, system-ui, sans-serif',
  },
});

export default theme;



