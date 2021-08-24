const refs = {
    input: document.querySelector('#search-form'),
    galleryList: document.querySelector('.gallery-container'),
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
    cleanImgMarkup();
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

function cleanImgMarkup() {
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