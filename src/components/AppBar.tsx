import {
  Avatar,
  Box,
  ButtonBase,
  AppBar as MuiAppBar,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import image from 'public/logo.png'

dayjs.extend(relativeTime);

export const Logo = () => {
  return (
    <Box display="flex" flexDirection="column" component="img"
      src={image} sx={{
        width: 200,
        height: 50,
        borderRadius: '8px',
        boxShadow: 3,
      }}
    />
  );
};

const fontFamily = `"Segoe UI", Helvetica, Arial, sans-serif`;
type ProfileButtonProps = {
  name: string;
  photo: string | null;
};
const ProfileButton = (props: ProfileButtonProps) => {

  return (
    <>
      <ButtonBase
        sx={{
          color: 'hsl(188 5% 35% / 1)',
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          ml: 2,
          borderRadius: '101px',
          fontFamily: fontFamily,
          transition: 'background 1.2s ease-in-out',
          '&:hover': {
            background: 'hsl(188 10% 97% / 1)',
          },
        }}
      >
        <Avatar
          src={props.photo ?? ''}
          sx={{
            width: 37,
            height: 37,
          }}
        >
          {props.name.trim()?.[1]}
        </Avatar>
        <ArrowDropDownIcon />
      </ButtonBase>
    </>
  );
};

export const AppBar = () => {

  const data = { name: 'Filip', photo: '', }

  return (
    <MuiAppBar
      position="static"
      sx={{
        minHeight: '71px',
        // backgroundColor: '#fff',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        px: '33px',
      }}
    >
      <Box
        component={NavLink}
        sx={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
      >
        <Logo />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          ml: 'auto',
        }}
      >
        <ProfileButton name={data.name} photo={data.photo} />
      </Box>
    </MuiAppBar>
  );
};
