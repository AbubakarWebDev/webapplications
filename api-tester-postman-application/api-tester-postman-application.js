/******** JSON Content and Custom Parameter Section ********/

let radio = document.querySelectorAll('input[type="radio"]');
let jsonContent = document.getElementById('jsonContent');
let customParameter = document.getElementById('customParameter');
let jsonRadio = document.getElementById('jsonRadio');
let parameterRadio = document.getElementById('parameterRadio');
let getRadio = document.getElementById('getRequest');
let postRadio = document.getElementById('postRequest');
let contentRadio = document.getElementById('contentRadio');
let jsonTxtArea = document.getElementById('jsonTxtArea');
let parameterKey = document.querySelectorAll('.parameterKey');
let parameterValue = document.querySelectorAll('.parameterValue');
let addParameter = document.getElementById('addParameter');

customParameter.style.display = "none";
jsonContent.style.display = "none";
contentRadio.style.display = "none";


jsonRadio.addEventListener('click', () => {
    customParameter.style.display = "none";
    parameterKey.forEach(element => {
        element.required = false;
    })
    parameterValue.forEach(element => {
        element.required = false;
    })
    jsonContent.style.display = "flex";
    jsonTxtArea.required = true;
})

parameterRadio.addEventListener('click', () => {
    customParameter.style.display = "flex";
    parameterKey.forEach(element => {
        element.required = true;
    })
    parameterValue.forEach(element => {
        element.required = true;
    })
    jsonContent.style.display = "none";
    jsonTxtArea.required = false;
})

getRadio.addEventListener('click', () => {
    jsonRadio.required = false;
    jsonRadio.required = false;
    contentRadio.style.display = "none";
    jsonContent.style.display = "none";
    jsonTxtArea.required = false;
    customParameter.style.display = "none";
    parameterKey.forEach(element => {
        element.required = false;
    })
    parameterValue.forEach(element => {
        element.required = false;
    })
})

postRadio.addEventListener('click', () => {
    jsonRadio.required = true;
    parameterRadio.required = true;
    contentRadio.style.display = "flex";
})

let parameterCheck = true;
addParameter.addEventListener('click', () => {
    let appendParameter = document.getElementById('append');
    let html = `
        <div class="row my-3">
            <div class="col">
                <input type="text" class="form-control parameterKey" placeholder="Enter Parameter Key">
            </div>
            <div class="col">
                <input type="text" class="form-control parameterValue" placeholder="Enter Parameter Value">
            </div>
            <button type="button" class="btn btn-primary remove" data-toggle="modal" data-target="#confirmationModalCenter">-</button>
        </div>`;
    appendParameter.insertAdjacentHTML("beforeend", html);

    let parameterKey = document.querySelectorAll('.parameterKey');
    let parameterValue = document.querySelectorAll('.parameterValue');

    jsonRadio.addEventListener('click', () => {
        parameterKey.forEach(element => {
            element.required = false;
        })
        parameterValue.forEach(element => {
            element.required = false;
        })
        jsonTxtArea.required = true;
    })

    parameterRadio.addEventListener('click', () => {
        parameterKey.forEach(element => {
            element.required = true;
        })
        parameterValue.forEach(element => {
            element.required = true;
        })
        jsonTxtArea.required = false;
    })


    let removebtn = document.getElementsByClassName('remove');
    for (const item of removebtn) {
        item.addEventListener('click', () => {
            document.getElementById('confirmBtn').addEventListener('click', () => {
                item.parentElement.remove();
                document.getElementById('close-btn').click();
            })
        });
    }
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


let form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let url = document.getElementById('url').value;
    let requestType = document.querySelector('input[name="requestRadio"]:checked').value;
    let parameterKey = document.querySelectorAll('.parameterKey');
    let parameterValue = document.querySelectorAll('.parameterValue');
    let jsonTxtArea = document.getElementById('jsonTxtArea');
    let response = document.getElementById('responseJson');
    let copyBtn = document.getElementById('copy-btn');
    let requestContentType = "";
    let data = {};

    if (requestType == "POST") {
        let contentType = document.querySelector('input[name="contentRadio"]:checked').value;
        if (contentType == "parameter") {
            for (let i = 0; i < parameterKey.length; i++) {
                const key = parameterKey[i].value;
                const value = parameterValue[i].value;
                data[key] = value;
            }

            let formBody = [];
            for (let key in data) {
                let encodedKey = encodeURIComponent(key);
                let encodedValue = encodeURIComponent(data[key]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            data = formBody;
            requestContentType = "application/x-www-form-urlencoded";
        }
        else {
            requestContentType = "application/json";
            data = jsonTxtArea.value;
        }
    }

    response.innerHTML = " Please Wait..... While Fetching Response.....";

    if (requestType == "GET") {
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                response.innerText = JSON.stringify(responseData, null, 4);
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
                copyBtn.style.display = "block";
            })
            .catch(error => {
                response.innerText = ` Some Error Occured While Fetching Data From Server.\n Please Check Your Input Again that Entered Above.\n Error Name : ${error.name}\n Error Massage : ${error.massage}`
            });
    }
    else {
        let request = {
            method: "POST",
            body: data,
            header: {
                "content-Type": requestContentType,
            }
        }

        fetch(url, request)
            .then(response => {
                return (requestContentType == "application/json") ? response.json() : response.text();
            })
            .then(responseData => {
                if (requestContentType == "application/json") {
                    response.innerText = JSON.stringify(responseData, null, 4);
                }
                else {
                    response.innerText = responseData;
                }
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                })
            })
            .catch(error => {
                response.innerText = ` Some Error Occured While Fetching Data From Server.\n Please Check Your Input Again that Entered Above.\n Error Name : ${error.name}\n Error Massage : ${error.massage}`
            });
        copyBtn.style.display = "block";
    }

    copyBtn.addEventListener('click', () => {
        copyToClipboard(response);
        $("#copy-btn").attr("title", "Copied!").tooltip("_fixTitle").tooltip("show").attr("title", "Copy to clipboard").tooltip("_fixTitle");
    })

    form.reset();
});

function copyToClipboard(elem) {

    // we use a temporary form element (textArea) for the selection and copy
    let targetId = "_hiddenCopyText_";
    let target = document.createElement("textarea");

    // Style (textArea) for Makes it hidden in DOM
    target.style.position = "absolute";
    target.style.left = "-9999px";
    target.style.top = "0";
    target.id = targetId;

    // Append in body of Dom
    document.body.appendChild(target);

    // Assign the innerText of elem to the textArea
    target.value = elem.innerText;

    // Select the Value of textArea
    target.select();
    target.setSelectionRange(0, 99999999999);

    // Execute Copy Command in DOM for copying the selected text
    document.execCommand("copy");

    // After Copying the Selected Text then remove the hidden form Element.
    target.remove();
}