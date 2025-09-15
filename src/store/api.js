import axios from 'axios';
// import store from './store'; // Adjust the path to your Redux store

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL:"https://shifaa-server-prod-bdad0c26366b.herokuapp.com/api", //'https://shifaa-server-e3be418bcb9d.herokuapp.com/api', // Replace with your API's base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});



export default axiosInstance;