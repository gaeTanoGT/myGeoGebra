
function pulisci(){
    console.log("ho pulito");
    var tag = document.getElementById("mioCanvas");
    contesto = tag.getContext("2d");
    contesto.clearRect(0, 0, 400, 400);
}

const inner = document.getElementById("bottone").onclick = function(){
    let funzione = document.getElementById("inputField").value;
    
    let x1 = document.getElementById("x1").value;
    let x2 = document.getElementById("x2").value;
    
    console.log(`x11: ${x1}  --  x22: ${x2}`);

    let bX;
    let bY;

    let st = 100;
    while(st > 0){
        bX = Math.abs(((x2 - x1) / 2)) + Number(x1);
        
        let strFunzione = funzione.replaceAll("x", bX);

        bY = math.eval(strFunzione);
        console.log(`x: ${bX}  --  y: ${bY}`);

        if(bY > 0){
            x2 = bX;
        }else if(bY < 0){
            x1 = bX;
        }else{
            st = false;
            document.getElementById("p1").innerHTML = `x: ${bX} - y: ${bY}`;
            //bx - by sono le soluzioni
        }

        st--;
    }

    document.getElementById("p1").innerHTML = `x: ${bX} - y: ${bY}`;

    console.log("finito");
}