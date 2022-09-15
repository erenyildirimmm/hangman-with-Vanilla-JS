const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const popup_el = document.querySelector('.popup');
const popup_message = document.getElementById('success-message');
const note = document.getElementById('note');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message_el = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');


let selectedWord = getRandomWord();
const correctLetters = [];
const wrongLetters = [];

function getRandomWord() {
    let words = ["javascript","phyton","css","esnaf","marul","patates","Timsah","Cebelitarık","Ornitorenk","marsupilami","zehir","baklava","zengin","sumak","KAPLAN","dinazor","Gazoz","polis","asker"];

    const lower = words.map(element => {
        return element.toLowerCase();
      });
    return lower[Math.floor(Math.random() * words.length)];
}

function displayWord() {

    word_el.innerHTML= `
    ${selectedWord.split('').map(letter => `
    <div class="letter">
        ${correctLetters.includes(letter) ? letter: ''}
    </div> 
    `).join('')}
    `;

   const w = word_el.innerText.replace(/\n/g,'');
   if(w === selectedWord) {
    popup.style.display = 'flex';
    popup_el.style.backgroundColor = 'green';
    popup_message.innerText = 'Tebrikler Kazandınız';
    note.innerText = `${selectedWord}`;
   }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0 ? '<h3>Hatalı Harfler</h3>':''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    items.forEach((item, index)=> {
        const errorCount = wrongLetters.length;

        if(index<errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })

    if(wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        popup_el.style.backgroundColor = 'red';
        popup_message.innerText = 'Malesef Kaybettiniz';
        note.innerText = `${selectedWord}`;
    }
}

function displayMessage() {
    message_el.classList.add('show');

    setTimeout(function() {
        message_el.classList.remove('show');
    }, 3000)
}

playAgainBtn.addEventListener('click', function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
});

window.addEventListener('keydown', function(e) {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
})

displayWord();