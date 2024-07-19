let $circle = document.querySelector('#circle');
let $score = document.querySelector('#score');

// тут вся анимация
$circle.addEventListener('click', (e) => {
    // блок анимаци круга, чем ближе к краю тем больше угол поворота
    const rect = $circle.getBoundingClientRect();

    const offfsetX = e.clientX - rect.left - (rect.width / 2);
    // console.log(e.clientX)
    // console.log(rect.left)
    //
    // console.log(rect.width)
    // console.log(offfsetX)
    // console.log("*")
    const offfsetY = e.clientY - rect.top - rect.height / 2;

    const DEG = 60;

    const tiltX = (offfsetY / rect.height) * DEG;
    const tiltY = (offfsetX / rect.width) * -DEG;

    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);

    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0deg`);
        $circle.style.setProperty('--tiltY', `0deg`);
    }, 300)

    //делам плюсик
    const plusOne = document.createElement("div");
    plusOne.classList.add("plus-one");
    plusOne.textContent = "+1";
//  делаем поправку чтоб элемент всплывал там гд екликнули
    plusOne.style.left = `${e.clientX - rect.left}px`;
    plusOne.style.top = `${e.clientY - rect.top}px`;
    
    $circle.parentElement.appendChild(plusOne);
    //добовлям счет
    addOne()
    // через 2 секунды убираем плюсик
    setInterval(() => {
            plusOne.remove()
        }, 2000
    )

})

function start() {
    setScore(getScore())
    setImage()
}

// записываем значение в локальное хранилище и обновляем его на экране
function setScore(score) {
    localStorage.setItem('score', score);
    //обновляем его на экране
    $score.textContent = score;
}
// извелкам из локального хранилища есл ничего нету то 0
function getScore() {
    return Number(localStorage.getItem('score')) ?? 0;
}
//добавляем счет
function addOne() {
    setScore(getScore() + 1)
    // проверяем и если надо меняем картинку
    setImage()
}
// функция меняющее картинку
function setImage() {
    if (getScore() >= 20) {
        $circle.setAttribute('src', './assets/lizzard.png')
    }
}

start()




