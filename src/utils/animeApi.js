export const handleServerResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(new Error(`Error: ${res.status}`));
};

const BASE_URL = 'https://api.jikan.moe/v4';

export const searchAnime = ({ q, limit = 24, page = 1 } = {}) => {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  params.set('limit', String(limit));
  params.set('page', String(page));

  return fetch(`${BASE_URL}/anime?${params.toString()}`).then(
    handleServerResponse,
  );
};
