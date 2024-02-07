const myLibrary = [];

function Book(title, author, pages, readOrNot){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
    this.info = function() {
        return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.readOrNot}` )
    }
}

//create a book instance with required info
function addBookToLibrary (title, author, pages, readOrNot){
    if (!title || !author || !pages) {
        alert('Please fill in all fields.');
        return;
    }

    let newBook = new Book(title, author, pages, readOrNot);
    console.log(newBook.info());
    myLibrary.push(newBook);
    createCard(newBook);
}

//display the book info, add the buttons, and update when the read toggle is pressed
function createCard (newBook){
    const storedBook = document.createElement('div');
    storedBook.className = 'card';
    storedBooks.appendChild(storedBook);
    const infoContainer = document.createElement('p');
    infoContainer.textContent = newBook.info();
    storedBook.appendChild(infoContainer);
    storedBook.appendChild(createDeleteButton());
    storedBook.appendChild(toggleRead(newBook));
    storedBook.addEventListener('click', function() {
        infoContainer.textContent = newBook.info(); 
    });
}

//check the console to ensure books appear
function displayLibrary () {
    for (const book of myLibrary)  {
        console.log(book.info());
    }
}

/*create a delet button for use in card, and make button execute card removal
and removal from the library storage*/
function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'Delete Book';
    deleteButton.addEventListener('click', function() {
        const cardElement = this.parentNode;
        if (cardElement && cardElement.classList.contains('card')) {
            storedBooks.removeChild(cardElement);
            myLibrary.pop(cardElement);
        }
    });
    return deleteButton;
}

//when pressed, the read status will update both in card and library
function toggleRead (newBook) {
    const readButton = document.createElement('button');
    readButton.className = 'toggleButton';
    readButton.textContent = 'Read';
    readButton.addEventListener('click', function() {
        this.classList.toggle('active');
        newBook.readOrNot = this.classList.contains('active') ? 'read' : 'not read';
        return newBook.info();
    })
    return readButton;
}


const dialog = document.querySelector('dialog');
const newButton = document.querySelector('dialog + button');
const closeDialog = document.querySelector('.closeButton');
const submitButton = document.querySelector('.newSubmit');
const newTitle = document.querySelector('#title');
const newAuthor = document.querySelector('#author');
const newPages = document.querySelector('#pages');
const newRead = document.querySelector(('input[name="isRead"]'));
const storedBooks = document.querySelector('.storedBooks');
const intakeForm = document.querySelector('.intake-form');

//create form intake on button click
//form needed with 4 input values to take in title, author, pages, readornot

let isRead;

newButton.addEventListener('click',() => {
    dialog.showModal();
});

closeDialog.addEventListener('click', (event) => {
    dialog.close();
})


submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedRadioButton = document.querySelector('input[name="isRead"]:checked');
        if (selectedRadioButton) {
            isRead = selectedRadioButton.value;
        } else {
            // Handle the case where no radio button is selected
            alert('Please fill in all required fields.');
            return;// or any default value you prefer
        }
    addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, isRead);
    dialog.close();
    intakeForm.reset();
});


    
