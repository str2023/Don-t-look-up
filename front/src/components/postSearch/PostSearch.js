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
    if (data.jibunAddress === '') {
      setArea({
        type: 'AREA_SELECT',
        payload: data.autoJibunAddress,
      });
    } else {
      setArea({
        type: 'AREA_SELECT',
        payload: data.jibunAddress,
      });
    }
    setSearch(false);
  };

  useEffect(() => {
    const selectedArea = sessionStorage.getItem('selectedArea');
    if (selectedArea) {
      console.log('%c sessionStorage에 area 있음.', 'color: #d93d1a;');
      setArea({
        type: 'AREA_SELECT',
        payload: selectedArea,
      });
    }
  }, [area, setArea]);

  return (
    <div>
      <Button onClick={toggleDrawer(true)} color="inherit">
        {area}
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
