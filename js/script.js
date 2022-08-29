const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
checkBtn = document.querySelector(".btn-one"),
nextBtn = document.querySelector(".btn-two");

let correctWord, timer;

const initTimer = maxTime => {
   clearInterval(timer);
   timer = setInterval(() => {
      if(maxTime > 0) {
         maxTime--;
         return timeText.innerHTML = maxTime;
      }
      clearInterval(timer);
      alert(`Time up! ${correctWord.toUpperCase()} was the correct word`);
      initGame();
   }, 1000)
}

const initGame = () => {
   initTimer(30);
   let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random objects from words
   let wordArray = randomObj.word.split("");
   for(let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
   }
   wordText.innerHTML = wordArray.join(""); // passing shuffled word as word text
   hintText.innerHTML = randomObj.hint; //passing corresponding object hint as hint text
   correctWord = randomObj.word.toLowerCase();
   inputField.value = "";
   inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

const checkWord = () => {
   let userWord = inputField.value.toLocaleLowerCase();
   if(!userWord) return alert("Please enter a word");
   if(userWord !== correctWord) return alert(`Ughhh!!! ${userWord} is not a correct word`), inputField.value = "";
   alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
   initGame();
}

checkBtn.addEventListener("click", checkWord);
nextBtn.addEventListener("click", initGame);
