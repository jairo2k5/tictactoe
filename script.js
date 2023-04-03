gameTable = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
const logs = document.querySelector('div.logs')
pause = false
jogdas = 0
skip = 0
flag = -1

/* Game Methods - Start */

function convPosition(x, y) {
    str = '';
    if (x == 0) str += 'z'
    else if (x == 1) str += 'u'
    else if (x == 2) str += 'd'
    if (y == 0) str += 'z'
    else if (y == 1) str += 'u'
    else if (y == 2) str += 'd'
    return str
}

function convPlayer(x) {
    if (x == -1) return 'x'
    else return 'o'
}

function reset() {
    logs.innerHTML = ""
    gameTable = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    for(let l = 0; l < 3; l++) {
        for(let c = 0; c < 3; c++) {
            document.querySelector('td.'+convPosition(l, c)).innerHTML = ""
        }
    }
    pause = false
    jogdas = 0
    skip = 0
    flag = -1
}

function restore() {
    logs.innerHTML += '<button onclick="reset()">Recomeçar</button>'
}

function checkSum(sum, a) {
    if (sum == 3 || sum == -3) {
        return [sum / 3, a + 1]
    } else {
        return 0
    }
}

function checkHor(g) {
    sum = 0;
    line = 0;
    for (let l = 0; l < 3; l++) {
        for (let c = 0; c < 3; c++) {
            sum += (g[l][c])
            line = l
        }
        if (sum == -3 || sum == 3) break
        else sum = 0
    }
    return checkSum(sum, line)
}

function checkVert(g) {
    sum = 0
    col = 0
    for (let c = 0; c < 3; c++) {
        for (let l = 0; l < 3; l++) {
            sum += (g[l][c])
            col = c
        }
        if (sum == -3 || sum == 3) break
        else sum = 0
    }
    return checkSum(sum, col)
}

function checkTran(g) {
    sum = 0
    for (let i = 0; i < 3; i++) sum += (g[i][i])
    if (sum == 3 || sum == -3) {
        return [sum / 3, 1]
    } else {
        sum = 0
        sum = g[2][0] + g[1][1] + g[0][2]
        if (sum == 3 || sum == -3) return [sum / 3, 2]
        else return 0
    }
}

function checkGame(gameTable) {
    if (checkHor(gameTable) != 0) {
        winner = checkHor(gameTable)
        logs.innerHTML += "🥇 O jogador " + convPlayer(winner[0]).toUpperCase() + ' marcou 3 casas na ' + winner[1] + ' linha! <br>'
        pause = true
        restore()
    } else if (checkVert(gameTable) != 0) {
        winner = checkVert(gameTable)
        logs.innerHTML += "🥇 O jogador " + convPlayer(winner[0]).toUpperCase() + ' marcou 3 casas na ' + winner[1] + ' coluna! <br>'
        pause = true
        restore()
    } else if (checkTran(gameTable) != 0) {
        winner = checkTran(gameTable)
        logs.innerHTML += "🥇 O jogador " + convPlayer(winner[0]).toUpperCase() + ' marcou 3 casas na ' + winner[1] + 'a vertical! <br>'
        pause = true
        restore()
    }
}

/* Game Methods - Finish */


/* Front-end Interaction */

function call(x, y) {
    if (!pause == true && jogdas < 9) {
        if (gameTable[x][y] == 0) {
            gameTable[x][y] = flag
            if (flag == -1) {
                document.querySelector('td.' + convPosition(x, y)).innerHTML = '<img src="./svg/x.svg" alt="X" />'
                logs.innerHTML += "✅ O jogador X marcou! <br>"
                jogdas++
                checkGame(gameTable)

            } else {
                document.querySelector('td.' + convPosition(x, y)).innerHTML = '<img src="./svg/o.svg" alt="O" />'
                logs.innerHTML += "✅ O jogador O marcou! <br>"
                jogdas++
                checkGame(gameTable)
            }
        } else {
            logs.innerHTML += "❌ O jogador " + convPlayer(flag).toUpperCase() + " passou a vez! <br>"
            skip++
            if(skip == 9) {
                logs.innerHTML += "A partida terminou. <br>"
                pause = true
                restore()
            }
        }
        flag *= -1
        if (jogdas == 9 && pause != true) {
            logs.innerHTML += '⏸️ Empate! <br>'
            restore()
        }
    }
}
