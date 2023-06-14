import React, { useState, useEffect } from 'react';
import 누빔옷이미지 from '../../assets/outfitImage/top/누빔 옷.png';
import 가죽옷이미지 from '../../assets/outfitImage/top/가죽 옷.png';
import 니트이미지 from '../../assets/outfitImage/top/니트.png';
import 맨투맨이미지 from '../../assets/outfitImage/top/맨투맨.png';
import 후드이미지 from '../../assets/outfitImage/top/후드티.png';
import 티셔츠이미지 from '../../assets/outfitImage/top/티셔츠.png';
import 블라우스이미지 from '../../assets/outfitImage/top/블라우스.png';
import 셔츠이미지 from '../../assets/outfitImage/top/셔츠.png';
import 민소매이미지 from '../../assets/outfitImage/top/민소매.png';
import 반팔티이미지 from '../../assets/outfitImage/top/반팔티.png';

function Top({ attire }) {
  const [top1, setTop1] = useState(null);
  const [top2, setTop2] = useState(null);
  const [top3, setTop3] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images = {
    '누빔 옷': 누빔옷이미지,
    '가죽 옷': 가죽옷이미지,
    니트: 니트이미지,
    맨투맨: 맨투맨이미지,
    후드: 후드이미지,
    티셔츠: 티셔츠이미지,
    블라우스: 블라우스이미지,
    셔츠: 셔츠이미지,
    민소매: 민소매이미지,
    반팔티: 반팔티이미지,
  };

  useEffect(() => {
    attire.top.forEach((item, index) => {
      if (index === 0) {
        if (images[item]) {
          setTop1(item);
        }
      } else if (index === 1) {
        if (images[item]) {
          setTop2(item);
        }
      } else if (index === 2) {
        if (images[item]) {
          setTop3(item);
        }
      }
    });
  }, [attire.top, images]);

  return (
    <div>
      {top1 && <img src={images[top1]} alt={top1} />}
      {top2 && <img src={images[top2]} alt={top2} />}
      {top3 && <img src={images[top3]} alt={top3} />}
    </div>
  );
}

export default Top;
