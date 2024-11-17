import * as React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps, createTheme } from '@mui/material';

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsSizeOverrides {
    xsmall: true;
  }
}

declare module '@mui/material/ButtonBase' {
  interface ButtonBaseOwnProps {
    state?: unknown;
  }
}

const LinkComponent = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...rest } = props;
  return <RouterLink ref={ref} to={href} {...rest} />;
});

export const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1d21',
      paper: '#1c1f23',
    },
    primary: {
      main: '#907030',
      light: 'hsl(186, 35%, 70%)',
      dark: '#967442',
    },
    secondary: {
      main: '#F36633',
    },
    error: {
      main: '#ba190d',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body, #root {
          height: 100%;
        }

        .calendar-event {
          transition: border-color 200ms;
          border-width: 2px;
        }
      `,
    },
    MuiLink: {
      defaultProps: {
        component: LinkComponent,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: '24px',
        },
      },
    },
    MuiSvgIcon: {
      variants: [
        {
          props: { fontSize: 'xsmall' },
          style: {
            fontSize: '1rem',
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid',
            borderColor: theme.palette.primary.main,
          },
          ' & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid',
            borderColor: theme.palette.primary.main,
          },
          ' & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none',
          },
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
        },
      },
    },
  },
});
