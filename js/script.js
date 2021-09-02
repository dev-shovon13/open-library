// spinner function
const spinner = displayStatus => {
    document.getElementById("spinner").style.display = displayStatus
}

// searching book 
const loadBook = () => {
    const input = document.getElementById("book-input")
    const searchText = input.value
    // if input length is greater than zero then show result 
    if (searchText.length === 0) {
        alert("Please Give input")
    } else {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => showResult(data))
    }
    // clearing fields 
    input.value = ""
    document.getElementById("book-found").innerHTML = ''
    document.getElementById("book-not-found").innerHTML = ''
    document.getElementById("book-container").innerHTML = ''

    // show loading spinner
    if (searchText.length > 0) {
        spinner("block")
    }
}
// search button click handler 
document.getElementById("book-search").addEventListener("click", loadBook)

// showing searched books 
const showResult = books => {
    // if search result not found then return message 
    if (books.numFound <= 0) {
        document.getElementById("book-not-found").innerHTML = '<h1 class="text-center text-danger border border-danger p-2 bg-light">SORRY, NO RESULTS FOUND !!</h1>'
    }
    // attatching searched result here 
    const bookContainer = document.getElementById("book-container")
    books.docs.forEach(book => {
        document.getElementById("book-found").innerHTML = `
        <h3 class="p-2 rounded">Total Books Found: <span class="text-success fw-bold">${books.numFound}</span></h3>
        <h3 class="p-2 rounded">Result Showing: <span class="text-success fw-bold">${books.docs.length}</span></h3>
        `
        const cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        const coverNotFound = `../images/no-image.png`
        const div = document.createElement("div")
        div.classList.add("col")
        // setting up searched books
        div.innerHTML = `
            <div class="border h-100 d-md-flex align-items-center p-2 shadow-sm bg-white">
                <div class="text-center me-md-3 mb-md-0 mb-3 ">
                    <img src="${book.cover_i ? cover : coverNotFound}" alt="Cover Image" class="rounded" width=130px>
                </div>
                <div>
                    <h4>${book.title}</h4>
                    <h5 class="fw-light"><small class="fw-normal">by </small>${book.author_name ? book.author_name : 'Author Name Not Found'}</h5>
                    <p class="text-secondary mt- mb-0" > <span class="text-dark">Publisher: </span>${book.publisher ? book.publisher : 'Publisher Not Found'}</p >
                    <p class="text-secondary mt- mb-0"><span class="text-dark">First published in </span>${book.first_publish_year ? book.first_publish_year : ''}${book.publish_place ? `, ${book.publish_place}` : ''}</p>
                    <p class="text-secondary mt-2"><span class="text-primary">${book.edition_count} ${book.edition_count > 1 ? "editions" : "edition"}</span></p>
                </div >
            </div >
    `
        bookContainer.appendChild(div)
    });
    // hide loading spinner
    spinner("none")
}