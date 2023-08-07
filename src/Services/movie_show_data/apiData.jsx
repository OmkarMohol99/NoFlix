import axios from 'axios';
import {EnvConstants} from '../../constants';

const Token = EnvConstants.TOKEN;

export const getTrendingTvAllDayData = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/tv/day',
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMediaDetailsById = async (showId, type) => {
  console.log(`https://api.themoviedb.org/3/${type}/${showId}`);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${showId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingMoviesAllDayData = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day',
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingPeoples = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/person/day',
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMediaVideosData = async (type, id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchedData = async query => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMediaCastDetails = async (type, id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/credits`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCastDetailById = async id => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getMoviesAndTvShowsByCastId = async id => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/combined_credits`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
