import { axiosInstance } from "./util";

export const getBreeds = () => axiosInstance.get("dogs/breeds");

export const searchDogs = (currentPage, sortDirection, breedQueries) => axiosInstance
.get(`dogs/search?from=${encodeURIComponent((currentPage-1)*25)}&size=25&sort=breed:${sortDirection}${breedQueries}`)

export const fetchDogData = (dogIds) => axiosInstance.post("dogs", dogIds)

export const matchDog = (favoriteIds) => axiosInstance.post("/dogs/match", favoriteIds)
