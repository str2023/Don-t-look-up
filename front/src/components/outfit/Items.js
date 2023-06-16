/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 자외선크림이미지 from '../../assets/outfitImage/item/자외선크림.png';
import 우산이미지 from '../../assets/outfitImage/item/우산.png';
import 양산이미지 from '../../assets/outfitImage/item/양산.png';
import 장화이미지 from '../../assets/outfitImage/item/장화.png';
import 장갑이미지 from '../../assets/outfitImage/item/장갑.png';
import 핫팩이미지 from '../../assets/outfitImage/item/핫팩.png';

function Items({ item }) {
  const [item1, setItem1] = useState(null);
  const [item2, setItem2] = useState(null);

  const images = {
    선크림: 자외선크림이미지,
    우산: 우산이미지,
    양산: 양산이미지,
    장화: 장화이미지,
    장갑: 장갑이미지,
    핫팩: 핫팩이미지,
  };

  useEffect(() => {
    item.forEach((element, index) => {
      if (index === 0) {
        if (images[element]) {
          setItem1(element);
        }
      } else if (index === 1) {
        if (images[element]) {
          setItem2(element);
        }
      }
    });
  }, [item, images]);

  const settings = {
    arrows: true,
    dots: true, // 슬라이드 밑에 점 보이게
    infinite: true, // 무한으로 반복
    speed: 500,
    autoplay: false,
    autoplaySpeed: 1500, // 넘어가는 속도
    slidesToShow: 1,
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    centerMode: false,
    centerPadding: '0px', // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    variableWidth: true,
  };

  return (
    <div>
      <SlideWrapper>
        <Slider {...settings}>
          {item1 && (
            <div>
              <img src={images[item1]} alt={item1} style={{ width: '560px' }} />
            </div>
          )}
          {item2 && (
            <div>
              <img src={images[item2]} alt={item2} style={{ width: '560px' }} />
            </div>
          )}
        </Slider>
      </SlideWrapper>
    </div>
  );
}

export default Items;

const SlideWrapper = styled.div`
  width: 560px;
`;
