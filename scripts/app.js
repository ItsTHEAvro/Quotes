const QUOTEBTN = document.querySelector(".get-quote");
const COPYBTN = document.querySelector(".copy-quote");

function Clipboard_CopyTo(quote, author) {
    var tempInput = document.createElement("input");
    tempInput.value = `${quote} ${author}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

COPYBTN.onclick = function() {
    Clipboard_CopyTo(document.querySelector(".quote").innerText, document.querySelector(".author").innerText);
}

QUOTEBTN.addEventListener("click", getQuote);

function getQuote() {
    fetch('scripts/quotes.json')
        .then(response => response.json())
        .then(data => {
            let randomNum = randomNumber();
            let quote = data[randomNum].quote;
            let author = data[randomNum].author;
            document.querySelector(".quote").innerText = quote;
            document.querySelector(".author").innerText = `- ${author}`;
            COPYBTN.addEventListener("click", Clipboard_CopyTo(document.querySelector(".quote").innerText, document.querySelector(".author").innerText));

            function Clipboard_CopyTo(quote, author) {
                var tempInput = document.createElement("input");
                tempInput.value = `${quote} - ${author}`;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
            }

        });
}

function randomNumber() {
    return Math.floor(Math.random() * 102);
}