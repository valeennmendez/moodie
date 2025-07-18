export const getGenreId = (genres) => {
  const genreMap = {
    Acción: 28,
    Aventura: 12,
    Animación: 16,
    Comedia: 35,
    Crimen: 80,
    Documental: 99,
    Drama: 18,
    Familia: 10751,
    Fantasía: 14,
    Historia: 36,
    Terror: 27,
    Música: 10402,
    Misterio: 9648,
    Romance: 10749,
    "Ciencia ficción": 878,
    "Película de TV": 10770,
    Thriller: 53,
    Bélica: 10752,
    Western: 37,
  };

  const genreIds = genres.map((g) => genreMap[g]).filter(Boolean);

  if (genreIds.length === 0) {
    return [];
  }

  return genreIds;
};

export const getGenreNames = (ids) => {
  const genreMap = {
    28: "Acción",
    12: "Aventura",
    16: "Animación",
    35: "Comedia",
    80: "Crimen",
    99: "Documental",
    18: "Drama",
    10751: "Familia",
    14: "Fantasía",
    36: "Historia",
    27: "Terror",
    10402: "Música",
    9648: "Misterio",
    10749: "Romance",
    878: "Ciencia ficción",
    10770: "Película de TV",
    53: "Thriller",
    10752: "Bélica",
    37: "Western",
  };

  const names = ids.map((id) => genreMap[id]).filter(Boolean);
  return names;
};
