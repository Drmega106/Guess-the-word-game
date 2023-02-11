let lettersaz = "abcdefghigklmnopqrstuvwxyz";
let letters = Array.from(lettersaz);
let lettersbox = document.querySelector('.letters');

letters.forEach(function (letter) {
    let letterbox = document.createElement('span');
    letterbox.className = "letter-box";
    let letterval = document.createTextNode(letter.toUpperCase());
    letterbox.appendChild(letterval);
    lettersbox.appendChild(letterbox);
}
);


const words = {
    animals : ['dog', 'cat','elephant', 'monkey' , 'rabbit', 'chicken'],
    colors : ['red', 'blue', 'black', 'green', 'yellow' ,'pink'],
    fruits : ['apple', 'banana', 'pineable', 'strawberry', 'orange'],
}

let allkeys = Object.keys(words);
let randomkey = Math.floor(Math.random() * allkeys.length );
let category = allkeys[randomkey];
let categorywords = words[category];
let randomwordindex = Math.floor(Math.random() * categorywords.length);
let randomword = categorywords[randomwordindex];

let categoryspan = document.querySelector('.info span');
categoryspan.innerHTML = categoryspan.innerHTML + " : " + category;

let wordarray = Array.from(randomword);

wordarray.forEach(function (ele) {
    let elespan = document.createElement("span");
    let spancont = document.createTextNode(" ");
    let wordletters = document.querySelector(".wordletters");
    elespan.appendChild(spancont);
    wordletters.appendChild(elespan);
});
let guessspans = document.querySelectorAll(".wordletters span");
let thedraw = document.querySelector('draw')
let wrong = 0;
let win = guessspans.length;



document.addEventListener("click", function(e) {
    let status = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
       let clickedletter = e.target.innerHTML.toLowerCase();

       wordarray.forEach((wordletter, letterindex) => {
        if (clickedletter === wordletter) {
            status = true ;
            guessspans.forEach(function (span, spanindex) {
                if (spanindex == letterindex) {
                    span.innerHTML = clickedletter;
                }
            });
            
        };
       }); 
       if (status !== true) {
        wrong++;
        let thedraw =document.getElementById("draw");
        thedraw.classList.add(`wrong-${wrong}`)
        document.getElementById("fail").play();
        } else {
            let win = guessspans.length;
            document.getElementById('success').play();
            guessspans.forEach(function (span, spanindex) {
                if (span.innerHTML == " ") {
                    return false
                } else {
                    win--;
                    if (win === 0) {
                        youwin();
                        let div = document.getElementById('letters');
                        div.classList.add('finished');
                    }
                }
            });
        }
    }
    if (wrong === 5) {
        gameover();
        let div = document.getElementById('letters');
        div.classList.add('finished');
    }

    
});

function gameover () {
    document.getElementById('over').play();
    let enddiv = document.getElementById("end");
    enddiv.classList.remove('end');
    enddiv.classList.add("endactive");
    document.getElementById('correctword').innerHTML = randomword;

};


function youwin () {
    let enddivwin = document.getElementById("endwin");
    enddivwin.classList.remove('endwin');
    enddivwin.classList.add("endwinactive");
}
