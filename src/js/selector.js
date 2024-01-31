import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";

import { fetchCatByBreed } from "./cat-api";



export const populateBreedsSelect = (breeds) => {
    const catInfoDiv = document.querySelector(".cat-info");
    const select = new SlimSelect({
      select: ".breed-select",
      settings: {
        allowDeselect: true,
      },
      data: [
        { placeholder: true, text: "Search for the purr-fect cat breed..." },
        ...breeds.map((breed) => ({ text: breed.name, value: breed.id })),
      ],
      events: {
        afterChange: () => {
          const selectedValues = select.getSelected();
          if (selectedValues.length > 0) {
            const promises = selectedValues.map((breedId) =>
              fetchCatByBreed(breedId)
            );
            Promise.all(promises)
              .then((catsData) => {
                displayCatInfo(catsData);
                catInfoDiv.scrollIntoView({ behavior: "smooth", block: "start" });
              })
              .catch((error) => {
                console.error("Error fetching cat info:", error);
              });
          } else {
            clearCatInfo();
          }
        },
      },
    });
  };



  const displayCatInfo = (catsData) => {
    const catInfoDiv = document.querySelector(".cat-info");
    catInfoDiv.innerHTML = "";
  
    catsData.forEach((catData) => {
      const temperamentList = catData[0].breeds[0].temperament.split(", ");
  
      const catInfoBlock = document.createElement("div");
      catInfoBlock.classList.add("container", "flex");
  
      catInfoBlock.innerHTML = `
        <img src="${catData[0].url}" alt="Cat Image">
        <div class="breed-info">
          <p class="breed-info__title">${catData[0].breeds[0].name}</p>
          <p class="breed-info__description">${
            catData[0].breeds[0].description
          }</p>
          <p class="breed-info__temperament"><strong>Temperament:</strong> ${temperamentList
            .map(
              (temperament) =>
                `<span class="temperament-item">${temperament}</span>`
            )
            .join(" ")}</p>
        </div>
      `;
  
      catInfoDiv.appendChild(catInfoBlock);
    });
  };
 
  

  const clearCatInfo = () => {
    const catInfoDiv = document.querySelector(".cat-info");
    catInfoDiv.innerHTML = "";
  };