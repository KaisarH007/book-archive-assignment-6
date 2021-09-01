

const loadBookData = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `http://openlibrary.org/search.json?q=${searchText}`;

    fetch(url).then(res => res.json()).then(data => displayBookData(data));
}

const displayBookData = (data) => {
    // console.log(data)
    const books = data.docs;
    books.forEach(book => {
        // console.log(book)
        const booksContainer = document.getElementById('books-detail');
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('col');
        bookDiv.innerHTML =
            `<div class="card h-100">
                  <img height="250 px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                          <h6 class="card-title">Book Name: ${book.title}</h6>
                          <p class="card-text">Author Name: ${book.author_name[0]}</p>
                          <p class="card-text">Publisher Name: ${book.publisher[0]}</p>
                          <p class="card-text">PubLish Year: ${book.first_publish_year}</p>
                     </div>
             </div>`;
        booksContainer.appendChild(bookDiv);
    })
}