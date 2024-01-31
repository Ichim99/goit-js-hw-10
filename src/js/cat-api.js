import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_0IYWYMapIzjVKwcsTDwIymGUabDraTOV3NR3m09bgOTv4c6HSlUvlF51DfcfC2TX";

export const fetchBreeds = async () => {
  const breedSelect = document.querySelector(".breed-select");
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    breedSelect.style.display = "flex";
    return response.data;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw error;
  }
};


export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching cat for breed ${breedId}:`, error);
    throw error;
  }
};