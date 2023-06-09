document.addEventListener("DOMContentLoaded", function() {
    createBoxes();

    var pos = 0;

    function createBoxes() {
        var boxes = "";
        var no = 100,
            inc = -1;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let y = i * 50;
                let x = j * 50;
                boxes += `<div class='box' id="b_${no}" style='margin:${y}px ${x}px'></div>`;
                no += inc;
            }
            if (i % 2 == 0) {
                no -= 9;
            } else {
                no -= 11;
            }
            inc = -inc;
        }
        document.querySelector(".board").innerHTML = boxes;
    }

    function setBox(id, color) {
        document.getElementById(id).innerHTML = `<div class='cir' style='background:${color}'></div>`;
    }

    function removeBox(id) {
        document.getElementById(id).innerHTML = "";
    }

    function playerMover(move) {
        if (move > 0) {
            setTimeout(() => {
                if (pos >= 1) {
                    removeBox("b_" + pos);
                }
                pos++;
                setBox("b_" + pos, "red");
                move--;
                playerMover(move);
                if (move == 0) {
                    check(ladders);
                    check(snakes);}
                if(pos==95 && move ==6 ){
                    console.log("Cannot move");
                    return;
                    
                }
                if(pos==96 && move>=5 ){
                    console.log("Cannot move");
                    return;
                }
                if(pos==97 && move>=4 ){
                    console.log("Cannot move");
                    return;
                }
                if(pos==98 && move>=3 ){
                    console.log("Cannot move");
                    return;
                }
                if(pos==99 && move>=2 ){
                    console.log("Cannot move");
                    return;
                }
                    if(pos==100){
                        console.log("Congratulations! Done");
                        document.getElementById("b_100").classList.add("sparkle");
                    }
                
            }, 100);
        }
    }

    var ladders = [
        [1, 38],
        [4, 14],
        [9, 31],
        [21, 42],
        [28, 84],
        [51, 68],
        [72, 91],
        [80, 99]
    ];

    var snakes = [
        [62, 18],
        [17, 7],
        [87, 36],
        [54, 34],
        [93, 73],
        [95, 75],
        [98, 79],
        [64, 60]
    ];

    function rotateDice() {
        document.querySelector(".dice").classList.add("anm");
        var dice_value = Math.floor(Math.random() * 6) + 1;
        console.log("Dice value: " + dice_value);
        var LIST = [
            [0, 0, 0],
            [-90, 0, 0],
            [0, 90, 0],
            [0, -90, 0],
            [90, 0, 0],
            [180, 0, 0]
        ];
        var x = LIST[dice_value - 1][0];
        var y = LIST[dice_value - 1][1];
        var z = LIST[dice_value - 1][2];
        setTimeout(() => {
            document.querySelector(".dice").classList.remove("anm");
            document.querySelector(".dice").style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
            playerMover(dice_value);
        }, 3000);
    }

    function check(data ) {
        for (let i = 0; i < data.length; i++) {
            if (data[i][0] === pos) {
                setTimeout(()=>{
                    console.log("Matched",pos);
                    if(pos>=1){
                        removeBox("b_" + pos);
                    }
                    pos = data[i][1];
                    setBox("b_" + pos, "red");
                },1000);
            }
        }
    }

    document.querySelector("button").addEventListener("click", rotateDice);
});
