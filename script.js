const myLibrary = [];

const tbody = document.querySelector("tbody");
const submitBtn = document.querySelector(".submit-btn");

function Book(author, title, pages) {
  if(!new.target) {
    throw new Error('You must use the "new" operator to call the constructor');
  }
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = false;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(author, title, pages) {
  const book = new Book(author, title, pages);
  myLibrary.push(book);
}

function renderBooks(library) {
  tbody.textContent = "";
  for(const book of library) {
    const row = document.createElement("tr");
    row.dataset.bookId = book.id;
    const authorCell = document.createElement("td");
    authorCell.classList.add("flex");
    const authorSpan = document.createElement("span");
    authorSpan.textContent = book.author;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("button", "del-btn");
    deleteBtn.textContent = "DELETE";
    authorCell.append(authorSpan, deleteBtn);
    row.append(authorCell);

    row.append(
      createCell(book.title),
      createCell(book.pages)
    );

    const readUnreadCell = document.createElement("td");
    readUnreadCell.classList.add("flex");
    const readUnreadSpan = document.createElement("span");
    const hasRead = book.read ? "Yes" : "No";
    readUnreadSpan.textContent = hasRead;
    const readUnreadBtn = document.createElement("button");
    readUnreadBtn.classList.add("button", "read-btn");
    readUnreadBtn.textContent = book.read ? "READ" : "UNREAD";
    readUnreadCell.append(readUnreadSpan, readUnreadBtn);
    
    row.append(readUnreadCell);

    tbody.appendChild(row);
  }
}

function createCell(text) {
  const cell = document.createElement("td");
  const span = document.createElement("span");

  span.textContent = text;
  cell.append(span);
  return cell;
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const pages = document.querySelector("#pages");
  if (author.value && title.value && pages.value) {
    addBookToLibrary(author.value, title.value, Number(pages.value));
  } else {
    alert("You must fill all the required (*) fields to continue!");
  } 

  author.value = "";
  title.value = "";
  pages.value = "";
});

tbody.addEventListener("click", (event) => {
  const btn = event.target;
  if (btn.classList.contains("read-btn")) {
    const row = btn.closest("tr");
    const id = row.dataset.bookId;
    const book = myLibrary.find(book => book.id === id);
    book.toggleRead();
  }

  if (btn.classList.contains("del-btn")) {
    const row = btn.closest("tr");
    const id = row.dataset.bookId;
    const idx = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(idx, 1);
  }
  renderBooks(myLibrary);
});

addBookToLibrary("George Orwell", "1984", 328);
addBookToLibrary("Gabriel García Márquez", "One Hundred Years of Solitude", 417);
addBookToLibrary("Frank Herbert", "Dune", 658);
addBookToLibrary("Jane Austen", "Pride and Prejudice", 279);
/* 

  Author: Walter Isaacson

  Title: Steve Jobs
  
  Pages: 656
*/

renderBooks(myLibrary);

