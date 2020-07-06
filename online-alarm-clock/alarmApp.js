/*
Table below show the conversion between 12-hour clock system and 24-hour clock system.

12-hour clock system	24-hour clock system
    12:00 AM	               00:00
    01:00 AM	               01:00
    02:00 AM	               02:00
    03:00 AM	               03:00
    04:00 AM	               04:00
    05:00 AM	               05:00
    06:00 AM	               06:00
    07:00 AM	               07:00
    08:00 AM	               08:00
    09:00 AM	               09:00
    10:00 AM	               10:00
    11:00 AM	               11:00
    12:00 PM	               12:00
    01:00 PM	               13:00
    02:00 PM	               14:00
    03:00 PM	               15:00
    04:00 PM	               16:00
    05:00 PM	               17:00
    06:00 PM	               18:00
    07:00 PM	               19:00
    08:00 PM	               20:00
    09:00 PM	               21:00
    10:00 PM	               22:00
    11:00 PM	               23:00
*/
setInterval(() => {
    let time = document.getElementById('time');
    let date = document.getElementById('date');
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let ampm;

    if (hours == 0) {
        hours = hours + 12;
        ampm = "AM"
    }
    else if (hours < 12) {
        ampm = "AM"
    }
    else if (hours >= 12) {
        hours = hours - 12;
        ampm = "PM"
    }

    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    time.innerHTML = `${hours} : ${minutes} : ${seconds} ${ampm}`;
    date.innerHTML = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}, 1000);

let search_1 = document.getElementById('search-1');
let search_2 = document.getElementById('search-2');
let item_1 = Object.values(document.querySelectorAll('.items-1'));
let item_2 = Object.values(document.querySelectorAll('.items-2'));

setInterval(() => {
    search_1.focus();
    search_2.focus();
}, 1);

search_1.addEventListener('input', () => {
    let searchValue = new RegExp(search_1.value, "i");

    for (let i = 0; i < item_1.length; i++) {
        if (item_1[i].innerText.match(searchValue)) {
            item_1[i].style.display = "block";
            document.getElementById('massage-1').innerText = "";
            document.getElementById('massage-1').parentElement.style.width = "fit-content";
        }
        else {
            item_1[i].style.display = "none";
            let check = item_1.every((element) => {
                return element.style.display == "none";
            })
            if (check) {
                document.getElementById('massage-1').innerText = `No Results Match for "${search_1.value}"`
                document.getElementById('massage-1').parentElement.style.width = "max-content";
            }
        }
    }
});
search_2.addEventListener('input', () => {
    let searchValue = new RegExp(search_2.value, "i");

    for (let i = 0; i < item_2.length; i++) {
        if (item_2[i].innerText.match(searchValue)) {
            item_2[i].style.display = "block";
            document.getElementById('massage-2').innerText = "";
            document.getElementById('massage-2').parentElement.style.width = "fit-content";
        }
        else {
            item_2[i].style.display = "none";
            let check = item_2.every((element) => {
                return element.style.display == "none";
            })
            if (check) {
                document.getElementById('massage-2').innerText = `No Results Match for "${search_1.value}"`
                document.getElementById('massage-2').parentElement.style.width = "max-content";
            }
        }
    }
});


document.getElementById('dropdown-btn-1').addEventListener('click', (event) => {
    event.stopPropagation();

    let dropItems_1 = document.getElementById('dropDown-items-1');

    if (!dropItems_1.classList.contains("d-block")) {
        dropItems_1.classList.remove("d-none");
        dropItems_1.classList.add("d-block");
    }
    else {
        dropItems_1.classList.remove("d-block");
        dropItems_1.classList.add("d-none");
    }
});
document.getElementById('dropdown-btn-2').addEventListener('click', (event) => {
    event.stopPropagation();

    let dropItems_2 = document.getElementById('dropDown-items-2');

    if (!dropItems_2.classList.contains("d-block")) {
        dropItems_2.classList.remove("d-none");
        dropItems_2.classList.add("d-block");
    }
    else {
        dropItems_2.classList.remove("d-block");
        dropItems_2.classList.add("d-none");
    }
});

document.addEventListener('click', (event) => {
    if (event.target.id != "dropdown-1") {
        let allDropItems = Object.values(document.querySelectorAll('#dropDown-items-1 , #dropDown-items-1 *'));
        let dropItems_1 = document.getElementById('dropDown-items-1');
        let flag_1 = allDropItems.every((element) => {
            return event.target != element
        });

        if (flag_1) {
            dropItems_1.classList.add("d-none");
            dropItems_1.classList.remove("d-block");
        }
    }
    if (event.target.id != "dropdown-2") {
        let allDropItems = Object.values(document.querySelectorAll('#dropDown-items-2 , #dropDown-items-2 *'));
        let dropItems_2 = document.getElementById('dropDown-items-2');
        let flag_2 = allDropItems.every((element) => {
            return event.target != element
        });

        if (flag_2) {
            dropItems_2.classList.add("d-none");
            dropItems_2.classList.remove("d-block");
        }
    }
});

for (let i = 0; i < item_1.length; i++) {
    item_1[i].addEventListener('click', () => {
        for (let i = 0; i < item_1.length; i++) {
            item_1[i].classList.remove("bg-primary");
        }

        if (item_1[i].classList.contains("bg-primary")) {
            item_1[i].classList.add("bg-none");
            item_1[i].classList.remove("bg-primary");
        }
        else {
            item_1[i].classList.add("bg-primary");
            item_1[i].classList.remove("bg-none");
            setTimeout(() => {
                document.getElementById('btn-text-1').innerText = item_1[i].innerText;
                document.getElementById('dropDown-items-1').classList.add("d-none");
                document.getElementById('dropDown-items-1').classList.remove("d-block");
            }, 100)
        }
    })
}

for (let i = 0; i < item_2.length; i++) {
    item_2[i].addEventListener('click', () => {
        for (let i = 0; i < item_2.length; i++) {
            item_2[i].classList.remove("bg-primary");
        }

        if (item_2[i].classList.contains("bg-primary")) {
            item_2[i].classList.add("bg-none");
            item_2[i].classList.remove("bg-primary");
        }
        else {
            item_2[i].classList.add("bg-primary");
            item_2[i].classList.remove("bg-none");

            setTimeout(() => {
                document.getElementById('btn-text-2').innerText = item_2[i].innerText;
                document.getElementById('dropDown-items-2').classList.add("d-none");
                document.getElementById('dropDown-items-2').classList.remove("d-block");
            }, 100)
        }
    })
}

let playBtn = document.getElementById('play');
playBtn.addEventListener('click', (e) => {
    let audioSeletion = document.getElementById('audio');
    let audioName = audioSeletion.options[audioSeletion.selectedIndex].value;
    let audio = document.getElementById(audioName);

    if (audio.duration > 0 && !audio.paused) {
        playBtn.innerHTML = `<i class="mr-2 fas fa-play"></i> Play`;
        audio.pause();
    }
    else {
        playBtn.innerHTML = `<i class="mr-2 fas fa-pause"></i> Pause`;
        audio.play();
    }
});

function convertInSecond(hr, mn, sc) {
    return ((hr * 60 * 60) + (mn * 60) + sc);
}

function convertInHrMnSc(totalSeconds) {
    hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return (`${hours} : ${minutes} : ${seconds}`);
}

document.getElementById('setAlarm').addEventListener('click', (e) => {
    let hour = document.getElementById('btn-text-1').innerText;
    let minute = document.getElementById('btn-text-2').innerText;
    let timeNow = document.getElementById('time').innerText;
    let globalAlarmSec = convertInSecond(parseInt(hour.slice(0, 2)), parseInt(minute), 0);
    let globalNowSec = convertInSecond(parseInt(timeNow.slice(0, 2)), parseInt(timeNow.slice(5, 7)), parseInt(timeNow.slice(10, 12)));

    if (timeNow.includes("AM") && hour.includes("AM") && (globalNowSec < globalAlarmSec) && hour.slice(0, 2) != "12") {
        console.log("1");
        let alarmSec = convertInSecond(parseInt(hour.slice(0, 2)), parseInt(minute), -2);
        let nowSec = convertInSecond(parseInt(timeNow.slice(0, 2)), parseInt(timeNow.slice(5, 7)), parseInt(timeNow.slice(10, 12)));
        let time
            = alarmSec - nowSec;
        timeLeft(time);
    }
    else if (((timeNow.includes("AM") && hour.includes("AM")) && (globalNowSec > globalAlarmSec)) || (hour.slice(0, 2) == "12" && hour.includes("AM") && timeNow.includes("AM"))) {
        let hr;
        console.log("2");
        if (hour.slice(0, 2) == "12") {
            hr = 0;
        }
        else {
            hr = parseInt(hour.slice(0, 2));
        }
        let alarmSec = convertInSecond((hr + 24), parseInt(minute), -2);
        let nowSec = convertInSecond(parseInt(timeNow.slice(0, 2)), parseInt(timeNow.slice(5, 7)), parseInt(timeNow.slice(10, 12)));
        let time = alarmSec - nowSec;
        timeLeft(time);
    }
    else if (timeNow.includes("PM") && hour.includes("PM") && (globalNowSec < globalAlarmSec) && hour.slice(0, 2) != "12") {
        console.log("3");
        let alarmSec = convertInSecond(parseInt(hour.slice(0, 2)), parseInt(minute), -2);
        let nowSec = convertInSecond(parseInt(timeNow.slice(0, 2)), parseInt(timeNow.slice(5, 7)), parseInt(timeNow.slice(10, 12)));
        let time = alarmSec - nowSec;
        timeLeft(time);
    }
    else if (((timeNow.includes("PM") && hour.includes("PM")) && (globalNowSec > globalAlarmSec)) || (hour.slice(0, 2) == "12" && hour.includes("PM") && timeNow.includes("PM"))) {
        console.log("4");
        let hr;
        if (hour.slice(0, 2) == "12") {
            hr = 0;
        }
        else {
            hr = parseInt(hour.slice(0, 2));
        }
        let alarmSec = convertInSecond((hr + 24), parseInt(minute), -2);
        let nowSec = convertInSecond(parseInt(timeNow.slice(0, 2)), parseInt(timeNow.slice(5, 7)), parseInt(timeNow.slice(10, 12)));
        let time = alarmSec - nowSec;
        timeLeft(time);
    }
    else if ((timeNow.includes("PM") && hour.includes("AM")) || (hour.slice(0, 2) == "12" && hour.includes("AM"))) {
        5
        console.log("5");
        let hr;
        if (hour.slice(0, 2) == "12") {
            hr = 0;
        }
        else {
            hr = parseInt(hour.slice(0, 2));
        }
        let alarmSec = convertInSecond((hr + 12), parseInt(minute), -2);
        let nowSec = convertInSecond(parseInt(timeNow.slice(0, 2)), parseInt(timeNow.slice(5, 7)), parseInt(timeNow.slice(10, 12)));
        let time = alarmSec - nowSec;
        timeLeft(time);
    }
    else if ((timeNow.includes("AM") && hour.includes("PM")) || (hour.slice(0, 2) == "12" && hour.includes("PM"))) {
        console.log("6");
        let hr;
        if (hour.slice(0, 2) == "12") {
            hr = 0;
        }
        else {
            hr = parseInt(hour.slice(0, 2));
        }
        let alarmSec = convertInSecond((hr + 12), parseInt(minute), -2);
        let nowSec = convertInSecond(parseInt(timeNow.slice(0, 2)), parseInt(timeNow.slice(5, 7)), parseInt(timeNow.slice(10, 12)));
        let time = alarmSec - nowSec;
        timeLeft(time);
    }
});

function timeLeft(time) {
    let append = document.getElementById('append');
    let audioSeletion = document.getElementById('audio');
    let audioName = audioSeletion.options[audioSeletion.selectedIndex].value;
    let audio = document.getElementById(audioName);
    let playBtn = document.getElementById('play');
    let dropBtn_1 = document.getElementById('dropdown-btn-1');
    let dropBtn_2 = document.getElementById('dropdown-btn-2');
    audioSeletion.disabled = true;
    playBtn.disabled = true;
    dropBtn_1.disabled = true;
    dropBtn_2.disabled = true;

    let interval = setInterval(() => {
        let html = convertInHrMnSc(time);
        append.innerHTML = "<p style='font-size:larger' class='my-3'>Remaiming Time</p><h1 style='font-size:60px' class='mt-4'>" + html + "</h1>";
        if (time == 0) {
            clearInterval(interval);
            audio.currentTime = 0
            audio.play();
        }
        time--;
    }, 1000);

    setTimeout(() => {
        document.getElementById('setAlarm').style.display = "none";
        document.getElementById('stopAlarm').style.display = "inline-block";

        document.getElementById('stopAlarm').addEventListener('click', () => {
            clearInterval(interval);
            append.innerHTML = "";
            audio.pause();
            audioSeletion.disabled = false;
            playBtn.disabled = false;
            dropBtn_1.disabled = false;
            dropBtn_2.disabled = false;
            document.getElementById('setAlarm').style.display = "inline-block";
            document.getElementById('stopAlarm').style.display = "none";
        });
    }, 1000);
}