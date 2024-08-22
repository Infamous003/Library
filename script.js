const myLibrary = []

// console.log("First",Array.isArray(myLibrary));

const cardContainer = document.querySelector('.container');

//-----------------Buttons
const readBtn = document.querySelectorAll('.read');
const addBookBtn = document.querySelector('.add-book');
const modalBtn = document.querySelector('.modal-btn');
const modal = document.querySelector('dialog');

//               FORM ELEMENTS 
const titleEle = document.querySelector('#book-title');
const authorEle = document.querySelector('#book-author');
const pagesEle = document.querySelector('#page-count');
const haveReadEle = document.querySelector("#have-read");
const submitBtn = document.querySelector('.submit-form-btn');
const closeModal = document.querySelector('.close-modal');
const form = document.querySelector('form');

// FORM VALIDATION

pagesEle.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// titleEle.addEventListener('input', (e) => {
//     console.log(this.value);
//     if(this.value == '' || this.value == null){
//         alert('Name cannot be empty');
//     }
// });


function Book(title, author, pages, haveRead){
    this.title = title;
    this.author = author,
    this.pages = pages,
    this.haveRead = haveRead,
    this.info = function () {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.haveRead}`;
    };
};

const book1 = new Book('The Silent Patient', 'Alex Michaelides', 286, true);
const book2 = new Book('The Kite Runner', 'Khaled Hosseini', 334, true);
const book3 = new Book('1984', 'George Orwell', 449, true);
const book4 = new Book('Dracula', 'Bram Stoker', 418, false);
const book5 = new Book('Days at Morisaki Bookshop', 'idk man', 223, false);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
myLibrary.push(book5);

function getUserInput() {
    let title = title;
}

function addBoodToLibrary(){
    let title = titleEle.value;
    let author = authorEle.value;
    let pages = pagesEle.value;
    let haveRead = (haveReadEle.value == "checked" ? true: false);
    
    const book = new Book(title, author, pages, haveRead);

    myLibrary.push(book);

};


function showBook(book){
    const card = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('button');
    const btnContainer = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src', './icons/delete.svg');

    img.addEventListener('click', () => {
        for(let i = 0; i < myLibrary.length; i++){
            console.log(myLibrary[i].title == book.title)
            if(myLibrary[i].title == book.title){
                console.log(myLibrary[i]);
                myLibrary.splice(i, 1);
                card.remove();
                console.log(myLibrary);
                break;
            }
        }
    });

    bookTitle.textContent = `${book.title || 'Title not added'}`;
    bookAuthor.textContent = `${book.author || 'Author not added'}`;
    bookPages.textContent = `${book.pages || 'Pages not added'} pages`;

    if (book.haveRead == true){
        bookRead.classList.add('read');
        bookRead.textContent = 'Read';
        console.log("yes");
    }else if(book.haveRead == false){
        bookRead.classList.add('not-read');
        bookRead.textContent = 'Not read';
    }

    bookTitle.classList.add('book-title');
    bookAuthor.classList.add('book-author');
    bookPages.classList.add('pages');
    btnContainer.classList.add('btn-container');
    img.classList.add('delete');

    bookRead.addEventListener('click', () => {
        console.log(bookRead.classList.contains('not-read'));
        if(bookRead.classList.contains('read')){
            bookRead.classList.remove('read');
            bookRead.classList.add('not-read');
            bookRead.textContent = 'Not Read';
            return;
        }else if(bookRead.classList.contains('not-read')){
            bookRead.classList.remove('not-read');
            bookRead.classList.add('read');
            bookRead.textContent = 'Read';
            return;
        }
        console.log("huhihihihih")
    });
    card.classList.add('card');
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    btnContainer.appendChild(bookRead);
    btnContainer.appendChild(img);
    card.appendChild(btnContainer);
    cardContainer.appendChild(card);
};

addBookBtn.addEventListener('click', () => {
    modal.showModal();
});

form.addEventListener('submit', (e) => {
    // let messages = []

    // if(titleEle.value === '' || titleEle.value === null){
    //     messages.push('Title is required');
    // }

    // if(messages.length > 0){
    //     e.preventDefault();
    // }
    // addBoodToLibrary();
    // showBook(myLibrary[myLibrary.length-1]);
    if(form.checkValidity()){
        addBoodToLibrary();
        form.reset();
        modal.close();
        showBook(myLibrary[myLibrary.length-1]);
    }else{
        form.reportValidity();
    }
    e.preventDefault();
})

// submitBtn.addEventListener('click', (e) => {
//     e.preventDefault();

//     if(form.checkValidity()){
//         addBoodToLibrary();
//     form.reset();
//     modal.close();
//     showBook(myLibrary[myLibrary.length-1]);
//     }else{
//         form.reportValidity();
//     }
// });

closeModal.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ){
        modal.close();
    }
});

readBtn.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('not-read');
    });
    if (button.classList.contains('not-read')) {
        button.textContent = `Not read`;
    }
});

for (let i = 0; i < myLibrary.length; i++){
    showBook(myLibrary[i]);
    // console.log(myLibrary[i])
}

