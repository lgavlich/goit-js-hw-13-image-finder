import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import imgCard from '../templates/card.hbs';
import SearchIpiImages from "./apiService.js";
import LoadButton from "./btn.js";
import { onImgClick } from './box';

const refs = {
    input: document.querySelector('#search-form'),
    galleryList: document.querySelector('.gallery-container'),
    loadBtn: document.querySelector('[data-action="load-more]'),
   
}
const loadButton = new LoadButton({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const searchIpiImages = new SearchIpiImages();

refs.input.addEventListener('submit', onSearchImg);
loadButton.refs.button.addEventListener('click', fetchImages);
refs.galleryList.addEventListener('click', onImgClick);

function onSearchImg(e) {
    e.preventDefault();
    searchIpiImages.query = e.currentTarget.elements.query.value;
    const searchImgTrim = searchIpiImages.query.trim();
   
    if (searchImgTrim === '') {
        loadButton.disableBtn();
        return noSearchWorld();
  
         
    }
    loadButton.show();
    searchIpiImages.resetPage();
    clearImgMarkUp();
    fetchImages();

}

function fetchImages() {
    loadButton.disableBtn();
    searchIpiImages.fetchImgSearch().then(hits => {
        imagesMarkUp(hits);
        loadButton.enableBtn();
        smoothScrolling();

        if (hits.length === 0) {
            loadButton.hide();
            onError();
           
        }
    });
}

function imagesMarkUp(hits) {
    refs.galleryList.insertAdjacentHTML('beforeend', imgCard(hits))
}

function clearImgMarkUp() {
    refs.galleryList.innerHTML = '';
    
}

function smoothScrolling() {
    try {
        refs.galleryList.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
   } catch {
      console.log(onError);
    }
};

function onError() {
    error({
        text: 'Try Again',
        delay: 2000,
    });
}

function noSearchWorld() {
    error({
        text: 'Please enter the search key',
        delay: 2000,
    });
}

