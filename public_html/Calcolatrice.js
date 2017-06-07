$(document).ready(function () {

    function isUguale() {
        if (operatore !== "" && valore !== "") {
            operando2 = parseFloat(valore);
            switch (operatore) {
                case "+":
                    operando1 = operando1 + operando2;
                    break;
                case "-":
                    operando1 = operando1 - operando2;
                    break;
                case "*":
                    operando1 = operando1 * operando2;
                    break;
                case "/":
                    operando1 = operando1 / operando2;
                    break;
            }
            valore = "";
            operatore = "";
            operando2 = "";
        }
    }

    function isNumero(numero) {
        if (numero === '0' && valore === "") {
            valore += numero;
        } else {
            if (valore === "0") {
                valore = numero;
            } else {
                valore += numero;
            }
        }
        $("#espr").val(valore);
    }

    function segnoNegativo(segno) {
        valore += "-";
        $("#espr").val(valore);
    }

    function isOperatore(segno) {
        operando1 = parseFloat(valore);
        switch (segno) {
            case "+":
                valore += "+";
                operatore = "+";
                break;
            case "-":
                valore += "-";
                operatore = "-";
                break;
            case "*":
                valore += "*";
                operatore = "*";
                break;
            case "/":
                valore += "/";
                operatore = "/";
                break;
        }
        $("#espr").val(valore);
        valore = "";
    }

    function isPunto() {
        if (valore.indexOf(".") === -1 && valore !== "") {
            valore += ".";
            $("#espr").val(valore);
        }
    }

    function setSoloOperatore(segno) {
        operatore = segno;
        $("#espr").val(operando1 + segno);
        valore = "";
    }

    function gestioneOperazioni(valorekeyPressed) {
        if (operatore === "" && valore !== "-" && valore !== "") {//si inserisce l'operatore 
            switch (valorekeyPressed) {
                case 43:
                    isOperatore("+");
                    break;
                case 45:
                    isOperatore("-");
                    break;
                case 42:
                    isOperatore("*");
                    break;
                case 47:
                    isOperatore("/");
                    break;
            }
        }
        else if (operatore !== "") {//se la variabile operatore è già occupata e clicco un nuovo operatore, si eseguirà l'operazione e si impostera la var operatore con il nuovo segno (op.cascata)
            isUguale();
            switch (valorekeyPressed) {
                case 43:
                    operatore = "+";
                    break;
                case 45:
                    operatore = "-";
                    break;
                case 42:
                    operatore = "*";
                    break;
                case 47:
                    operatore = "/";
                    break;
            }
            $("#espr").val(operando1 + operatore);
        } else if (operando1 !== "" && operatore === "") {//c'è il primo operando ma non l'operatore: è il caso in cui l'operando è il risulatato di una precedente operazione
            switch (valorekeyPressed) {
                case 43:
                    setSoloOperatore("+");
                    break;
                case 45:
                    setSoloOperatore("-");
                    break;
                case 42:
                    setSoloOperatore("*");
                    break;
                case 47:
                    setSoloOperatore("/");
                    break;
            }
        }
    }

    var valore = "";
    var operando1 = "";
    var operando2 = "";
    var operatore = "";

    /*
     ev.which è una proprietà dell'evento keypress che contiene il valore del tasto premuto
     ev.which: da 48 a 57 rappresentano le cifre (da 0 a 9)
     43 indica il +
     45 indica il -
     42 indica il *
     47 indica il /
     13 indica l'invio del tastierino numerico che in questo programma rappresenta l'uguale
     46 indica il .
     */
    $(document).keypress(function (ev) {
        if (ev.which >= 48 && ev.which <= 57) {//il pulsante cliccato è un numero
            isNumero(ev.which - 48);
        }
        else if (ev.which === 45 && valore === "") {//il pulsante cliccato è l'operatore meno e va ad inveritire il segno dell'operando
            segnoNegativo("-");
        }
        else if (ev.which === 46) {//il pulsante cliccato è l'operatore punto
            isPunto();
        }
        else if (ev.which === 13) {//il pulsante cliccato è l'operatore uguale
            isUguale();
            $("#espr").val(operando1);
        }
        else {
            gestioneOperazioni(ev.which);
        }
    });

    $(".num").click(function () {
        isNumero($(this).text());
    });

    $(".oper").click(function () {
        if ($(this).text() === "-" && valore === "") {
            segnoNegativo($(this).text());
        }
        else if (operatore === "" && valore !== "-" && valore !== "") {
            isOperatore($(this).text());
        }
        else if (operatore !== "") {
            isUguale();
            operatore = $(this).text();
            $("#espr").val(operando1 + operatore);
        } else if (operando1 !== "" && operatore === "") {
            setOperatore($(this).text());
        }
    });

    $("#uguale").click(function () {
        isUguale();
        $("#espr").val(operando1);
    });

    $("#punto").click(isPunto);
});

