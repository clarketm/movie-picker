// CONSTANTS

import request from "./request";

export const PROFILES = {
  Default: "default",
  Travis: "travis",
  Jade: "jade",
  Eric: "eric",
  Terri: "terri",
  Gayla: "gayla"
};

export const GENRES = {
  0: { id: 0, name: "All Genres", slug: "all" },
  5: { id: 5, name: "Action & Adventure", content_kind: "both", slug: "action-and-adventure" },
  6: { id: 6, name: "Animation", content_kind: "both", slug: "animation" },
  39: { id: 39, name: "Anime", content_kind: "both", slug: "anime" },
  7: { id: 7, name: "Biography", content_kind: "movie", slug: "biography" },
  8: { id: 8, name: "Children", content_kind: "both", slug: "children" },
  10: { id: 10, name: "Crime", content_kind: "both", slug: "crime" },
  41: { id: 41, name: "Cult", content_kind: "movie", slug: "cult" },
  9: { id: 9, name: "Comedy", content_kind: "both", slug: "comedy" },
  11: { id: 11, name: "Documentary", content_kind: "both", slug: "documentary" },
  3: { id: 3, name: "Drama", content_kind: "both", slug: "drama" },
  12: { id: 12, name: "Family", content_kind: "both", slug: "family" },
  13: { id: 13, name: "Fantasy", content_kind: "both", slug: "fantasy" },
  15: { id: 15, name: "Food", content_kind: "show", slug: "food" },
  16: { id: 16, name: "Game Show", content_kind: "show", slug: "game-show" },
  17: { id: 17, name: "History", content_kind: "both", slug: "history" },
  18: { id: 18, name: "Home & Garden", content_kind: "show", slug: "home-and-garden" },
  19: { id: 19, name: "Horror", content_kind: "both", slug: "horror" },
  43: { id: 43, name: "Independent", content_kind: "movie", slug: "independent" },
  37: { id: 37, name: "LGBTQ", content_kind: "both", slug: "lgbtq" },
  22: { id: 22, name: "Musical", content_kind: "movie", slug: "musical" },
  23: { id: 23, name: "Mystery", content_kind: "both", slug: "mystery" },
  25: { id: 25, name: "Reality", content_kind: "show", slug: "reality" },
  4: { id: 4, name: "Romance", content_kind: "movie", slug: "romance" },
  26: { id: 26, name: "Science-Fiction", content_kind: "both", slug: "science-fiction" },
  29: { id: 29, name: "Sport", content_kind: "both", slug: "sport" },
  45: { id: 45, name: "Stand-up & Talk", content_kind: "both", slug: "stand-up-and-talk" },
  32: { id: 32, name: "Thriller", content_kind: "movie", slug: "thriller" },
  33: { id: 33, name: "Travel", content_kind: "show", slug: "travel" }
};

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
    id: 0,
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
    id: 0,
    name: "Any Score"
  }
];

const REQUEST_DEFAULTS = {
  mode: "cors",
  cache: "default"
};

export const API_URL = "https://wt-ed59ec259186359bcf843a1acdd3d65e-0.run.webtask.io/movie-picker";

export const callApi = jsonData => {
  return request(API_URL, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    ...REQUEST_DEFAULTS,
    body: JSON.stringify(jsonData)
  })
    .then(response => {
      return response;
    })
    .catch(error => ({ error: error.message }));
};

// export const RT_API_URL = "https://www.rottentomatoes.com/api/private/v2.0/search";

// export const callRTApi = query => {
//   let url = new URL(RT_API_URL);
//   url.searchParams.append("limit", 1);
//   url.searchParams.append("q", query);
//
//   return request(url.toString(), {
//     method: "GET",
//     ...REQUEST_DEFAULTS
//   })
//     .then(response => {
//       return response;
//     })
//     .catch(error => ({ error: error.message }));
// };

export const RT_API_URL = "https://www.rottentomatoes.com/search/";

export const createRTUrl = query => {
  let url = new URL(RT_API_URL);
  url.searchParams.append("search", query);
  return url.toString();
};

export const IMDB_API_URL = "https://www.imdb.com/find";

export const createIMDBUrl = query => {
  let url = new URL(IMDB_API_URL);
  url.searchParams.append("ref_", "nv_sr_fn");
  url.searchParams.append("s", "all");
  url.searchParams.append("q", query);

  return url.toString();
};
