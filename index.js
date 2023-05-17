
let n;
let funzione;
let fx;
let k = 100000;     //indice di precisione
let min = k;
let max = -k;
let x1, x2;

function pulisci(){
    console.log("ho pulito");
    var tag = document.getElementById("mioCanvas");
    contesto = tag.getContext("2d");
    contesto.clearRect(0, 0, 400, 400);
}

const inner = document.getElementById("bottone").onclick = function(){
    funzione = document.getElementById("inputField").value;
    
    x1 = document.getElementById("x1").value;
    x2 = document.getElementById("x2").value;
    fx = document.getElementById("fx").value;

    disegnaFunzione();
    calcolaMin();
    calcolaMax();
    
    console.log(`x11: ${x1}  --  x22: ${x2}`);

    n = Math.log2(Math.abs(x1 - x2) * 500 * k);
    console.log("n: ", n);
    
    let soluzione = trovaSoluzione(x1, x2)
    console.log(soluzione);
    document.getElementById("p1").innerHTML = 
    `x: ${soluzione}<br>
     min: ${min}<br>
     max: ${max}`;

}

function trovaSoluzione(ax, bx){
    console.log("analizzo: ", ax, " - ", bx);
    n--;

    let strFunzione = funzione.replaceAll("x", ax);
    let ay = math.eval(strFunzione);

    strFunzione = funzione.replaceAll("x", bx);
    let by = math.eval(strFunzione);

    //se i risultati delle funzioni ax e bx non sono più gli estremi della soluzione di fx
    if((ay > fx || by < fx) && (ay < fx || by > fx)){        
        console.log("Errore");      //cambio verso di crescenza
        return null;
    }

    let cx;
    if(ax < bx){
        cx = (Math.abs(ax - bx) / 2) + Number(ax);
        cx = Number(cx.toFixed(Math.log10(k)));
    }
    else{
        cx = (Math.abs(ax - bx) / 2) + Number(bx);
        cx = Number(cx.toFixed(Math.log10(k)));
    }
    
    strFunzione = funzione.replaceAll("x", cx);
    let cy = math.eval(strFunzione);
    cy = Number(cy.toFixed(Math.log10(k)));
    
    console.log(`cx: ${cx} - cy${cy}`)

    if(cy == fx){
        return cx;
    }

    if(((cy > fx && by < fx) || (cy < fx && by > fx)) && n > 0){
        return trovaSoluzione(cx, bx);
    } else if(((cy > fx && by > fx) || (cy < fx && by < fx)) && n > 0){
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

function calcolaMin(){
    let a = Math.min(x1, x2);
    let b = Math.max(x1, x2);
    
    for(let j = a; j < b; j += 0.01){
        let strFunzione = funzione.replaceAll("x", j);
        let y = math.eval(strFunzione);
        min = Math.min(Number(y), min);
    }

    min = Number(min.toFixed(Math.log10(k)));
}

function calcolaMax(){
    let a = Math.min(x1, x2);
    let b = Math.max(x1, x2);

    for(let i = a; i < b; i += 0.01){
        let strFunzione = funzione.replaceAll("x", i);
        let y = math.eval(strFunzione);
        max = Math.max(Number(y), max);
    }

    max = Number(max.toFixed(Math.log10(k)));
}