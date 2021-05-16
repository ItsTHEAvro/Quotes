const QUOTEBTN = document.querySelector(".get-quote");
const COPYBTN = document.querySelector(".copy-quote");
const QUOTE = document.querySelector(".quote");
const AUTHOR = document.querySelector(".author");

let quotes = [];

const TOAST = {
    init() {
        this.hideTimeout = null;
        this.el = document.createElement("div");
        this.className = "toast toast--visible";
        document.body.appendChild(this.el);
    },

    show() {
        clearTimeout(this.hideTimeout);
        this.el.innerText = "Copied!"
        this.el.className = "toast toast--visible"
        this.hideTimeout = setTimeout(() => {
            this.el.classList.remove('toast--visible');
        }, 2800);
    }
};

document.addEventListener('DOMContentLoaded', () => TOAST.init());

function Clipboard_CopyTo(quote, author) {
    let tempInput = document.createElement("input");
    tempInput.value = `${quote} - ${author}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    TOAST.show();
}

COPYBTN.onclick = function() {
    Clipboard_CopyTo(document.querySelector(".quote").innerText, document.querySelector(".author").innerText);
}

QUOTEBTN.addEventListener("click", getQuote);

async function getQuote() {
    response = await fetch("scripts/quotes.json");
    quotes = await response.json();
    randomNum = randomNumber();
    QUOTE.innerText = quotes[randomNum].quote;
    AUTHOR.innerText = quotes[randomNum].author;
}

function randomNumber() {
    return Math.floor(Math.random() * 102);
}

getQuote();