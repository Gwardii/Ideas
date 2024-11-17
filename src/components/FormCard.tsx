import {
  Box,
  BoxProps,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  TypographyProps,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import React from 'react';

export const FormCard = (props: BoxProps) => {
  return <Box component={Paper} p="32px" display="flex" flexDirection="column" {...props} />;
};

type FormCardTitleProps = TypographyProps & {
  tooltip?: React.ReactNode;
};
export const FormCardTitle = ({ tooltip, ...props }: FormCardTitleProps) => {
  return (
    <Box display="flex" alignItems="baseline">
      <Typography
        component="h2"
        fontSize="24px"
        fontWeight={700}
        color="#544f40"
        mb="16px"
        {...props}
      />
      {tooltip ? (
        <Tooltip title={tooltip}>
          <IconButton aria-label="show details" size="small" sx={{ ml: '4px' }}>
            <InfoOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
};
