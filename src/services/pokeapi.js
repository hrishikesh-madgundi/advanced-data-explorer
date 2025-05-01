import axios from 'axios';
const BASE = 'https://pokeapi.co/api/v2';

export const listPokemons = async (offset = 0, limit = 10) => {
  const res = await axios.get(`${BASE}/pokemon?offset=${offset}&limit=${limit}`);
  return res.data;
};

export const getPokemon = async (id) => {
  const res = await axios.get(`${BASE}/pokemon/${id}`);
  return res.data;
};

export const getEvolutionChain = async (url) => {
  const res = await axios.get(url);
  return res.data;
};