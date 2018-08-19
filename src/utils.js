// CONSTANTS

import request from "./request";

export const PROFILES = {
  Default: "default",
  Travis: "travis",
  Jade: "jade",
  Eric: "eric",
  Terri: "terri"
};

export const GENRES = [
  {
    id: -1,
    name: "All Genres",
    slug: "all"
  },
  {
    id: 5,
    name: "Action & Adventure",
    content_kind: "both",
    slug: "action-and-adventure",
    hidden: false
  },
  {
    id: 6,
    name: "Animation",
    content_kind: "both",
    slug: "animation",
    hidden: false
  },
  {
    id: 39,
    name: "Anime",
    content_kind: "both",
    slug: "anime",
    hidden: false
  },
  {
    id: 7,
    name: "Biography",
    content_kind: "movie",
    slug: "biography",
    hidden: false
  },
  {
    id: 8,
    name: "Children",
    content_kind: "both",
    slug: "children",
    hidden: false
  },
  {
    id: 10,
    name: "Crime",
    content_kind: "both",
    slug: "crime",
    hidden: false
  },
  {
    id: 41,
    name: "Cult",
    content_kind: "movie",
    slug: "cult",
    hidden: false
  },
  {
    id: 9,
    name: "Comedy",
    content_kind: "both",
    slug: "comedy",
    hidden: false
  },
  {
    id: 11,
    name: "Documentary",
    content_kind: "both",
    slug: "documentary",
    hidden: false
  },
  {
    id: 3,
    name: "Drama",
    content_kind: "both",
    slug: "drama",
    hidden: false
  },
  {
    id: 12,
    name: "Family",
    content_kind: "both",
    slug: "family",
    hidden: false
  },
  {
    id: 13,
    name: "Fantasy",
    content_kind: "both",
    slug: "fantasy",
    hidden: false
  },
  {
    id: 15,
    name: "Food",
    content_kind: "show",
    slug: "food",
    hidden: false
  },
  {
    id: 16,
    name: "Game Show",
    content_kind: "show",
    slug: "game-show",
    hidden: false
  },
  {
    id: 17,
    name: "History",
    content_kind: "both",
    slug: "history",
    hidden: false
  },
  {
    id: 18,
    name: "Home & Garden",
    content_kind: "show",
    slug: "home-and-garden",
    hidden: false
  },
  {
    id: 19,
    name: "Horror",
    content_kind: "both",
    slug: "horror",
    hidden: false
  },
  {
    id: 43,
    name: "Independent",
    content_kind: "movie",
    slug: "independent",
    hidden: false
  },
  {
    id: 37,
    name: "LGBTQ",
    content_kind: "both",
    slug: "lgbtq",
    hidden: false
  },
  {
    id: 22,
    name: "Musical",
    content_kind: "movie",
    slug: "musical",
    hidden: false
  },
  {
    id: 23,
    name: "Mystery",
    content_kind: "both",
    slug: "mystery",
    hidden: false
  },
  {
    id: 25,
    name: "Reality",
    content_kind: "show",
    slug: "reality",
    hidden: false
  },
  {
    id: 4,
    name: "Romance",
    content_kind: "movie",
    slug: "romance",
    hidden: false
  },
  {
    id: 26,
    name: "Science-Fiction",
    content_kind: "both",
    slug: "science-fiction",
    hidden: false
  },
  {
    id: 29,
    name: "Sport",
    content_kind: "both",
    slug: "sport",
    hidden: false
  },
  {
    id: 45,
    name: "Stand-up & Talk",
    content_kind: "both",
    slug: "stand-up-and-talk",
    hidden: false
  },
  {
    id: 32,
    name: "Thriller",
    content_kind: "movie",
    slug: "thriller",
    hidden: false
  },
  {
    id: 33,
    name: "Travel",
    content_kind: "show",
    slug: "travel",
    hidden: false
  }
];

export const IMDB = [
  {
    id: 9,
    name: "> 9"
  },
  {
    id: 8,
    name: "> 8"
  },
  {
    id: 7,
    name: "> 7"
  },
  {
    id: 6,
    name: "> 6"
  },
  {
    id: 5,
    name: "> 5"
  },
  {
    id: -1,
    name: "Any Score"
  }
];

export const RT = [
  {
    id: 90,
    name: "> 90%"
  },
  {
    id: 80,
    name: "> 80%"
  },
  {
    id: 70,
    name: "> 70%"
  },
  {
    id: 60,
    name: "> 60%"
  },
  {
    id: 50,
    name: "> 50%"
  },
  {
    id: -1,
    name: "Any Score"
  }
];

export const API_URL =
  "https://wt-ed59ec259186359bcf843a1acdd3d65e-0.run.webtask.io/movie-picker";

export const callApi = postData => {
  return request(API_URL, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    }),
    mode: "cors",
    cache: "default",
    body: postData
  })
    .then(response => {
      return response;
    })
    .catch(error => ({ error: error.message }));
};
