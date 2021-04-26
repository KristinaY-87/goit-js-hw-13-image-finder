export default {
    
    baseUrl: 'https://pixabay.com/api/',
    key: '21265855-20ad9644639ddbc8948511dcb',
    page: 1,
    searchQuery: '',
    fetchPhotos() {
    
        const url = `${this.baseUrl}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.key}`;
        return fetch(url)
            .then(response => response.json())
            .then(({ hits }) => {
            
                this.incrementPage();
                return hits;
            })
            .catch(error => console.log(error))
    },

    get query() {
        return this.searchQuery;
    },

    set query(newQuery) {
        this.searchQuery = newQuery;
    },
    incrementPage() {
        this.page += 1;
    },
    resetPage() {
        this.page = 1;
    }

}