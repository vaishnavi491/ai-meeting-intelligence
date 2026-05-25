import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-meeting-intelligence-ng81.onrender.com/api",
});

export default API;