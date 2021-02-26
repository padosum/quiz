let questionNumber = 0;
let score = 0; 
let allQuestions = [
    { 
        question: "웹 애플리케이션 렌더링 방식 중 브라우저가 페이지를 요청할 때마다 해당 페이지에 관련된 HTML, CSS, JS 파일 및 데이터를 받아와서 렌더링하는 방식은?"
      , choices: ["SSR", "SPA", "CSR", "MAP", "SPR"]
      , correctAnswer: 0 
    },
    { 
        question: "브라우저의 창, 프레임을 프로그래밍적으로 제어할 수 있게 해주는 객체모델은?"
      , choices: ["BMO", "BOM", "DOM", "SEO", "BEO"]
      , correctAnswer: 1 
    },
    { 
        question: "다음 중 자바스크립트 변수를 선언하며 재할당이 불가능한 키워드는?"
      , choices: ["var", "let", "foo", "keyword", "const"]
      , correctAnswer: 4 
    },
    { 
        question: "비동기적으로 DOM을 읽고 쓰며 XMLHttpRequest를 통해 서버와 데이터를 주고받는 웹 기술?"
      , choices: ["HTTP", "AJAX", "Closure", "API", "CDN"]
      , correctAnswer: 1 
    },
    { 
        question: "정규 표현식을 사용하기 위한 자바스크립트 객체는?"
      , choices: ["Array", "Math", "String", "RegExp", "undefined"]
      , correctAnswer: 3 
    },
    { 
        question: "다음 중 true를 반환하지 않는 것은?"
      , choices: ["0 == ''", "0 == '0'", "null == undefiend", "false == 'false'", "false == '0'"]
      , correctAnswer: 3 
    }

];

let answer = new Array(allQuestions.length)

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
    if(questionNumber > 0 && !isPrev) {
        answer[questionNumber - 1] = document.querySelector('input[name="choices"]:checked').value
    }
    
    if(!checkAnswer() && !isPrev) {
        alert('답을 선택하세요!')
    } else {
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
        } else {
            choicesDiv.innerHTML = ""
            question.innerHTML = "최종 점수"
            
            const scorePara = document.createElement('p')
            scorePara.style.textAlign = "center"
            scorePara.innerText = `${score} (${score} / ${questionNumber})`
            document.getElementById('quiz').appendChild(scorePara)
            document.getElementById('next').style.display = "none"
            document.getElementById('prev').style.display = "none"
        }
    }
    setButton()
}

const setButton = () => {
    if(questionNumber > 1) {
        document.getElementById("prev").style.visibility = "visible"
    }
}

const loadPrevQuestion = () => {
    questionNumber = questionNumber - 2
    loadQuestion(true)
}

window.addEventListener('load', () => {
    loadQuestion(false)
});