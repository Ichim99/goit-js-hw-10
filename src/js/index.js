import { fetchBreeds } from "./cat-api";
import { populateBreedsSelect } from "./selector";

const initializeCatBreeds = () => {

  fetchBreeds()
    .then((breeds) => {
      
      populateBreedsSelect(breeds);
    })
    .catch((error) => {
      
      console.error("Error:", error);
    });
};


initializeCatBreeds();