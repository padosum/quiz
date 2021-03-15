let questionNumber = 0;
let score = 0; 

let allQuestions
let answer

let checkAnswer = () => {
    let choiceValue = document.getElementsByName('choices')
    let isChecked = false

    if(questionNumber > 0) {
        let correctAnswer = allQuestions[questionNumber - 1].correctAnswer
        
        // check correct answer
        for(let j=0; j < choiceValue.length; j++) {
            if(choiceValue[j].checked) {
                isChecked = true
                if(j === correctAnswer) score++
            }
        }
    } else {
        isChecked = true
    }

    return isChecked
}

const loadQuestion = (isPrev) => {

    let question = document.getElementById("question")
    const choicesDiv = document.getElementById("choices")

    if(!checkAnswer() && !isPrev) {
        alert('답을 선택하세요!')
    } else {
        if(questionNumber >= 1 && !isPrev) {
            answer[questionNumber - 1] = document.querySelector('input[name="choices"]:checked').value
        }
        $('.flex-container').fadeOut(1000, function() {
            $('.flex-container').fadeIn(2000)
            if(questionNumber <= allQuestions.length - 1) {

                question.innerHTML = `Q. ${allQuestions[questionNumber].question}`
                const choices = allQuestions[questionNumber].choices
                let radio = ""
                for (let i=0; i < choices.length; i++) {
                    let id = `answer${i}`
                    let choiceVal = choices[i]
                    let isPreAnswer = answer[questionNumber] == id ? 'checked' : ''
                    radio += `<input type='radio' id='${id}' name='choices' value='${id}' ${isPreAnswer}>`
                    radio += `<label for='${id}'>${choiceVal}</label><br>` 
                }
                choicesDiv.innerHTML = radio
                ++questionNumber
    
                if(questionNumber == 0) {
                    document.getElementById('prev').style.display = "none"
                }
                
            } else {
                choicesDiv.innerHTML = ""
                question.innerHTML = "최종 점수"
                question.style.textAlign = "center"
                
                const scorePara = document.createElement('p')
                scorePara.style.textAlign = "center"
                scorePara.innerText = `${score} (${score} / ${questionNumber})`
                document.getElementById('quiz').appendChild(scorePara)
                document.getElementById('next').style.display = "none"
                document.getElementById('prev').style.display = "none"
            }
            setButton()
        })
        
    }
    setButton()
}

const setButton = () => {
    document.getElementById("prev").style.visibility = questionNumber > 1 ? "visible" : "hidden"
}

const loadPrevQuestion = () => {
    questionNumber = questionNumber - 2
    score-- 
    loadQuestion(true)
}

window.addEventListener('load', () => {
    $.getJSON("./quiz.json", function(data) {
        allQuestions = data
        answer = new Array(allQuestions.length)
        loadQuestion(false)
    })
});