const searchField = document.getElementById('search-field');
const errorContainer = document.getElementById('error');
const booksContainer = document.getElementById('books-detail');

const loadBookData = () => {
    const searchText = searchField.value;
    // clear field 
    searchField.value = '';
    errorContainer.innerText = '';
    booksContainer.textContent = '';
    //load url
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayBookData(data));
}

const displayBookData = (data) => {

    if (data.numFound === 0) {
        errorContainer.innerText = `Dear Sir,
        Please Input Valid Book Name`;

    }
    else {
        const books = data.docs;
        books.forEach(book => {

            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col');
            bookDiv.innerHTML =
                `<div class="card h-100">
                      <img height="250 px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                              <h6 class="card-title text-primary">Book title: ${book.title}</h6>
                              <p class="card-text">Written by: ${book.author_name[0]}</p>
                              <p class="card-text">Published by: ${book.publisher[0]}</p>
                              <p class="card-text">First publish year: ${book.first_publish_year}</p>
                         </div>
                 </div>`;
            booksContainer.appendChild(bookDiv);
        })
    }

}