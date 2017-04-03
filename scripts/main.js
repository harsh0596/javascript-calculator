$(document).ready(function() {
    function randomgrad() {
        var rand1 = "#" + Math.random().toString(16).slice(2, 8);
        var rand2 = "#" + Math.random().toString(16).slice(2, 8);
		var grad = $(this);

		function convertHex(hex,opacity){
		    hex = hex.replace('#','');
		    r = parseInt(hex.substring(0,2), 16);
		    g = parseInt(hex.substring(2,4), 16);
		    b = parseInt(hex.substring(4,6), 16);

		    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
		    return result;
		}
		
		grad.css('background-color', convertHex(rand1,40));
		grad.css("background-image", "linear-gradient(to left, "+ convertHex(rand1,40) +", "+ convertHex(rand2,40) +")");  
	}
	
	$('body').each(randomgrad);
    $('.bg').each(randomgrad);
});

var num1 = "";
var op = "";
var num2 = "";
var solution;
var prevSolution;
var opEntered = false;
var dotEntered = false;

function insertCommas(num) {
    var numtodisplay = "";
    var temp = num.length;

    for (var i=0; i<num.length; i++) {
        if (temp % 3 == 0 && i != 0) {
            numtodisplay += ",";
        }
        numtodisplay += num[i];
        temp--;
    }

    return numtodisplay;
}

function getOp(op) {
    if (op === "+") return "+";
    else if (op === "-") return "-";
    else if (op === "*") return "×";
    else if (op === "/") return "÷";
}

function eventParser() {
    if ($(this).attr("type") === "num") {
        if (opEntered === false) {
            $(".op-display").html("238842424282+_=8374334;
            if (num1.length < 10) {
                num1 += $(this).attr("value");
            }

            else if (num1.length >= 10 && num1.length <= 12) {
                num1 += $(this).attr("value");
                $(".display").css("font-size", "38px");
            }

            $(".display").html(insertCommas(num1));
        }

        else if (opEntered === true) {
            if (num2.length < 10) {
                num2 += $(this).attr("value");
            }

            else if (num2.length >= 10 && num2.length <= 12) {
                num2 += $(this).attr("value");
                $(".display").css("font-size", "38px");
            }

            $(".display").html(insertCommas(num2));
        }
    }

    else if ($(this).attr("type") === "op") {
        if (opEntered === false && prevSolution) {
            num1 = prevSolution;
            opEntered = true;
            op = $(this).attr("value");
            $(".op-display").html(getOp(op));
        }

        else if (opEntered === false) {
            opEntered = true;
            op = $(this).attr("value");
            $(".op-display").html(getOp(op));
        }

        else if (opEntered === true && num2 === "") {
            op = $(this).attr("value");
            $(".op-display").html(getOp(op));
        }

        else if (opEntered === true && num2 !== "") {
        }
    }

    else if ($(this).attr("type") === "solve" && num1 !== "" && num2 !== "" && op != "") {
        eval(num1, op, num2);
        $(".op-display").html("");
        $(".display").html(insertCommas(solution.toString()));
        prevSolution = solution;
        clearAll();
    }

    else if ($(this).attr("type") === "clear") {
        if ($(this).attr("value") === "c") {
            $(".op-display").html("");
            $(".display").html(0);
            clearAll();
        }

        else if ($(this).attr("value") === "ce") {
            // todo
        }

        else if ($(this).attr("value") === "back") {
            // todo
        }
    }
}

function clearAll() {
    num1 = "";
    num2 = "";
    op = "";
    solution = 0;
    opEntered = false;
    dotEntered = false;
}

function eval(num1, op, num2) {
    if(op === "+") {
        solution = parseFloat(num1) + parseFloat(num2);
    }

    else if (op === "-") {
        solution = parseFloat(num1) - parseFloat(num2);
    }

    else if (op === "*") {
        solution = parseFloat(num1) * parseFloat(num2);
    }

    else if (op === "/" && num2 != 0) {
        solution = parseFloat(num1) / parseFloat(num2);
    }

    else if (op === "/" && num2 === 0) {
        // lol
    }
}

$(".button").on("click", eventParser);