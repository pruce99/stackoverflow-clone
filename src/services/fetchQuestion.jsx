const ENDPOINT = 'http://localhost:3005/questions';

const fetchQuestion = () => fetch(ENDPOINT).then(res => res.json());

export { fetchQuestion };
