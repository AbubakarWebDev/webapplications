/************* First Logic For Add Title in Jango Notes **************/

// Variable Initalization
var addbtn = document.getElementById("addbtn");
var search = document.querySelector("[type='search']");

// Function Calling For Showing Notes After Refresh the page
showingNotes();

// Function For Add Click Event on "addbtn"
addbtn.addEventListener("click", function () {
    let txtarea = document.getElementById("txtarea");
    let inputNotes1 = localStorage.getItem("notes");
    let massaege_1 = document.getElementById('massege-1');
    let notesObj1;

    let massaege_2 = document.getElementById('massege-2');
    let title = document.getElementById("title");
    let inputNotes2 = localStorage.getItem("title");
    let notesObj2;

    if (txtarea.value.length != 0 && title.value.length != 0) {
        if (inputNotes1 == null && inputNotes2 == null) {
            notesObj1 = [];
            notesObj2 = [];
        }
        else {
            notesObj1 = JSON.parse(inputNotes1);
            notesObj2 = JSON.parse(inputNotes2);
        }

        notesObj1.push(txtarea.value);
        notesObj2.push(title.value);
        localStorage.setItem("notes", JSON.stringify(notesObj1));
        localStorage.setItem("title", JSON.stringify(notesObj2));
        txtarea.value = "";
        title.value = "";
        massaege_1.innerHTML = "";
        massaege_2.innerHTML = "";
        showingNotes();
    }
    else {
        if (txtarea.value.length == 0) {
            massaege_1.innerHTML = `<b>Your Entered Note is Blank! Please Enter Your Note Again</b>`;
            if (title.value.length != 0) {
                massaege_2.innerHTML = "";
            }
        }

        if (title.value.length == 0) {
            massaege_2.innerHTML = `<b>Your Entered Note is Blank! Please Enter Your Note Again</b>`;
            if (txtarea.value.length != 0) {
                massaege_1.innerHTML = "";
            }
        }
    }
});


// Function For Showing Added InputNotes
function showingNotes() {
    let inputNotes1 = localStorage.getItem("notes");
    let inputNotes2 = localStorage.getItem("title");
    let notesObj1;
    let notesObj2;

    if (inputNotes1 == null && inputNotes1 == null) {
        notesObj1 = [];
    }
    else {
        notesObj1 = JSON.parse(inputNotes1);
        notesObj2 = JSON.parse(inputNotes2);
    }

    let html = "";
    notesObj1.forEach(function (element, index) {        
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <p class="card-title font-weight-bolder" style="font-size:30px;">${notesObj2[index]}</p>
        <p class="card-text"> ${element} </p>
        <button onclick="deleteNotes(${index})" class="btn btn-primary">Delete Note</button>
        </div >
        </div >`;
    });

    let notes = document.getElementById("notes");

    if (notesObj1.length != 0 && notesObj2.length != 0) {
        notes.innerHTML = html;
    }
    else {
        notes.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}


// Function for Deleting Notes
function deleteNotes(index) {
    let inputNotes1 = localStorage.getItem("notes");
    let inputNotes2 = localStorage.getItem("title");
    let notesObj1;
    let notesObj2;

    if (inputNotes1 == null && inputNotes1 == null) {
        notesObj1 = [];
    }
    else {
        notesObj1 = JSON.parse(inputNotes1);
        notesObj2 = JSON.parse(inputNotes2);
    }

    notesObj1.splice(index, 1);
    notesObj2.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj1));
    localStorage.setItem("title", JSON.stringify(notesObj2));
    showingNotes();
}


// Function For Search The Notes
search.addEventListener("input", function () {
    let inputVal = new RegExp(search.value, "i")
    let noteCard = document.getElementsByClassName("noteCard");

    Array.from(noteCard).forEach(function (element) {
        cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.match(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});




/************* Second Logic For Add Title in Jango Notes **************/

/*

// Variable Initalization
var addbtn = document.getElementById("addbtn");
var search = document.getElementById("searchTxt");

// Function Calling For Showing Notes After Refresh the page
showingNotes();


// Function For Add Click Event on "addbtn"
addbtn.addEventListener("click", function () {
    let txtarea = document.getElementById("txtarea");
    let inputNotes1 = localStorage.getItem("notes");
    let massaege_1 = document.getElementById('massege-1');
    let notesObj1;

    let massaege_2 = document.getElementById('massege-2');
    let title = document.getElementById("title");

    if (txtarea.value.length != 0 && title.value.length != 0) {
        if (inputNotes1 == null) {
            notesObj1 = [];
        }
        else {
            notesObj1 = JSON.parse(inputNotes1);
        }

        let myObj = {
            title: title.value,
            text: txtarea.value
        }

        notesObj1.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj1));

        txtarea.value = "";
        title.value = "";
        massaege_1.innerHTML = "";
        massaege_2.innerHTML = "";
        showingNotes();
    }
    else {
        if (txtarea.value.length == 0) {
            massaege_1.innerHTML = `<b>Your Entered Note is Blank! Please Enter Your Note Again</b>`;
            if (title.value.length != 0) {
                massaege_2.innerHTML = "";
            }
        }

        if (title.value.length == 0) {
            massaege_2.innerHTML = `<b>Your Entered Note is Blank! Please Enter Your Note Again</b>`;
            if (txtarea.value.length != 0) {
                massaege_1.innerHTML = "";
            }
        }
    }
});


// Function For Showing Added InputNotes
function showingNotes() {
    let inputNotes1 = localStorage.getItem("notes");
    let notesObj1;

    if (inputNotes1 == null) {
        notesObj1 = [];
    }
    else {
        notesObj1 = JSON.parse(inputNotes1);
    }

    let html = "";
    notesObj1.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <p class="card-title font-weight-bolder" style="font-size:30px;">${element.title}</p>
                <p class="card-text"> ${element.text} </p>
                <button onclick="deleteNotes(${index})" class="btn btn-primary">Delete Note</button>
            </div >
        </div >
        `;
    });

    let notes = document.getElementById("notes");

    if (notesObj1.length != 0) {
        notes.innerHTML = html;
    }
    else {
        notes.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}


// Function for Deleting Notes
function deleteNotes(index) {
    let inputNotes1 = localStorage.getItem("notes");
    let notesObj1;

    if (inputNotes1 == null) {
        notesObj1 = [];
    }
    else {
        notesObj1 = JSON.parse(inputNotes1);
    }

    notesObj1.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj1));
    showingNotes();
}


// Function For Search The Notes
search.addEventListener("input", function () {
    let inputVal = new RegExp(search.value, "i")
    let noteCard = document.getElementsByClassName("noteCard");

    Array.from(noteCard).forEach(function (element) {
        cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.match(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});

*/


/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/