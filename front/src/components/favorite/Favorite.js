

import React, { useState, useEffect } from 'react';
import * as Api from '../../lib/apis/api';

function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const [favoriteDetails, setFavoriteDetails] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
        try {
            const response = await Api.get('/user/favorite');
            setFavorites(() => {
                const newFavorites = [...response.data];
                return newFavorites;
            }) ;
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
                const temperatureResponse = await Api.get('/ultraSrtNcst', { area: favorite });
                const uvResponse = await Api.get('/uvidx', { area: favorite });
                const outfitResponse = await Api.get('/outfit', { temp: temperatureResponse.data.Current.T1H });

                return {
                area: favorite,
                temperature: temperatureResponse.data.Current.T1H,
                uv: uvResponse.data.h0,
                outfit: outfitResponse.data.clothes[0],
                };
            })
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
        {favoriteDetails.map((detail, index) => (
            <div key={index}>
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