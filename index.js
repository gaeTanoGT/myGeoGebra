//const math = require("mathjs");
let n;
let funzione;
let k = 10000;     //indice di precisione

function pulisci(){
    console.log("ho pulito");
    var tag = document.getElementById("mioCanvas");
    contesto = tag.getContext("2d");
    contesto.clearRect(0, 0, 400, 400);
}

const inner = document.getElementById("bottone").onclick = function(){
    funzione = document.getElementById("inputField").value;

    disegnaFunzione();
    
    let x1 = document.getElementById("x1").value;
    let x2 = document.getElementById("x2").value;
    
    console.log(`x11: ${x1}  --  x22: ${x2}`);

    n = Math.log2(Math.abs(x1 - x2) * 500 * k);
    console.log("n: ", n);
    
    let soluzione = trovaSoluzione(x1, x2)
    console.log(soluzione);
    document.getElementById("p1").innerHTML = `x: ${soluzione}`;

}

function trovaSoluzione(ax, bx){
    n--;

    let strFunzione = funzione.replaceAll("x", ax);
    let ay = math.eval(strFunzione);

    strFunzione = funzione.replaceAll("x", bx);
    let by = math.eval(strFunzione);

    if(ay * by > 0){
        console.log("Errore");
        return null;
    }

    let cx;
    if(ax < bx){
        cx = (Math.abs(ax - bx) / 2) + Number(ax);
    }
    else{
        cx = (Math.abs(ax - bx) / 2) + Number(bx);
    }

    console.log("cx: ", cx);
    
    strFunzione = funzione.replaceAll("x", cx);
    let cy = math.eval(strFunzione);

    if(((cy > 0 && by < 0) || (cy < 0 && by > 0)) && n > 0){
        return trovaSoluzione(cx, bx);
    } else if(((cy > 0 && by > 0) || (cy < 0 && by < 0)) && n > 0){
        return trovaSoluzione(ax, cx);
    } else {
        return cx;
    }
}

function disegnaFunzione(){
    let z = 20;  //zoom canvas

    var tag = document.getElementById("mioCanvas");
    contesto = tag.getContext("2d");

    contesto.clearRect(0, 0, 400, 400);

    contesto.beginPath();
    contesto.moveTo(0, 200);
    contesto.lineTo(400, 200);
    contesto.moveTo(200, 0);
    contesto.lineTo(200, 400);
    contesto.strokeStyle = "#9e9190";
    contesto.stroke();

    for(let i = -10; i < 10; i += 0.01){
        let strFunzione = funzione.replaceAll("x", i);
        let y = math.eval(strFunzione);

        contesto.beginPath();
        contesto.strokeStyle = "#000000";
        contesto.fillRect((i) * z + 200, (-y) * z + 200, 0.5, 0.5);
        contesto.stroke();
    }
}