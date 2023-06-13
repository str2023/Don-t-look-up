import React, { useState, useEffect } from 'react';
import 기모바지이미지 from '../../assets/outfitImage/bottom/기모바지.png';
import 면바지이미지 from '../../assets/outfitImage/bottom/면바지.png';
import 슬랙스이미지 from '../../assets/outfitImage/bottom/슬랙스.png';
import 반바지이미지 from '../../assets/outfitImage/bottom/반바지.png';
import 치마이미지 from '../../assets/outfitImage/bottom/치마.png';

function Bottom({ attire }) {
  const [bottom1, setBottom1] = useState(null);
  const [bottom2, setBottom2] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images = {
    '기모 바지': 기모바지이미지,
    면바지: 면바지이미지,
    슬랙스: 슬랙스이미지,
    반바지: 반바지이미지,
    치마: 치마이미지,
  };

  useEffect(() => {
    attire.bottom.forEach((item, index) => {
      if (index === 0) {
        if (images[item]) {
          setBottom1(item);
        }
      } else if (index === 1) {
        if (images[item]) {
          setBottom2(item);
        }
      }
    });
  }, [attire.bottom, images]);

  return (
    <div>
      {bottom1 && <img src={images[bottom1]} alt={bottom1} />}
      {bottom2 && <img src={images[bottom2]} alt={bottom2} />}
    </div>
  );
}

export default Bottom;
