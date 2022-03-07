// creazione griglia
const gridElement = document.getElementById("grid");
let difficulty = document.getElementById("difficulty")
let buttonplay = document.getElementById("btnplay")
let points = 0;

buttonplay.addEventListener("click", function(){

    const createGridSquare = () => {
        const currentElement = document.createElement("div");
        
        if(difficulty.value == "facile"){
            currentElement.classList.add("square-element-big");
        }
        else if(difficulty.value == "intermedio"){
            currentElement.classList.add("square-element-medium");
        }
        else{
            currentElement.classList.add("square-element-small");
        }
        
    
        return currentElement
    }
    
    if(difficulty.value == "facile"){
        matchDifficulty = 100;
    }
    else if(difficulty.value == "intermedio"){
        matchDifficulty = 81;
    }
    else{
        matchDifficulty = 49;
    }

    const bombs = generateBomb(16, matchDifficulty);
    console.log(bombs);

    for (let i = 1; i <= matchDifficulty ; i++){
        // creazione singolo quadrato
        const currentSquare = createGridSquare();
        currentSquare.innerHTML = [i];
        currentSquare.addEventListener("click", function(){
            if ( !bombs.includes(i)){
                console.log(this);
                this.classList.toggle("active");
                points++;
                pointsUpdater("points", `Il tuo punteggio è: ${points}`);
            }
            else{
                console.log(this);
                this.classList.toggle("active-bomb");
                points++;
                pointsUpdater("points", `Mi dispiace hai perso, il tuo punteggio è: ${points}`);
            }
        })
    
        //viene aggiunto al suo parent
        gridElement.appendChild(currentSquare);
    
    }
})


function randomInteger(min, max){
    if (isNaN(parseInt(min)) || isNaN(parseInt(max))){
        console.error("randomInteger(min, max) needs two numbers as argument");
    }
    return (Math.floor(Math.random() * ((max + 1) - min) + min));
}

function generateUniqueNumber(numBlackList, min, max){
    let check = false;
    let randomInt;

    while ( !check){
        randomInt = Math.floor(Math.random() * ((max + 1) - min) + min);

        if ( !numBlackList.includes(randomInt)){
            check = true;
        }
    }
    return randomInt;
}

function generateBomb(bombs, cellNumber){
    const bombList = [];

    for(i = 0;i < bombs; i++){
        bombList.push(generateUniqueNumber(bombList, 1, cellNumber));
    }
    return bombList;
}

function pointsUpdater(elementId, stringToWrite){
    document.getElementById(elementId).innerHTML = stringToWrite;
}