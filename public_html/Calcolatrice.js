$(document).ready(function () {
    var valore = "";
    var operando1 = "";
    var operando2 = "";
    var operatore = "";
    var risultato = 0;


    $(".num").click(function () {
        if ($(this).text() === '0' && valore === "") {
            valore += $(this).text();
        }
        else {
            if (valore === "0") {
                valore = $(this).text();
            } else {
                valore += $(this).text();
            }
        }
        $("#espr").val(valore);
    });

    $(".oper").click(function () {
        if ($(this).text() === "-" && valore === "") {
            valore += $(this).text();
            $("#espr").val(valore);
        } else if (operatore === "" && valore !== "-" && valore !== "") {
            operando1 = parseFloat(valore);
            valore += $(this).text();
            operatore = $(this).text();
            $("#espr").val(valore);
            valore = "";
        }
    });

    $("#uguale").click(function () {
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
    });

    $("#punto").click(function () {
        if (valore.indexOf(".") === -1 && valore !== "") {
            valore += $(this).text();
            $("#espr").val(valore);
        }
    });

});

