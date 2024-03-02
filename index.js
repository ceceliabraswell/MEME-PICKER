import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

emotionRadios.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener('click', closeModal);

getImageBtn.addEventListener('click', renderCat);
    //Get Image button calls renderCat, which calls getSingleCatObject, which calls getMatchingCatsArray

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");

  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  // remove all instances of the highlight class
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal(){
    memeModal.style.display = 'none';
}

function renderCat(){
    //uses cat object provided by getSingleCatObject to create HTML string which will render it to DOM
    
        const catObject = getSingleCatObject()
            
        memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
        memeModal.style.display = 'flex' //changes memModals display to flex.
}

function getSingleCatObject(){
    //returns a single cat object selected from the array provided by getMatchingCatsArray
    
        const catsArray = getMatchingCatsArray();
        //calls getMatchingCatsArray function and assigns it to catsArray
    
        if (catsArray.length === 1){
            return catsArray[0];
            //if only 1 object matching criteria is return, return the 1 object
        } else {
            const randomNumber = Math.floor(Math.random() * catsArray.length);
            return catsArray[randomNumber];
            //if more than 1 object is returned, select and display only 1 by random
        }
  }

function getMatchingCatsArray() {
//getMatchingCatsArray returns an array of cat objects that matches user's criteria

    if (document.querySelector('input[type="radio"]:checked')) {
    //Runs if statement to see if radio is checked. If radio btn isn't checked, prevents error message from showing.
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
            //When declaring Boolean, use is or has.
        const isGif = gifsOnlyOption.checked //Boolean that checks to see if GIF button is checked.

        const getMatchingCatsArray = catsData.filter(function(cat){
            if (isGif) {
                //Checks to see if selected tag and isGif button is selected.
                return cat.emotionTags.includes(selectedEmotion) && isGif;
            } else {
                return cat.emotionTags.includes(selectedEmotion);
            }
        })
        return getMatchingCatsArray;
    }
}

function getEmotionsArray(cats) {
  const emotionsArray = [];

  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
    //prevents emotion from being listed more than once.
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                >
            </div>
        `;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
