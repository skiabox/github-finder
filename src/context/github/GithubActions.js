import axios from 'axios';
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` }
});

//This file is responsible for the communication with the github api

// Get search results function
export const searchUsers = async text => {
  //get the params from (https://api.github.com/search/users?q=brad)
  const params = new URLSearchParams({
    q: text
  });

  //from axios we get the response in json format already (we don't need to convert the response to json manually)
  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
};

// Get user and repos
export const getUserAndRepos = async login => {
  const [user, repos] = await Promise.all([github.get(`/users/${login}`), github.get(`/users/${login}/repos`)]);

  return { user: user.data, repos: repos.data };
};
