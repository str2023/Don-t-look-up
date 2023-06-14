import React, { useContext, useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Drawer, Button } from '@mui/material';
import { UserContext } from '../../contexts/context';

// 주소 검색 Drawer

function PostSearchDrawer() {
  const [search, setSearch] = useState(false);
  const { area, setArea } = useContext(UserContext);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSearch(open);
  };

  const Complete = (data) => {
    setSearch(false);
    setArea(data.jibunAddress);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)} color="inherit">
        검색
      </Button>
      <Drawer anchor="top" open={search} onClose={toggleDrawer(false)}>
        <div>
          <DaumPostcode onComplete={Complete} />
        </div>
      </Drawer>
    </div>
  );
}

export default PostSearchDrawer;
