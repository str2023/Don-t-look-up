import React, { useState, useEffect } from 'react';
import 패딩이미지 from '../../assets/outfitImage/outer/패딩.png';
import 코트이미지 from '../../assets/outfitImage/outer/코트.png';
import 점퍼이미지 from '../../assets/outfitImage/outer/점퍼.png';
import 자켓이미지 from '../../assets/outfitImage/outer/자켓.png';
import 가디건이미지 from '../../assets/outfitImage/outer/가디건.png';

function Outer({ attire }) {
  const [outer1, setOuter1] = useState(null);
  const [outer2, setOuter2] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images = {
    패딩: 패딩이미지,
    코트: 코트이미지,
    점퍼: 점퍼이미지,
    자켓: 자켓이미지,
    가디건: 가디건이미지,
  };

  useEffect(() => {
    attire.outer.forEach((item, index) => {
      if (index === 0) {
        if (images[item]) {
          setOuter1(item);
        }
      } else if (index === 1) {
        if (images[item]) {
          setOuter2(item);
        }
      }
    });
  }, [attire.outer, images]);

  return (
    <div>
      {outer1 && <img src={images[outer1]} alt={outer1} />}
      {outer2 && <img src={images[outer2]} alt={outer2} />}
    </div>
  );
}

export default Outer;
