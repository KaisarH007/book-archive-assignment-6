const searchField = document.getElementById('search-field'); //search field
const searchButton = document.getElementById('search-button'); //search button
const errorContainer = document.getElementById('error'); //error massage div
const booksContainer = document.getElementById('books-detail'); //book display div
const totalSearchResult = document.getElementById('total-search-result') //book quantity div

//trigger search button by enter key
searchField.addEventListener("keypress", function (event) {
    if (event.key === 'Enter')
        searchButton.click();
});

// Data Load Function
const loadBookData = () => {
    const searchText = searchField.value;
    // clear field 
    searchField.value = '';
    errorContainer.textContent = '';
    booksContainer.textContent = '';
    totalSearchResult.textContent = '';
    //load url
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayBookData(data));
}


//Data display function
const displayBookData = (data) => {

    //Error Massage
    if (data.numFound === 0) {
        errorContainer.innerHTML = `<h4 class="p-4">Dear Sir,
        Please Input Valid Book Name</h4>`;

    }
    else {
        // display total book result quantity
        totalSearchResult.innerHTML = `<h3 class="p-4">Total Search Result: ${data.numFound} Pcs Books</h3>`;
        //display book result
        const books = data.docs;

        books.forEach(book => {

            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col');
            bookDiv.innerHTML =
                `<div class="card h-100">
                      <img height="250 px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                              <h6 class="card-title text-secondary">Book title:
                              <span class="text-primary"> ${book.title}</span></h6>
                              <p class="card-text text-secondary">Written by:
                               <span class="text-primary">${book.author_name[0]}</span></p>
                              <p class="card-text text-secondary">Published by:
                               <span class="text-primary">${book.publisher[0]}</span></p>
                              <p class="card-text text-secondary">First publish year:
                               <span class="text-primary">${book.first_publish_year}</span></p>
                         </div>
                 </div>`;
            booksContainer.appendChild(bookDiv);
        })
    }

}