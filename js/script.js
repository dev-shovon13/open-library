const loadBook = () => {
    const input = document.getElementById("book-input")
    const searchText = input.value
    input.value = ""
    if (searchText.length == 0) {
        alert("Please Give input")
    } else {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => showResult(data))
    }
    document.getElementById("book-found").textContent = ''
    document.getElementById("book-container").innerHTML = ''
}
document.getElementById("book-search").addEventListener("click", loadBook)
const showResult = (books) => {
    console.log(books);
    const bookFound = books.numFound
    const bookContainer = document.getElementById("book-container")
    books.docs.forEach(book => {
        console.log(book);
        document.getElementById("book-found").textContent = `Total Books Found: ${bookFound}`
        const div = document.createElement("div")
        const cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        div.classList.add("col", "d-md-flex", "align-items-center", "bg-light", "p-4", "p-md-2", "rounded", "border")
        div.innerHTML = `
                <div class="text-center me-md-3">
                    <img src="${cover}" alt="Cover Image" class="rounded" width = 130px>
                </div>
                <div>
                    <h4>${book.title}</h4>
                    <h5 class="fw-light"><small class="fw-normal">by </small>${book.author_name}</h5>
                    <p class="text-secondary mt- mb-0"><span class="text-dark">Publisher </span>${book.publisher}</p>
                    <p class="text-secondary mt- mb-0"><span class="text-dark">First published in </span>${book.first_publish_year}</p>
                    <p class="text-secondary"><span class="text-primary">${book.edition_count} editions</span></p>
                </div>
    `
        bookContainer.appendChild(div)
    });
}