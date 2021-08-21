const API_KEY = '23006232-27664577dbbc234e8c464ad7c';
const BASE_URL = 'https://pixabay.com/api';

export default class SearchApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchImgSearch() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        return fetch(url)
            .then(r => r.json())
            .then(({ hits }) => {
            this.incrementPage();
                return hits;
        });
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    };
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
  
};
