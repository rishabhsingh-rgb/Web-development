const R = 6, C = 7;

let b = [],
    p = 'red',
    over = false,
    score = { red: 0, yellow: 0 },
    t = 30,
    int,
    gameStarted = false;

const bd = document.getElementById('board'),
      st = document.getElementById('status'),
      tm = document.getElementById('timer'),
      startBtn = document.getElementById('startBtn');

function init(resetScore = false) {

    if (resetScore) {
        score = { red: 0, yellow: 0 };
        redScore.textContent = 0;
        yellowScore.textContent = 0;
    }

    b = Array.from({ length: R }, () => Array(C).fill(''));
    bd.innerHTML = '';

    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {

            const d = document.createElement('div');
            d.className = 'cell';
            d.dataset.r = r;
            d.dataset.c = c;

            d.addEventListener('click', () => drop(c));

            bd.appendChild(d);
        }
    }

    p = 'red';
    over = false;
    gameStarted = false;

    clearInterval(int);
    t = 30;
    tm.textContent = t;

    st.textContent = "Press Start Game";

    if (startBtn)
        startBtn.style.display = "inline-block";

    draw();
}

function draw() {

    document.querySelectorAll('.cell').forEach(x => {

        const r = +x.dataset.r;
        const c = +x.dataset.c;

        x.className = "cell";

        if (b[r][c])
            x.classList.add(b[r][c]);

    });

}

function drop(c) {

    if (!gameStarted || over) return;

    for (let r = R - 1; r >= 0; r--) {

        if (!b[r][c]) {

            b[r][c] = p;

            draw();

            const cells = winningCells(r, c);

            if (cells) {

                over = true;

                score[p]++;
                document.getElementById(p + "Score").textContent = score[p];

                st.textContent = (p === "red" ? "Red" : "Yellow") + " Wins!";

                highlight(cells);

                if (window.confetti) confetti();

                clearInterval(int);

                return;
            }

            if (full()) {

                over = true;
                st.textContent = "Draw";
                clearInterval(int);
                return;

            }

            p = p === "red" ? "yellow" : "red";

            st.textContent = (p === "red" ? "Red" : "Yellow") + "'s Turn";

            t = 30;

            return;
        }
    }
}

function winningCells(r, c) {

    const dirs = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1]
    ];

    const col = b[r][c];

    for (const [dr, dc] of dirs) {

        let cells = [[r, c]];

        let rr = r + dr,
            cc = c + dc;

        while (rr >= 0 && rr < R && cc >= 0 && cc < C && b[rr][cc] === col) {
            cells.push([rr, cc]);
            rr += dr;
            cc += dc;
        }

        rr = r - dr;
        cc = c - dc;

        while (rr >= 0 && rr < R && cc >= 0 && cc < C && b[rr][cc] === col) {
            cells.unshift([rr, cc]);
            rr -= dr;
            cc -= dc;
        }

        if (cells.length >= 4)
            return cells.slice(0, 4);
    }

    return null;
}

function highlight(cells) {

    cells.forEach(([r, c]) => {

        document
            .querySelector(`.cell[data-r="${r}"][data-c="${c}"]`)
            .classList.add("win");

    });

}

function full() {

    return b.every(row => row.every(Boolean));

}

function startTimer() {

    clearInterval(int);

    t = 30;
    tm.textContent = t;

    int = setInterval(() => {

        t--;

        tm.textContent = t;

        if (t <= 0) {

            clearInterval(int);

            p = p === "red" ? "yellow" : "red";

            st.textContent = (p === "red" ? "Red" : "Yellow") + "'s Turn";

            startTimer();
        }

    }, 1000);

}

startBtn.addEventListener("click", () => {

    gameStarted = true;

    startBtn.style.display = "none";

    st.textContent = "Red's Turn";

    startTimer();

});

document.getElementById("restart").onclick = () => init(false);

init(true);
