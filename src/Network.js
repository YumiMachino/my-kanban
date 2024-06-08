export const BASE_URL = 'https://api.trello.com/1/'
export const ENDPOINT = 'https://api.trello.com/1/boards/';

export const BOARD_ID = process.env.REACT_APP_BOARD_ID;
export const KEY = process.env.REACT_APP_API_KEY;
export const TOKEN = process.env.REACT_APP_TOKEN;

export const FETCH_ALL_LIST_URL = `${BASE_URL}boards/${BOARD_ID}/lists?key=${KEY}&token=${TOKEN}`;


