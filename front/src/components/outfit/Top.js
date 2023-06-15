/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
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

  const images = React.useMemo(
    () => ({
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
    }),
    [],
  );

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
        <StyledDiv>TOP</StyledDiv>
        <Slider {...settings}>
          {top1 && (
            <div>
              <img src={images[top1]} alt={top1} style={{ width: '560px' }} />
            </div>
          )}
          {top2 && (
            <div>
              <img src={images[top2]} alt={top2} style={{ width: '560px' }} />
            </div>
          )}
          {top3 && (
            <div>
              <img src={images[top3]} alt={top3} style={{ width: '560px' }} />
            </div>
          )}
        </Slider>
      </SlideWrapper>
    </div>
  );
}

export default Top;

const SlideWrapper = styled.div`
  width: 560px;
  margin: 0 0 3.2vh 0;
  display: inline-block;
  justify-contents: center;
  align-items: center;
`;

const StyledDiv = styled.div`
  width: 12vh;
  height: flex;
  background-color: #efefef;
  border-radius: 20px;
  box-shadow: 0px 0px 16px #f4f4f4;
  font-family: 'GmarketSansMedium';
  font-size: 16pt;
  color: #606060;
  margin: 2vh auto;
  padding: 0.8vh 2vh;
`;
