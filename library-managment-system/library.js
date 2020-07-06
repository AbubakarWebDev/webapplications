let radio = document.querySelectorAll('input[type=radio]');

for (let i = 0; i < radio.length; i++) {
    radio[i].addEventListener('click', function () {
        let append = document.getElementById('append');
        if (document.querySelector('input[id=radio-4]').checked) {
            append.innerHTML = `<input type="text" class="form-control" id="book-type" placeholder="Enter Your Book Category" required><div id="book-type-error" class="mx-0 my-0" style="color: red;"></div>`;
        }
        else {
            append.innerHTML = "";
        }
    });
}

let Library = function (bookName, bookAuthor, bookCategory) {
    this.name = bookName;
    this.author = bookAuthor;
    this.category = bookCategory;
}

var display = {
    validateInput : function () {
        let bookName = document.getElementById('book-name');
        let bookAuthor = document.getElementById('book-author');
        let radio = document.querySelectorAll('input[type=radio]');
        let bookNameError = document.getElementById('name-error');
        let bookAuthorError = document.getElementById('author-error');
        let bookCategoryError = document.getElementById('radio-error');
        let customBookCategory = document.getElementById('book-type');
        let customBookCategoryError = document.getElementById('book-type-error');
        let check = [];

        if (bookName.value.length < 3) {
            check[0] = false;
            bookNameError.innerHTML = `<b>Your Entered Input is Not Valid Please Enter Your Input Again</b>`;
        }
        else {
            check[0] = true;
            bookNameError.innerHTML = "";
        }
        if (bookAuthor.value.length < 3) {
            check[1] = false;
            bookAuthorError.innerHTML = `<b>Your Entered Input is Not Valid Please Enter Your Input Again</b>`;
        }
        else {
            check[1] = true;
            bookAuthorError.innerHTML = "";
        }

        if (radio[0].checked == false && radio[1].checked == false && radio[2].checked == false && radio[3].checked == false) {
            check[2] = false;
            bookCategoryError.innerHTML = `<b>Please check at least one of the options.</b>`;
        }
        else {
            check[2] = true;
            bookCategoryError.innerHTML = "";
        }

        if (radio[3].checked) {
            if (customBookCategory.value.length < 3) {
                check[3] = false;
                customBookCategoryError.innerHTML = "<b>Your Entered Input is Not Valid Please Enter Your Input Again</b>";
            }
            else {
                check[3] = true;
                customBookCategoryError.innerHTML = "";
            }
        }

        let checker = check.every(function (element) {
            return element == true;
        })

        if (checker) {
            return true;
        }
        else {
            return false;
        }
    },

    clearInput : function () {
        let form = document.getElementById('library-form');
        form.reset();
    },

    showMassage : function (type, slogan, mymassage) {
        let massage = document.getElementById('massage');
        massage.innerHTML =
            `<div id="alert-success" class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>${slogan}</strong> ${mymassage}.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`

        setTimeout(function () {
            if (massage.innerHTML.indexOf('alert-warning') !== -1) {
                massage.innerHTML = "";
            }
        }, 5000)
    },

    store : function (book) {
        let inputBook = localStorage.getItem('book');
        let bookArr;

        if (inputBook == null) {
            bookArr = [];
        }
        else {
            bookArr = JSON.parse(inputBook);
        }

        bookArr.push(book);
        localStorage.setItem('book', JSON.stringify(bookArr));
    },

    searchBooks : function () {
        let search = document.querySelector(`input[type="search"]`);
        let searchValue = new RegExp(search.value, "i");
        let bookName = document.getElementsByClassName('book-name');

        for (let i = 0; i < bookName.length; i++) {
            if (bookName[i].innerText.match(searchValue)) {
                bookName[i].parentElement.style.display = "table-row";
            }
            else {
                bookName[i].parentElement.style.display = "none";
            }
        }
    },

    

    showBook : function () {

        let table = document.getElementById('table');
        let inputBook = localStorage.getItem('book');
        let bookArr;
    
        if (inputBook == null) {
            bookArr = [];
        }
        else {
            bookArr = JSON.parse(inputBook);
        }
    
        if (bookArr.length > 0 && inputBook != "[]") {
            table.innerHTML = `
                <table class="table table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th> # </th>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Book Category</th>
                            <th>Selected Books</th>
                        </tr>
                    </thead>
                    <tbody id="table-body"><tbody>
                </table>`;
            table.classList.add('my-custom-scrollbar');
            table.classList.add('table-wrapper-scroll-y');
    
            let html = "";
            bookArr.forEach(function (element, index) {
                html += `
                    <tr>
                        <th style="vertical-align:middle;">${index + 1}</th>
                        <td class="book-name" style="vertical-align:middle;">${element.name}</td>
                        <td style="vertical-align:middle;">${element.author}</td>
                        <td style="vertical-align:middle;">${element.category}</td>
                        <td class="text-center">
                            <div class="chkbox-container">
                                <span style="margin-right:10px"></span>
                                <input classs="form-control" id="box${index}" type="checkbox" />
                                <label for="box${index}"></label>
                            </div>
                        </td>
                    </tr>`;
            });
    
            let tableBody = document.getElementById('table-body');
            tableBody.innerHTML = html;
            document.getElementById('nothing-label').innerText = "";
            document.getElementById('delete-btn').innerHTML = `<button id="del-btn" type="button" class="btn btn-lg btn-primary">Delete Selected Books</button>`;

            document.getElementById('del-btn').addEventListener('click' , ()=> {
                this.deleteBook();
            })
        }
    
        else {
            document.getElementById('nothing-label').innerText = "Nothing to show! Use \"Add a Book\" section above to add Books.";
            table.innerHTML = "";
            document.getElementById('delete-btn').innerHTML = "";
        }
    },

    deleteBook : function () {
        let checkbox = Object.values(document.querySelectorAll('input[type=checkbox]'));
        let inputBook = localStorage.getItem("book");
        let bookArr;
        let indexArr = [];
    
        if (inputBook == null) {
            bookArr = [];
        }
        else {
            bookArr = JSON.parse(inputBook);
        }
    
        checkbox.forEach(element => {
            if (element.checked) {
                indexArr.push(element.parentElement.parentElement.parentElement.firstElementChild.innerText - 1);
            }
        });
    
        for (let i = indexArr.length - 1; i >= 0; i--) {
            bookArr.splice(indexArr[i], 1);
        }
    
        localStorage.setItem("book", JSON.stringify(bookArr));
        this.showBook();
    }
}

display.showBook();

document.getElementById('add-btn').addEventListener('click', libraryFormSubmit);
document.querySelector(`input[type="search"]`).addEventListener('input', display.searchBooks);

function libraryFormSubmit(e) {
    e.preventDefault();
    let bookName = document.getElementById('book-name').value;
    let bookAuthor = document.getElementById('book-author').value;
    let radio = document.querySelectorAll('input[type=radio]');
    let bookCategory;

    if (radio[0].checked) {
        bookCategory = radio[0].value;
    }
    else if (radio[1].checked) {
        bookCategory = radio[1].value;
    }
    else if (radio[2].checked) {
        bookCategory = radio[2].value;
    }
    else if (radio[3].checked) {
        bookCategory = document.getElementById('book-type').value;
    }

    let book = new Library(bookName, bookAuthor, bookCategory);

    if (display.validateInput()) {
        display.clearInput();
        display.store(book);
        display.showBook();
        display.showMassage("warning", "Congratulations! ", " Your Book is Successfully Added");
        let append = document.getElementById('append');
        append.innerHTML = "";
    }
    else {
        display.showMassage("danger", "Error! ", " Your Book is Not Added Because One of the Input is Wrong.");
    }

}



/*
Further Features:
1. Store into a Local Storage
2. Delete Book Button
3. Add a scroll bar to the view in table
4. Sync and host to web server
*/