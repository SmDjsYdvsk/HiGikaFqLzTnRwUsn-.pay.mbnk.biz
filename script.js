function displayPurchaseInfo() {
    let purchaseDate = localStorage.getItem('purchaseDate');

    if (!purchaseDate) {
        const now = new Date();
        localStorage.setItem('purchaseDate', now.toISOString());
        purchaseDate = now.toISOString();
    }

    const formattedDate = new Date(purchaseDate).toLocaleString('uk-UA', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    document.getElementById('purchase-info').textContent = `Придбано ${formattedDate}`;
}



function incrementTicketNumber() {
    let ticketNumber = localStorage.getItem('ticketNumber');
    if (!ticketNumber) {
        ticketNumber = Math.floor(Math.random() * (500000- 186542+ 1)) + 186542;
    }
    localStorage.setItem('ticketNumber', ticketNumber);
    const formattedNumber = Number(ticketNumber).toLocaleString('uk-UA');
    document.getElementById('ticket-number').textContent = formattedNumber;
}


function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    let WRAPPER = document.querySelector("#timer-wrapper");
    let PROGRESS = document.querySelector("#ring-progress");
    
    const interval = setInterval(function () {
        hours = Math.floor(timer / 3600);
        minutes = Math.floor((timer % 3600) / 60);
        seconds = timer % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if (hours > 0) {
            display.textContent = hours + ":" + minutes + ":" + seconds;
        } else {
            display.textContent = minutes + ":" + seconds;
        }

        if (timer >= 3600) {
            WRAPPER.style.cssText = "--background-timer: linear-gradient(91deg, rgba(172, 218, 189, 0.50) 0%, rgba(170, 212, 248, 0.50) 100%); --ring-color: #17954D; --progress-color: #ACDABD;"
        } else if (timer >= 1800) {
            WRAPPER.style.cssText = "--background-timer: linear-gradient(91deg, rgba(236, 200, 160, 0.50) 0%, rgba(236, 211, 160, 0.50) 100%); --ring-color: #D68117; --progress-color: #ECC8A0;"
            PROGRESS.style.cssText = `stroke-dashoffset: ${minutes*7};`
        } else {
            WRAPPER.style.cssText = "--background-timer: linear-gradient(91deg, rgba(247, 192, 190, 0.50) 0%, rgba(237, 193, 224, 0.50) 100%); --ring-color: #C63231; --progress-color: #F7C0BE;"
            PROGRESS.style.cssText = `stroke-dashoffset: ${minutes*7};`
        }      
        
        if (--timer < 0) {
            clearInterval(interval);
            document.getElementById("timer-wrapper").innerHTML = " ☠️  Квиток недійсний ";
        }



    }, 1000);
}


function calculateAndDisplay(){
    displayPurchaseInfo();
    incrementTicketNumber();
    const elem1 = document.querySelector('.secure-wrapper');
    const elem2 = document.querySelector('.secure-block');
    let colorNumber = Number(localStorage.getItem('colorNumber'));
    if (isNaN(colorNumber) || colorNumber >= 5) {
        colorNumber = 0;
    }
    switch(colorNumber){
        case 0:
            elem1.style.backgroundColor = "rgba(74, 91, 184, 0.1)";
            elem2.style.color = "rgba(74, 91, 184, 1)";
            break;   
        case 1:
            elem1.style.backgroundColor = "rgba(139, 65, 154, 0.1)";
            elem2.style.color = "rgba(139, 65, 154, 1)";
            break;
        case 2:
            elem1.style.backgroundColor = "rgba(11, 106, 153, 0.1)";
            elem2.style.color = "rgba(11, 106, 153, 1)";
            break;
        case 3:
            elem1.style.backgroundColor = "rgba(13, 104, 98, 0.1)";
            elem2.style.color = "rgba(13, 104, 98, 1)";
            break;
        case 4:
            elem1.style.backgroundColor = "rgba(11, 106, 153, 0.1)";
            elem2.style.color = "rgba(11, 106, 153, 1)";
            break;        
    }
    
    let display = document.querySelector('#timer');
    let durationInSeconds = 60 * 90;

    let storedEndTime = localStorage.getItem('ticketEndTime');
    let now = Date.now();

    let timeLeft;

    if (!storedEndTime) {
        let endTime = now + durationInSeconds * 1000;
        localStorage.setItem('ticketEndTime', endTime);
        timeLeft = durationInSeconds;


        let nowISO = new Date().toISOString();
        localStorage.setItem('purchaseDate', nowISO);
    } else {
        let endTime = parseInt(storedEndTime, 10);
        timeLeft = Math.floor((endTime - now) / 1000);
        if (timeLeft <= 0) {
            timeLeft = 0;
        }
    }
    startTimer(timeLeft, display);
    setTimeout(function() {
    document.getElementById("load").remove();
    }, 1000);

}

window.onload = function () {
    
    calculateAndDisplay();

    document.addEventListener('click', function (e) {

    if (e.target.closest('#instruction-btn')) {
        document.body.insertAdjacentHTML('beforeend', `<div class = "loader-container" id = "load"> <div class="loader"></div></div>`);
        document.querySelectorAll(".restart, .ticket-wrapper, .instruction-btn, .reopen-message, .changeColor").forEach(el => el.style.display = "none");
        document.querySelector(".details").style.display = "block";
        setTimeout(() => document.getElementById("load")?.remove(), 1000);
    }

    if (e.target.closest('#back-button')) {
        document.body.insertAdjacentHTML('beforeend', `<div class = "loader-container" id = "load"> <div class="loader"></div></div>`);
        document.querySelectorAll(".restart, .ticket-wrapper, .instruction-btn, .reopen-message, .changeColor").forEach(el => el.style.display = "block");
        document.querySelector(".details").style.display = "none";
        setTimeout(() => document.getElementById("load")?.remove(), 1000);
    }
    });

    document.addEventListener('dblclick', function (e) {
        if (e.target.closest('#restart')) {
            if (confirm("?")) {
                localStorage.removeItem('ticketNumber');
                localStorage.removeItem('purchaseDate');
                localStorage.removeItem('ticketEndTime');
                location.reload();
            }
        }
        if (e.target.closest('#changeColor')) {
            const elem1 = document.querySelector('.secure-wrapper');
            const elem2 = document.querySelector('.secure-block');
            let colorNumber = Number(localStorage.getItem('colorNumber'));
            if (isNaN(colorNumber) || colorNumber >= 4) {
                colorNumber = 0;
            }
            else{
                colorNumber++;
            }
            switch(colorNumber){
                case 0:
                    elem1.style.backgroundColor = "rgba(74, 91, 184, 0.1)";
                    elem2.style.color = "rgba(74, 91, 184, 1)";
                    break;   
                case 1:
                    elem1.style.backgroundColor = "rgba(139, 65, 154, 0.1)";
                    elem2.style.color = "rgba(139, 65, 154, 1)";
                    break;
                case 2:
                    elem1.style.backgroundColor = "rgba(11, 106, 153, 0.1)";
                    elem2.style.color = "rgba(11, 106, 153, 1)";
                    break;
                case 3:
                    elem1.style.backgroundColor = "rgba(13, 104, 98, 0.1)";
                    elem2.style.color = "rgba(13, 104, 98, 1)";
                    break;
                case 4:
                    elem1.style.backgroundColor = "rgba(11, 106, 153, 0.1)";
                    elem2.style.color = "rgba(11, 106, 153, 1)";
                    break;        
            }
            localStorage.setItem('colorNumber', colorNumber);
        }
    });

};
