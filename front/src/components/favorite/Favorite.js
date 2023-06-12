import React, { useState, useEffect } from 'react';
import * as Api from '../../lib/apis/api';

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [favoriteDetails, setFavoriteDetails] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteData = await Api.get('/user/favorite');
        setFavorites(() => {
          const newFavorites = [...favoriteData];
          return newFavorites;
        });
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchFavoriteDetails = async () => {
      try {
        const details = await Promise.all(
          favorites.map(async (favorite) => {
            const temperatureData = await Api.get('/ultraSrtNcst', { area: favorite });
            const uvData = await Api.get('/uvidx', { area: favorite });
            const outfitData = await Api.get('/outfit', { temp: temperatureData.Current.T1H });

            return {
              area: favorite,
              temperature: temperatureData.Current.T1H,
              uv: uvData.h0,
              outfit: outfitData.clothes[0],
            };
          }),
        );

        setFavoriteDetails(details);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteDetails();
    }
  }, [favorites]);

  return (
    <div>
      {favoriteDetails.map((detail) => (
        <div key={detail.area}>
          <h3>{detail.area}</h3>
          <p>기온: {detail.temperature}</p>
          <p>자외선 수치: {detail.uv}</p>
          {detail.outfit && (
            <>
              <p>상의: {detail.outfit.top.join(', ')}</p>
              <p>하의: {detail.outfit.bottom.join(', ')}</p>
              <p>신발: {detail.outfit.shoes.join(', ')}</p>
              <p>아우터: {detail.outfit.outer || 'None'}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Favorite;
