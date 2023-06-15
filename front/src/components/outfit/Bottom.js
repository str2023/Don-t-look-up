/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 기모바지이미지 from '../../assets/outfitImage/bottom/기모바지.png';
import 면바지이미지 from '../../assets/outfitImage/bottom/면바지.png';
import 슬랙스이미지 from '../../assets/outfitImage/bottom/슬랙스.png';
import 반바지이미지 from '../../assets/outfitImage/bottom/반바지.png';
import 치마이미지 from '../../assets/outfitImage/bottom/치마.png';

function Bottom({ attire }) {
  const [bottom1, setBottom1] = useState(null);
  const [bottom2, setBottom2] = useState(null);

  const images = React.useMemo(
    () => ({
      '기모 바지': 기모바지이미지,
      면바지: 면바지이미지,
      슬랙스: 슬랙스이미지,
      반바지: 반바지이미지,
      치마: 치마이미지,
    }),
    [],
  );

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
        <StyledDiv>BOTTOM</StyledDiv>
        <Slider {...settings}>
          {bottom1 && (
            <div>
              <img src={images[bottom1]} alt={bottom1} style={{ width: '520px', margin: 'auto' }} />
            </div>
          )}
          {bottom2 && (
            <div>
              <img src={images[bottom2]} alt={bottom2} style={{ width: '520px', margin: 'auto' }} />
            </div>
          )}
        </Slider>
      </SlideWrapper>
    </div>
  );
}

export default Bottom;

const SlideWrapper = styled.div`
  width: 520px;
  display: inline-block;
  padding: 0 0 40px 0;
  margin: 0 0 3.2vh 0;
`;

const StyledDiv = styled.div`
  width: 16vh;
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
