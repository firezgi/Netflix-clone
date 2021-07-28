import axios from "axios";
const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
})
//e.g---- instance.get("/movie/top_rated")
// // api.themoviedb.org/3/movie/top_rated
export default instance;