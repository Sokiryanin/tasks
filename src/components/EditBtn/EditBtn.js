import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function BasicPopover({
  onDeleteCard,
  onDeleteList,
  taskId,
  listId,
  contentType,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderContent = () => {
    if (contentType === 'card') {
      return (
        <>
          <button>edit</button>
          <button onClick={() => onDeleteCard(taskId)}>delete</button>
        </>
      );
    } else if (contentType === 'list') {
      return (
        <>
          <button>edit</button>
          <button>add new card</button>
          <button onClick={() => onDeleteList(listId)}>delete all</button>
        </>
      );
    }

    return null;
  };

  return (
    <div>
      <button aria-describedby={id} variant="contained" onClick={handleClick}>
        ...
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{renderContent()}</Typography>
      </Popover>
    </div>
  );
}

// import * as React from 'react';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// // import Button from '@mui/material/Button';

// export default function BasicPopover({ onDelete, taskId }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = event => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <div>
//       <button aria-describedby={id} variant="contained" onClick={handleClick}>
//         ...
//       </button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//       >
//         <Typography sx={{ p: 2 }}>
//           <div>
//             <button>edit</button>
//             <button>add new card</button>
//             <button
//               onClick={() => {
//                 onDelete(taskId);
//               }}
//             >
//               delete
//             </button>
//           </div>
//         </Typography>
//       </Popover>
//     </div>
//   );
// }
