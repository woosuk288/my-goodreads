import { Roboto, Noto_Sans_KR } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// export const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

export const notoSansKr = Noto_Sans_KR({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#F4F1EA',
    },
    secondary: {
      main: '#382110',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: notoSansKr.style.fontFamily,
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#382110',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#382110',
        }
      }
    }
  }
});

export default theme;
