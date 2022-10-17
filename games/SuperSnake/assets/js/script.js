var snake = document.getElementById("move");
var fruit = document.getElementById("fruit")
var box = document.getElementById("box")
var trail = document.getElementsByClassName("snake")
var direction = "Left", memmory = [], timer = 0, score = 0, blockWidth = 24, speed = 100;
var width = Math.min(Math.ceil(window.innerWidth / blockWidth) * blockWidth - 48, 960);
var height = Math.min(Math.ceil(window.innerHeight / blockWidth) * blockWidth, 480);

if (window.innerWidth < 767) {
    box.style.width = width + "px"
    height = 360;
    box.style.height = "360px"
    speed = 120;
} else {
    box.style.width = width + "px"
    box.style.height = height + "px"
}
var move = setInterval(movement, speed)

document.body.addEventListener('keydown', function (event) {
    const key = event.key;
    switch (key) {
        case "ArrowLeft":
            if (direction !== "right" && trail.length > 0) {
                direction = "left"
            }
            break;
        case "ArrowRight":
            if (direction !== "left" && trail.length > 0) {
                direction = "right"
            }
            break;
        case "ArrowUp":
            if (direction !== "down" && trail.length > 0) {
                direction = "up"
            }
            break;
        case "ArrowDown":
            if (direction !== "up" && trail.length > 0) {
                direction = "down"
            }
            break;
    }
});
// controls for smallere screen sizes
function handleKey(key) {
    switch (key) {
        case "left":
            if (direction !== "right" && trail.length > 0) {
                direction = "left"
            }
            break;
        case "right":
            if (direction !== "left" && trail.length > 0) {
                direction = "right"
            }
            break;
        case "up":
            if (direction !== "down" && trail.length > 0) {
                direction = "up"
            }
            break;
        case "down":
            if (direction !== "up" && trail.length > 0) {
                direction = "down"
            }
            break;
    }
}

function setPath() {
    for (var i = 1; i < trail.length; i++) {
        trail[i].style.left = memmory[i][0] + "px"
        trail[i].style.top = memmory[i][1] + "px"
        if (snake.offsetTop === trail[i].offsetTop && snake.offsetLeft === trail[i].offsetLeft) {
            clearInterval(move)
            snake.style.animation = "blink 0.5s infinite"
            snake.style.zIndex = "100"
        }
    }
}

function movement() {
    timer += 0.1;
    if (direction === "right") {
        snake.style.left = snake.offsetLeft + blockWidth + "px"
        if (snake.offsetLeft > width - blockWidth) {
            snake.style.left = 0
        }
    } else if (direction === "down") {
        snake.style.top = snake.offsetTop + blockWidth + "px"
        if (snake.offsetTop > height - blockWidth) {
            snake.style.top = 0
        }
    } else if (direction === "left") {
        snake.style.left = snake.offsetLeft - blockWidth + "px"
        if (snake.offsetLeft < 0) {
            snake.style.left = width - blockWidth + "px"
        }
    } else {
        snake.style.top = snake.offsetTop - blockWidth + "px"
        if (snake.offsetTop < 0) {
            snake.style.top = height - blockWidth + "px"
        }
    }
    populate();
    setPath()
    if ((snake.offsetLeft === fruit.offsetLeft && snake.offsetTop === fruit.offsetTop) || timer % 10 === 0) {
        // alert(timer)
        fruit.style.top = Math.floor(Math.random() * (box.offsetHeight - blockWidth) / blockWidth) * blockWidth + "px";
        fruit.style.left = Math.floor(Math.random() * (box.offsetWidth - blockWidth) / blockWidth) * blockWidth + "px";
        // fruit.style.background=colors[Math.floor(Math.random()*5)]
        score += 5;
        document.getElementById("score").innerHTML = "score : " + score;
        expand()
    }

}

function populate() {
    memmory.unshift([snake.offsetLeft, snake.offsetTop])
}

function expand() {
    var box = document.getElementById("box")
    var exp = document.createElement("div");
    exp.classList.add("snake")
    exp.style.background = " radial-gradient(#e2b714, #c59a00)"
    box.appendChild(exp);
}

function restart() {
    location.reload();
}

function takeshot() {
    html2canvas(document.body).then((canvas) => {
        let a = document.createElement("a");
        a.download = "ss.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
  window.open(canvas.toDataURL("image/png"),'_blank')

    });
}