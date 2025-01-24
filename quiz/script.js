let form = document.querySelector(".form");
let submit = document.querySelector(".submit");
let next = document.querySelector(".footer .bt");
let currentIndex = 0;
let quizData = [];
let crans = 0;
let wrans = 0;
submit.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.querySelector(".cat input").value;
    // let name = document.querySelector(".cat input").value;
    console.log(name);
    if (name.trim() === "") {
        alert("Please Enter Your Name");
    } else {
        (async function () {
            function aa() {
                setTimeout(() => {
                    document.querySelector("#gret").innerHTML = `${name}`;
                    document.querySelector(".container").style.display = "none";
                    document.querySelector(".greet").style.display = "flex";
            

                }, 600);

                setTimeout(() => {
                    letp1 = document.querySelector("#p1").style.transform = " translateX(0vw)";
                    letp1 = document.querySelector("#gret").style.transform = " translateX(0vw)";
                    letp1 = document.querySelector("#p3").style.transform = " translateX(0vw)";
                }, 640)
                setTimeout(() => {
                    letp1 = document.querySelector("#p1").style.transform = " translateX(-100vw)";
                    letp1 = document.querySelector("#gret").style.transform = " translateX(100vw)";
                    letp1 = document.querySelector("#p3").style.transform = " translateX(-100vw)";
                }, 2800)
                setTimeout(() => {

                    document.querySelector(".greet").style.display = "none";
                    document.querySelector(".container").style.display = "flex";
                }, 3800);
            }
            aa();
            setTimeout(() => {
                document.querySelector(".upper-blue").style.transform = " translateY(0vw)"
                document.querySelector(".main-questions").style.top = "55%"
                document.querySelector(".footer .bt").style.transform = " translateX(0vw)"
                document.querySelector(".ress").style.transform = " translateX(0vw)"
            }, 4000)
        })();


        let categorySelect = document.getElementById("category");
        let category = categorySelect.value;
        let categoryText = categorySelect.options[categorySelect.selectedIndex].textContent;
        console.log(category);
        console.log(categoryText);

        let difficultySelect = document.getElementById("difficulty");
        let difficulty = difficultySelect.value;
        let difficultyText = difficultySelect.options[difficultySelect.selectedIndex].textContent;
        console.log(difficulty);
        console.log(difficultyText);

        let type = document.getElementById("type").value;
        console.log(type);

        let questions = document.getElementById("questions").value;
        console.log(questions);

        getdata(category, difficulty, type, questions);
        form.classList.add("disnone");

        let upper = document.querySelector(".upper-blue-down");
        upper.innerHTML = ` <div class="disp1">
                    <p><span style="color:#f2ff00bc">Category :</span> ${categoryText}</p>
                    <p><span style="color: #f2ff00bc;">Difficulty : </span>${difficultyText}</p>
                </div>
                <div class="disp2">
                    <p><span style="color: rgb(44, 246, 29);">Correct : </span>${crans}</p>
                    <p><span style="color: rgb(134, 33, 33);">Wrong &nbsp: </span>${wrans}
                    </p>
                </div>`;
    }
});


const getdata = async (category, difficulty, type, questions) => {
    let url = `https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}&type=${type}`;
    let response = await fetch(url);
    let data = await response.json();
    
    if (data.results.length === 0) {
        let categorySelect = document.getElementById("category");
        let categoryText = categorySelect.options[categorySelect.selectedIndex].textContent;
        if (confirm(`${questions} Questions are not available in ${categoryText}. Click ok to restart`)) {
            location.reload();
        }
    } else {
        quizData = data.results;
        currentIndex = 0;
        showdata();
    }
};


const showdata = () => {
    if (currentIndex < quizData.length) {
        let questionContainer = document.createElement("div");
        questionContainer.classList.add("question")
        let optionsContainer = document.querySelector(".qa");
        let currentQuestion = quizData[currentIndex].question;
        let correctAnswer = decodeHtmlEntities(quizData[currentIndex].correct_answer);
        let incorrectAnswers = quizData[currentIndex].incorrect_answers;

        // Combine correct and incorrect answers and shuffle them
        let allAnswers = [...incorrectAnswers, correctAnswer];
        allAnswers.sort(() => Math.random() - 0.5);








        let qno = document.querySelector(".qno");
        qno.textContent = `Q  ${currentIndex + 1}`;
        // Update question text
        questionContainer.textContent = decodeHtmlEntities(currentQuestion);
        optionsContainer.appendChild(questionContainer);
        let ull = document.querySelector(".qnns");
        ull.innerHTML = ull.innerHTML + `  <ul id="index-${currentIndex}">
                <p class="q"><span style="color: yellow;">Q${currentIndex + 1} .</span> ${decodeHtmlEntities(currentQuestion)}</p></ul>`
        // Clear previous options
        // optionsContainer.innerHTML = '';
        // Add new options
        allAnswers.forEach(answer => {
            let button = document.createElement("button");
            button.classList.add("options-btn");
            button.textContent = decodeHtmlEntities(answer);
            let li = document.createElement("li");
            li.innerText = decodeHtmlEntities(answer);
            if (li.innerText == correctAnswer) {
                li.classList.add("cr");
                document.querySelector(`#index-${currentIndex}`).appendChild(li);
            }
            else {
                document.querySelector(`#index-${currentIndex}`).appendChild(li);
            }

            optionsContainer.appendChild(button);
            button.addEventListener("click", () => {
                let chooseanswer = button.textContent;
                checkcorrectanswer(chooseanswer, correctAnswer);
                disableAllButtons();
            })

        }

        );
    } else {
        console.log("No more questions.");
        analysis();


    };
}

next.addEventListener("click", () => {
    let optionsContainer = document.querySelector(".qa");
    optionsContainer.innerHTML = ''
    currentIndex++;
    showdata();
   
    document.querySelector(".logo").innerHTML = `  <img src="img/excited.png" alt="" width="50px">
    <h1>QUIZ <span class="gradient-text">-</span> <span style="color: #f2ff00f1;"> GAME</span></h1>
    <img src="img/optimist.png" alt="" width="50px">`
});
const checkcorrectanswer = (chooseanswer, correctAnswer) => {
    let buttons = document.querySelectorAll(".options-btn");
    buttons.forEach(button => {
        if (button.textContent === chooseanswer) {
            if (chooseanswer === correctAnswer) {
                button.style.backgroundColor = "rgb(12, 252, 12)";
                button.style.border = "3px solid #023c3c";
                button.style.transform = "scale(1.03)";
                crans++;
                document.querySelector(".logo").innerHTML = `  <img src="img/boyyes.png" alt="" width="50px">
                <h1>QUIZ <span class="gradient-text">-</span> <span style="color: #f2ff00f1;"> GAME</span></h1>
                <img src="img/yes (1).png" alt="" width="50px">`             // Increment correct answers
            } else {
                button.classList.add("incorrect");
                button.style.border = "3px solid #3e0101";

                wrans++;
                document.querySelector(".logo").innerHTML = `  <img src="img/boyshocked.png" alt="" width="50px">
                <h1>QUIZ <span class="gradient-text">-</span> <span style="color: #f2ff00f1;"> GAME</span></h1>
                <img src="img/shocked.png" alt="" width="50px">`
                buttons.forEach(buttonn => {
                    if (buttonn.textContent === correctAnswer) {
                        buttonn.style.backgroundColor = "rgb(12, 252, 12)";
                        buttonn.style.border = "3px solid #023c3c";
                        buttonn.style.transform = "scale(1.03)";
                    }
                }) // Increment wrong answers
            }
        }
    });

    // Update the disp2 element
    let disp2 = document.querySelector(".disp2");
    if (disp2) {
        disp2.innerHTML = `
            <p><span style="color: rgb(44, 246, 29);">Correct : </span>${crans}</p>
            <p><span style="color: rgb(134, 33, 33);">Wrong &nbsp: </span>${wrans}</p>
        `;
    }
};
const disableAllButtons = () => {
    let buttons = document.querySelectorAll(".options-btn");
    buttons.forEach(button => {
        button.disabled = true;
    });
};
const analysis = () => {
    document.querySelector(".upper-blue").style.transform = " translateY(-20vh)"
    document.querySelector(".main-questions").style.top = "155%"
    document.querySelector(".footer .bt").style.transform = " translateX(100vw)"
    document.querySelector(".ress").style.transform = " translateX(-100vw)"
    // document.querySelector(".container").style.left = "-100vw";
    document.querySelector(".result").style.left = "0%";
    setTimeout(() => {
        celebrate();
        document.querySelector(".b").style.transform = " translateY(0vw)";
        document.querySelector(".crtqns").style.transform = " translateY(0vw)";
        document.querySelector(".resett button").style.transform = " translateY(0vw)";
    }, 1000)
}

const celebrate = () => {
    let questions = document.getElementById("questions").value;
    console.log(questions);
    let up = document.querySelector(".messege");
    let skip = questions - (crans + wrans);
    let percentage = (crans / questions) * 100
    console.log(skip);
    console.log(percentage)
    let name = document.querySelector(".cat input").value;
    if (percentage >= 70) {
        document.querySelector(".b h2").style.color = "rgb(44, 246, 29)";
        up.innerHTML = `<span style="color: rgb(44, 246, 29);"> Fantastic </span> Job, <span style="color: rgb(44, 246, 29);font-size: 1.3rem;">${name}!</span> You've aced this quiz with a high score! You got
        <span style="color: rgb(44, 246, 29);"> ${crans} Correct </span> out of <span style="color: rgb(44, 246, 29);"> ${questions} Questions. </span> Only <span style="color: rgb(44, 246, 29);"> ${wrans}  Wrong </span> and <span style="color: rgb(44, 246, 29);">${skip}
         Skipped.</span>  Your knowledge is <span style="color: rgb(44, 246, 29);">impressive.</span>`;

    }
    else if (percentage >= 40 && percentage < 70) {
        document.querySelector(".b h2").style.color = "rgb(212, 255, 0)";
        document.querySelector(".b h2").innerText = "Average Performance";
        up.innerHTML = `<span style="color: rgb(212, 255, 0);"> Good </span> Effort, <span style="color: rgb(212, 255, 0);font-size: 1.3rem;">${name}!</span>Nice work! You got  <span style="color: rgb(212, 255, 0);"> ${crans} Correct </span> out of <span style="color: rgb(212, 255, 0);"> ${questions} Questions. </span> There were <span style="color: rgb(212, 255, 0);"> ${wrans}  Wrong </span> and  <span style="color: rgb(212, 255, 0);">${skip} Skipped. </span> With a bit more practice, you'll be scoring even higher. Keep learning and <span style="color: rgb(212, 255, 0);">improving!</span>`;

    }
    else {
        document.querySelector(".b h2").innerText = "Below Average Performance"
        document.querySelector(".b h2").style.color = "rgb(210, 36, 36)";
        up.innerHTML = `Room for <span style="color: rgb(210, 36, 36);">Improvement, ${name}! </span> Your score shows <span style="color: rgb(210, 36, 36);"> ${crans} Correct </span> answers out of <span style="color: rgb(210, 36, 36);"> ${questions} Questions. </span> There were <span style="color: rgb(210, 36, 36);"> ${wrans}  Wrong </span> and <span style="color: rgb(210, 36, 36);">${skip} Skipped. </span> Embrace the challenge and keep striving to improve. Every step forward is <span style="color: rgb(210, 36, 36);">progress!</span>`;

    }
}
document.querySelector(".resett").addEventListener("click", () => {
    location.reload();
})
// 
// "
document.querySelector(".ress").addEventListener("click", () => {
    location.reload();
})












// if (window.innerWidth < 600) {
//     let cat = document.querySelector(".cat1");
//     cat.innerHTML = `<img src="img/quiz.png" width="50px">
//                     <h1>QUIZ - GAME</h1>`
// }






const decodeHtmlEntities = (str) => { const parser = new DOMParser(); const dom = parser.parseFromString(`<!doctype html><body>${str}`, 'text/html'); return dom.body.textContent; };