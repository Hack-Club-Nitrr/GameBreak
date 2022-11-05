document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    // query selector is like getElementById or getElementByClassName
    const width = 10
    let nextRandom = null
    let timerId
    let score = 0

    // 5 Tetrominos 
    // Each array represents the rotation of tetromino
    const lTetromino = [
        [width*0+1,width*1+1,width*2+1,width*0+2],
        [width*1+0,width*1+1,width*1+2,width*2+2],
        [width*0+1,width*1+1,width*2+0,width*2+1],
        [width*0+0,width*1+0,width*1+1,width*1+2]
    ]
    const zTetromino = [
        [width*1+1,width*1+2,width*2+0,width*2+1],
        [width*0+0,width*1+0,width*1+1,width*2+1],
        [width*0+1,width*0+2,width*1+0,width*1+1],
        [width*0+1,width*1+1,width*1+2,width*2+2]
    ]
    const tTetromino = [
        [width*0+1,width*1+0,width*1+1,width*1+2],
        [width*0+1,width*1+1,width*1+2,width*2+1],
        [width*1+0,width*1+1,width*1+2,width*2+1],
        [width*0+1,width*1+0,width*1+1,width*2+1]
    ]
    const oTetromino = [
        [width*0+0,width*0+1,width*1+0,width*1+1],
        [width*0+0,width*0+1,width*1+0,width*1+1],
        [width*0+0,width*0+1,width*1+0,width*1+1],
        [width*0+0,width*0+1,width*1+0,width*1+1]
    ]
    const iTetromino = [
        [width*0+1,width*1+1,width*2+1,width*3+1],
        [width*1+0,width*1+1,width*1+2,width*1+3],
        [width*0+1,width*1+1,width*2+1,width*3+1],
        [width*1+0,width*1+1,width*1+2,width*1+3]
    ]

    const theTetrominos = [
        lTetromino,
        zTetromino,
        tTetromino,
        oTetromino,
        iTetromino
    ]

    let currentPosition = 0
    let currentRotation = 0
    
    // select random tetromino
    let random = Math.floor(Math.random()*theTetrominos.length)
    let current = theTetrominos[random][currentRotation]
    
    // draw the tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition+index].classList.add('tetromino')
        })
    }

    // undraw the tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition+index].classList.remove('tetromino')
        })
    }

    // make the tetromino move down every second
    // timerId = setInterval(moveDown,1000)



    // assign function to keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if(e.keyCode === 39) {
            moveRight()
        } else if(e.keyCode === 38) {
            rotate()
        } else if(e.keyCode === 40) {
            moveDown()
        }
    }

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    // freeze function
    function freeze() {
        // (currentPosition+index_width) represents the bottom square 
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // select a new tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random()*theTetrominos.length)
            current = theTetrominos[random][currentRotation]
            currentPosition = Math.floor(Math.random()*7)
            displayShape()
            draw()
            if(layerComplete(19)) {
                addScore()
            }
        }
    }

    // move the tetromino left, unless is at the edge or there is blockade
    function moveLeft() {
        undraw()
        const isAtEdge = current.some(index => (currentPosition+index)%width === 0)

        if(!isAtEdge) currentPosition -= 1
        
        if(current.some(index => squares[currentPosition+index].classList.contains('taken'))) {
            currentPosition += 1
        }
        
        draw()
    }

    // move the tetromino right, unless is at the edge or there is blockade
    function moveRight() {
        undraw()
        const isAtEdge = current.some(index => (currentPosition+index)%width === width-1)

        if(!isAtEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition+index].classList.contains('taken'))) {
            currentPosition -= 1
        }
        draw()
    }

    function rotate() {
        undraw()
        currentRotation = (currentRotation+1)%current.length
        let t = theTetrominos[random][currentRotation]
        if((t.some(index => (currentPosition+index)%width===0)) && 
            (t.some(index => (currentPosition+index)%width===width-1))){
                currentRotation = (currentRotation-1)%current.length
            }
        else {
            current = t
        }
        draw()
    }

    // show up next tetromino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0
    

    // the tetrominos without rotation
    const upNextTetrominos = [
        [1,displayWidth+1,displayWidth*2+1,2], // lTetromino
        [displayWidth+1,displayWidth+2,displayWidth*2,displayWidth*2+1], //zTetromino
        [1,displayWidth,displayWidth+1,displayWidth+2], //tTetromino
        [0,1,displayWidth+0,displayWidth+1], //oTetromino
        [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1] //iTetromino
    ]

    // display the function in mini-grid display
    function displayShape() {
        // remove any trace of tetromino from entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominos[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }

    



    // add functionality to button
    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
            document.removeEventListener('keyup',control)
        } else {
            draw()
            timerId = setInterval(moveDown,400)
            document.addEventListener('keyup',control)
            if(nextRandom == null){
                nextRandom = Math.floor(Math.random()*theTetrominos.length)
                displayShape()
            }
        }
    })

    
    // checking if last layer is completed
    function layerComplete(r) {
        let k = r*10
        const row = [k,k+1,k+2,k+3,k+4,k+5,k+6,k+7,k+8,k+9]

        if(row.every(index => squares[index].classList.contains('taken'))) {
            score += 10
            scoreDisplay.innerHTML = score
            console.log("Here we go with the removal of this particular layer")
            return true
        }
        return false
    }

    // adding score 
    function addScore() {
        const k = 190
        const row = [k,k+1,k+2,k+3,k+4,k+5,k+6,k+7,k+8,k+9]

        row.forEach(index => {
            squares[index].classList.remove('tetromino')
            squares[index].classList.remove('taken')
        })
        moveGridOneDown()
    }



    // game over
    function gameOver() {

    }

    function moveGridOneDown() {
        for (let i=199 ; i>=width ; i--) {
            if(squares[i-width].classList.contains('tetromino')) {
                squares[i].classList.add('tetromino')
                squares[i].classList.add('taken')
                squares[i-width].classList.remove('tetromino')
                squares[i-width].classList.remove('taken')
            }
        }
        for (let i=width-1 ; i>=0 ; i--) {
            if(squares[i].classList.contains('tetromino')){
                squares[i].classList.remove('tetromino')
                squares[i].classList.remove('taken')
            }
        }
    }
})