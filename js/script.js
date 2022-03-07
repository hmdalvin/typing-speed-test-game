const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    tryAgainBtn = document.querySelector("button")


let timer,
    maxtime = 60,
    timeLeft = maxtime,
    charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    // get random text
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // getting random item from the paragraphs
    // of it, adding each inside span and then adding this span inside p tag
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    })
    typingText.querySelectorAll("span")[0].classList.add("active");
    // focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) { // once timer is start, it won't restart
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        // if user hasn't entered any character or pressed backspace
        if (typedChar == null) {
            charIndex--; //decrement charIndex
            // decrement mistakes only if the charIndex span contains incorrect class
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if (characters[charIndex].innerText === typedChar) {
                // if user typed character and shown character matched then add the
                // correct class else increment the mistakes and add the incorrect class
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        // increment charIndex either user typed correct or incorrect character
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxtime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes; // cpm will not count mistakes   
    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    // if timeleft is greater than 0 them decrement the timeleft else clear timer
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    // callling load paragraph function and
    // resetting each variables and elements value to default
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxtime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);