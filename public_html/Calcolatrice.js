$(document).ready(function () {
    function isUguale() {
        if (operatore !== "" && valore !== "") {
            operando2 = parseFloat(valore);
            switch (operatore) {
                case "+":
                    risultato = operando1 + operando2;
                    break;
                case "-":
                    risultato = operando1 - operando2;
                    break;
                case "*":
                    risultato = operando1 * operando2;
                    break;
                case "/":
                    risultato = operando1 / operando2;
                    break;
            }
            $("#espr").val(risultato);
            valore = "";
            risultato = 0;
            operatore = "";
            operando1 = "";
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

    var valore = "";
    var operando1 = "";
    var operando2 = "";
    var operatore = "";
    var risultato = 0;
/*
    ev.which è una proprietà dell'evento keypress che contiene il valore del tasto premuto
    ev.which: da 48 a 57 sono le cifre in ordine crescente
              43 indica il +
              45 indica il -
              42 indica il *
              47 indica il /
              13 indica l'invio del tastierino numerico che in questo programma rappresenta l'uguale
              46 indica il .
 */
    $(document).keypress(function (ev) {
        if (ev.which >= 48 && ev.which <= 57) {
            isNumero(ev.which - 48);
        }
        else if (ev.which === 45 && valore === "") {        
            segnoNegativo("-");
        }
        else if (ev.which === 46) {
            isPunto();
        }
        else if (operatore === "" && valore !== "-" && valore !== "") {
            switch (ev.which) {
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
        
        else if (ev.which === 13) {
            isUguale();
        }
    });

    $(".num").click(function () {
        isNumero($(this).text());
    });

    $(".oper").click(function () {
        if ($(this).text() === "-" && valore === "") {
            segnoNegativo($(this).text());
        } else if (operatore === "" && valore !== "-" && valore !== "") {
            isOperatore($(this).text());
        }
    });

    $("#uguale").click(isUguale);

    $("#punto").click(isPunto);
});