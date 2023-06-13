import React, { useState, useEffect } from 'react';
import 부츠이미지 from '../../assets/outfitImage/shoes/부츠.png';
import 운동화이미지 from '../../assets/outfitImage/shoes/운동화.png';
import 구두이미지 from '../../assets/outfitImage/shoes/구두.png';
import 샌들이미지 from '../../assets/outfitImage/shoes/샌들.png';

function Shoes({ attire }) {
  const [shoes1, setShoes1] = useState(null);
  const [shoes2, setShoes2] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images = {
    부츠: 부츠이미지,
    운동화: 운동화이미지,
    구두: 구두이미지,
    샌들: 샌들이미지,
  };

  useEffect(() => {
    attire.shoes.forEach((item, index) => {
      if (index === 0) {
        if (images[item]) {
          setShoes1(item);
        }
      } else if (index === 1) {
        if (images[item]) {
          setShoes2(item);
        }
      }
    });
  }, [attire.shoes, images]);

  return (
    <div>
      {shoes1 && <img src={images[shoes1]} alt={shoes1} />}
      {shoes2 && <img src={images[shoes2]} alt={shoes2} />}
    </div>
  );
}

export default Shoes;
