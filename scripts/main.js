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
var prevSolutionExists = false;
var historyStr = "";
var historyMaxLength = 24;

function insertCommas(num) {
    var numtodisplay = "";
    var temp = num.length;
    var dotFound = false;

    for (var i=0; i<num.length; i++) {
        if (num[i] === ".") {
            
            dotFound = true;
        }

        if (temp % 3 === 0 && i !== 0 && dotFound === false) {
            numtodisplay += ",";
        }
        numtodisplay += num[i];
        temp--;
    }

    return numtodisplay;
}

function getOp(op) {
    if (op === "+") return " + ";
    else if (op === "-") return " - ";
    else if (op === "*") return " × ";
    else if (op === "/") return " ÷ ";
}

function addToHist(str) {
    if (historyStr.length > historyMaxLength) {
        historyStr = historyStr.slice(str.length, historyStr.length);
        historyStr += str;
        $(".hist-display").css("background", "linear-gradient(to left, #000, #424242)");
        $(".hist-display").css("-webkit-background-clip", "text");
        $(".hist-display").css("-webkit-text-fill-color", "transparent");
    }

    else {
        historyStr += str;
    }
}

function addToHistDisplay(str) {
    $(".hist-display").html(str);
}

function eventParser() {
    if ($(this).attr("type") === "num") {
        if (opEntered === false && prevSolutionExists) {
            historyStr = "";
            prevSolutionExists = false;
            clearAll();
            numEntered(1, this);
        }

        else if (opEntered === false) {
            numEntered(1, this);
        }

        else if (opEntered === true) {
             numEntered(2, this);
        }
    }

    else if ($(this).attr("type") === "op") {
        if (opEntered === false && prevSolutionExists) {
            clearAll();
            num1 = prevSolution;
            prevSolutionExists = false;
            opEntered = true;
            op = $(this).attr("value");
            addToHist(getOp(op));
            addToHistDisplay(historyStr);
        }

        else if (opEntered === false) {
            opEntered = true;
            op = $(this).attr("value");
            addToHist(getOp(op));
            addToHistDisplay(historyStr);
        }

        else if (opEntered === true && num2 === "") {
            op = $(this).attr("value");
            addToHist(getOp(op));
            addToHistDisplay(historyStr);
        }

        // buggy as shit lol
        else if (opEntered === true && num2 !== "") {
            eval(num1, op, num2);
            $(".display").html(insertCommas(solution.toString()));

            num1 = solution;
            op = $(this).attr("value");
            addToHist(getOp(op));
            addToHistDisplay(historyStr);
            prevSolution = solution;
            prevSolutionExists = true;
            num2 = "";
            opEntered = false;
            dotEntered = false;
            $(".display").css("font-size", "50px");
        }
    }

    else if ($(this).attr("type") === "solve" && num1 !== "" && num2 !== "" && op != "") {
        eval(num1, op, num2);
        $(".display").html(insertCommas(solution.toString()));
        prevSolution = solution;
        prevSolutionExists = true;
        clearAll();
    }

    else if ($(this).attr("type") === "clear") {
        if ($(this).attr("value") === "c") {
            $(".hist-display").html("");
            $(".display").html(0);
            
        }

        else if ($(this).attr("value") === "ce") {
            // todo
            // bug: cant know if num1 or num2 pls fix
            historyStr = historyStr.slice(historyStr.length-num1.length, historyStr.length);
            addToHistDisplay(historyStr);
            num1 = "";
            $(".display").css("font-size", "50px");
            $(".display").html("0");
        }

        else if ($(this).attr("value") === "back") {
            if (opEntered === false && num1 !== "") {
                num1 = num1.slice(0, -1);
                historyStr = historyStr.slice(0, -1);
                addToHistDisplay(historyStr);
                $(".display").html(insertCommas(num1));
            }

            else if (opEntered === true && num2 !== "") {
                num2 = num2.slice(0, -1);
                historyStr = historyStr.slice(0, -1);
                addToHistDisplay(historyStr);
                $(".display").html(insertCommas(num2));
            }
        }
    }
}

function numEntered(num, context) {
    if (num === 1) {
        if (num1.length < 8) {
            num1 += $(context).attr("value");
            addToHist($(context).attr("value"));
        }

        else if (num1.length >= 8 && num1.length <= 11) {
            num1 += $(context).attr("value");
            $(".display").css("font-size", "34px");
            addToHist($(context).attr("value"));
        }

        $(".display").html(insertCommas(num1));
        addToHistDisplay(historyStr);
    }

    else if (num === 2) {
        if (num2.length < 8) {
            num2 += $(context).attr("value");
            addToHist($(context).attr("value"));
        }

        else if (num2.length >= 8 && num2.length <= 11) {
            num2 += $(context).attr("value");
            $(".display").css("font-size", "34px");
            addToHist($(context).attr("value"));
        }

        $(".display").html(insertCommas(num2));
        addToHistDisplay(historyStr);
    }
}

function clearAll() {
    num1 = "";
    num2 = "";
    op = "";
    solution = 0;
    opEntered = false;
    dotEntered = false;
    $(".display").css("font-size", "50px");
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