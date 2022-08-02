import { Dialog } from '@mui/material';

import React from 'react';

function DialogComponent({ openState, handleDialogClose, content }) {
  return (
    <Dialog open={openState} onClose={handleDialogClose}>
      {content}
    </Dialog>
  );
}

export default DialogComponent;
