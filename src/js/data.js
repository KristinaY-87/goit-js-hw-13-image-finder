// import { name } from 'file-loader';
import photoCardTpl from '../templates/photo-card.hbs';
import apiService from './apiService';
import getRefs from './refs';
// import addLoadMoreBtn from'./loadMore-btn';

import "@pnotify/core/dist/PNotify.css";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";


const refs = getRefs();
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'load more...';
loadMoreBtn.classList.add('btn');
refs.listPhoto.insertAdjacentElement('afterend', loadMoreBtn);
// refs.listPhoto.after(loadMoreBtn)

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    clearGalleryList();
     
        apiService.query = e.currentTarget.elements.query.value;
        apiService.resetPage();
        // console.log(searchQuery);
    if (apiService.query.trim() === '') {
        return onFetchError()
    }
        apiService.fetchPhotos()
        .then(renderPhotoCard);
}

function renderPhotoCard(hits) {
        refs.listPhoto.insertAdjacentHTML('beforeend', photoCardTpl(hits));
}

function clearGalleryList() {
    refs.listPhoto.innerHTML = '';
}

function onFetchError() {  
    
        error({
            title: "Attention",
            text:
                "Please enter correct data!",
            delay: 2000
        });
    };

export default { error }

function onLoadMore() {
    windowsScrolling()
    apiService.fetchPhotos().then(renderPhotoCard);

}
function windowsScrolling() {

        const totalScrollHeight = document.body.clientHeight;
        window.scrollTo({
            top: totalScrollHeight,
            behavior: 'smooth',
        });
}
