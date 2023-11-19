function generateID() {
    return Date.now();
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isComplete = document.getElementById('isComplete').checked;
    const book = {
        id: generateID(),
        title,
        author,
        year: parseInt(year, 10),
        isComplete
    };
    const shelf = isComplete ? 'finishedList' : 'unfinishedList';
    const bookElement = document.createElement('li');
    const bookId = `book-${book.id}`;
    bookElement.id = bookId;
    bookElement.textContent = `${book.title} - ${book.author} (${book.year})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.onclick = function () {
        deleteBook(book.id, shelf);
    };
    bookElement.appendChild(deleteButton);

    const toggleButton = document.createElement('button');
    if (isComplete) {
        toggleButton.textContent = 'Belum Selesai Dibaca';
    } else {
        toggleButton.textContent = 'Selesai Dibaca';
    }
    toggleButton.onclick = function () {
        toggleReadStatus(book.id, shelf);
    };
    bookElement.appendChild(toggleButton);

    document.getElementById(shelf).appendChild(bookElement);

    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function deleteBook(id, shelf) {
    const bookElement = document.getElementById(`book-${id}`);
    if (bookElement) {
        bookElement.remove();
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const updatedBooks = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
}
function toggleReadStatus(id, currentShelf) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex !== -1) {
        const currentStatus = books[bookIndex].isComplete;
        const targetShelf = currentStatus ? 'unfinishedList' : 'finishedList';

        if (currentShelf !== targetShelf) {

            const bookElement = document.getElementById(`book-${id}`);
            if (bookElement) {
                bookElement.remove();
            }


            books[bookIndex].isComplete = !currentStatus;
            localStorage.setItem('books', JSON.stringify(books));

            const toggleButton = bookElement.querySelector('button:last-of-type');
            toggleButton.textContent = currentStatus ? 'Belum Selesai Dibaca' : 'Selesai Dibaca';
            toggleButton.onclick = function () {
                toggleReadStatus(id, targetShelf);
            };
            document.getElementById(targetShelf).appendChild(bookElement);
        }
    }
}




function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];

    books.forEach(book => {
        const shelf = book.isComplete ? 'finishedList' : 'unfinishedList';

        const bookElement = document.createElement('li');
        const bookId = `book-${book.id}`;
        bookElement.id = bookId;
        bookElement.textContent = `${book.title} - ${book.author} (${book.year})`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.onclick = function () {
            deleteBook(book.id, shelf);
        };
        bookElement.appendChild(deleteButton);

        const toggleButton = document.createElement('button');
        if (book.isComplete) {
            toggleButton.textContent = 'Belum Selesai Dibaca';
        } else {
            toggleButton.textContent = 'Selesai Dibaca';
        }
        toggleButton.onclick = function () {
            toggleReadStatus(book.id, shelf);
        };
        bookElement.appendChild(toggleButton);

        document.getElementById(shelf).appendChild(bookElement);
    });
}

document.addEventListener('DOMContentLoaded', loadBooks);
