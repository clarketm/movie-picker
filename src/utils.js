// CONSTANTS

import request from "./request";

export const PROFILES = {
    'Default': 'default',
    'Travis': 'travis',
    'Jade': 'jade',
    'Eric': 'eric',
    'Terri': 'terri'
};

export const GENRES = {
    'All': 'All',
    'Action & Adventure': 'Action &amp; Adventure',
    'Anime': 'Anime',
    'Children & Family Movies': 'Children &amp; Family Movies',
    'Classic Movies': 'Classic Movies',
    'Comedies': 'Comedies',
    'Documentaries': 'Documentaries',
    'Dramas': 'Dramas',
    'Faith and Spirituality': 'Faith and Spirituality',
    'Foreign Movies': 'Foreign Movies',
    'Gay & Lesbian Movies': 'Gay &amp; Lesbian Movies',
    'Horror Movies': 'Horror Movies',
    'Independent Movies': 'Independent Movies',
    'Oscar-winning Movies': 'Oscar-winning Movies',
    'Romantic Movies': 'Romantic Movies',
    'Sci-Fi & Fantasy': 'Sci-Fi &amp; Fantasy',
    'Sports Movies': 'Sports Movies',
    'Thrillers': 'Thrillers',
    'TV Shows': 'TV Shows'
};

export const RATINGS = ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0"];

export const API_URL = 'https://wt-ed59ec259186359bcf843a1acdd3d65e-0.run.webtask.io/movie-picker';


export const callApi = (postData) => {
    return request(API_URL, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        mode: 'cors',
        cache: 'default',
        body: postData

    })
        .then(response => {
            return response;
        })
        .catch(error => ({error: error.message}));
};