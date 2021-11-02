import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      alternate: {
        main: '#1a2138',
        dark: '#9598F0',
      },
      cardShadow: 'rgba(0, 0, 0, .11)',
      common: {
        black: '#000',
        white: '#fff',
      },
      mode: 'dark',
      primary: {
        main: '#9598F0',
        light: '#8FA6E9',
        dark: '#898dfa',
        contrastText: '#fff',
      },
      secondary: {
        main: '#DBFDFF',
        light: '#c8b5f5',
        dark: '#ae99e0',
        contrastText: '#FFFFFF',
      },
      default: { main: '#404040' },
      text: {
        primary: '#EEEEEF',
        secondary: '#AEB0B4',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
      background: {
        paper: '#8FA6E9',
        default: '#404040',
        level2: '#333',
        level1: '#2D3748',
      },
    },
    layout: {
      contentWidth: 1236,
    },
    typography: {
      h1: {
        fontFamily: "'Exo', sans-serif",
      },
      h2: {
        fontFamily: "'Exo', sans-serif",
      },
      h3: {
        fontFamily: "'Exo', sans-serif",
      },
      h4: {
        fontFamily: "'Exo', sans-serif",
      },
      h5: {
        fontFamily: "'Exo', sans-serif",
      },
      fontFamily: "'Exo', sans-serif",
      button: {
        textTransform: 'none',
        fontWeight: 'medium',
      },
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          label: {
            fontWeight: 600,
          },
          containedSecondary: {},
        },
      },
    },
    shape: {
      borderRadius: 20,
    },
  }),
);

export default theme;
