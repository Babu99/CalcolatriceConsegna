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
    var valore = "";
    var operando1 = "";
    var operando2 = "";
    var operatore = "";


    $(".num").click(function () {
        if ($(this).text() === '0' && valore === "") {
            valore += $(this).text();
        } else {
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
        } else if (operatore !== "") {
            isUguale();
            operatore = $(this).text();
            $("#espr").val(operando1 + operatore);
        } else if (operando1 !== "" && operatore === "") {
            operatore = $(this).text();
            $("#espr").val(operando1 + $(this).text());
            valore = "";
        }
    });

    $("#uguale").click(function(){
        isUguale();
        $("#espr").val(operando1);
    });

    $("#punto").click(function () {
        if (valore.indexOf(".") === -1 && valore !== "") {
            valore += $(this).text();
            $("#espr").val(valore);
        }
    });

});