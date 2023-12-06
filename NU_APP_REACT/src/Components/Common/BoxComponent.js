import * as React from 'react';
import Box from '@mui/material/Box';

const BoxComponent = (props) => {
  return (
    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
        {props.children}
    </Box>
  );
}


export default BoxComponent;