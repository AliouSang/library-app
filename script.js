const myLibrary = [];

const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
const dialog = document.querySelector("#dialog");

class Book {
  constructor(author, title, pages) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = false;
  }

  toggleRead() {
    this.read = !this.read;
  }
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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const pages = document.querySelector("#pages");

  addBookToLibrary(
    author.value.trim(),
    title.value.trim(),
    Number(pages.value)
  );

  renderBooks(myLibrary);

  form.reset();
  dialog.close();
});

tbody.addEventListener("click", (event) => {
  const btn = event.target.closest("button");

  if (!btn || !tbody.contains(btn)) {
    return;
  }

  const row = btn.closest("tr");
  const id = row.dataset.bookId;
  const book = myLibrary.find(book => book.id === id);

  if (!book) {
    return;
  }

  if (btn.classList.contains("read-btn")) {
    book.toggleRead();
  } else if (btn.classList.contains("del-btn")) {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
  } else {
    return;
  }

  renderBooks(myLibrary);
});





