//-------------------------------+
// Author: Dharmeet Singh        |
// Email: dharmeet@vlabs.ac.in   |
//-------------------------------+

//----------------------------------------------------------------------------------------+
// The validation and evaluation of expression is done, according to regular expressions  |
// similar to the following:                                                              |
// E -----> E + T | E - T | T                                                             |
// T -----> T ^ F | T % F | T * F | T / F | F                                             |
// F -----> (E) | n                                                                       |
// E - Expression, T - Term, F - Factor and n - Number                                    |
// We have three functions evalExpr(), evalTerm() and evalFactor(), and as we also have   |
// modulus and exponent function in the calculator so we need evalLPTerm(), as '^' and '%'|
// has higher precendence than multiply and divide.                                       |
//                                                                                        | 
// evalTerm takes care of exponent and modulus, and evalLPTerm evaluates multiply and     | 
// divide                                                                                 |
//----------------------------------------------------------------------------------------+

window.model = {

    ADD: '+',    // property for constant characters
    SUB: '-',
    MUL: '*',
    DIV: '/',
    EXP: '^',
    MOD: '%',
    CLBRCKT: ')',
    OPBRCKT: '(',
    ZERO: '0',
    NINE: '9',
    DOT: '.',
    expr: '',   // property to store the expression associated with this object

    // Function to implement the regular expression E -----> E + T | E - T | T
    evalExpr: function() {
        
        var termValue1 = this.evalTerm();
        for (;;) {
            if (this.expr.length > 0 ) {
                var op = this.expr.charAt(0);
                if (op != this.ADD && op != this.SUB) {
                    if (op != this.CLBRCKT)
                        throw new IOException(this.expr);
                    else
                        return termValue1;
                }
                controller(op, "push");
                this.expr = this.expr.substring(1);
                var termValue2 = this.evalTerm();
                if (op == this.SUB) 
                    termValue1 -= termValue2;
                else
                    termValue1 += termValue2;
                controller(termValue1, "pop");
            }
            else
                return termValue1;
        }
    },

    // Function to implement the expression T -----> T ^ F | T % F | F
    evalTerm: function() {
        
        var factor1 = this.evalFactor();
        for (;;) {
            if (this.expr.length > 0) {
                var op = this.expr.charAt(0);
                if (op != this.EXP && op != this.MOD) {
                    factor1 = this.evalLPTerm(factor1);
                    return factor1;
                }
                this.expr = this.expr.substring(1);
                controller(op, "push");
                var factor2 = this.evalFactor();
                if (op == this.MOD) {
                    if (factor2 == 0)
                        throw new IOException();
                    factor1 = factor1 % factor2;
                }
                else
                    factor1 = Math.pow(factor1, factor2);
                controller(factor1, "pop");
            }
            else
                return factor1;
        }
    },

    // Function to take care of expressions like a*b^c where ^ has higher precedence then *
    evalLPTerm: function(factor1) {
        
        for (;;) {
            if (this.expr.length > 0) {
                var op = this.expr.charAt(0);
                if (op != this.MUL && op != this.DIV)
                    return factor1;
                controller(op);
                this.expr = this.expr.substring(1);
                var factor2 = this.evalTerm();
                if (op == this.MUL) {
                    factor1 *= factor2;
                }
                else {
                    if (factor2 == 0)
                        throw new IOException();
                    factor1 /= factor2;
                }
                controller(factor1, "pop");
            }
            else
                return factor1;
        }
    },

    // Function to implement the expression F -----> ( E ) | n
    evalFactor: function() {
        var number;
        var numb = "";
        var len = 0;
        if (this.expr.length > 0) {
            if ((this.expr.charAt(0) >= this.ZERO && this.expr.charAt(0) <= this.NINE) || this.expr.charAt(0) == this.DOT) {
                numb = this.expr.match("[0-9]*\\.?[0-9]+");
                number = parseFloat(numb);
                if (this.expr.length == numb[0].length)
                    this.expr = "";
                else
                    this.expr = this.expr.substring(numb[0].length);
                controller(number, "push");
                return number;
            }
            else if (this.expr.charAt(0) == this.OPBRCKT) {
                controller(this.OPBRCKT, "push");
                this.expr = this.expr.substring(1);
                number = this.evalExpr();
                if (this.expr.charAt(0) == this.CLBRCKT) {
                    this.expr = this.expr.substring(1);
                    controller(this.CLBRCKT, "push");
                    return number;
                }
                else {
                    throw new IOException(this.expr);
                }
            }
            else
                throw new IOException(this.expr);
        }
        throw new IOException(this.expr);
    },
}

window.view = {

    addClickEvent: function (id, method) {
        var element = document.getElementById(id);
        element.addEventListener('click', method, false);
    },

    activateEvents: function () {
        var events = new Array("keyOpenBrcktId", "keyCloseBrcktId", 'keySevenId', 'keyEightId', 'keyNineId', 'keyDivId', 'keyExpId', 'keyFourId', 'keyFiveId', 'keySixId', 'keyMulId', 'keyModId', 'keyOneId', 'keyTwoId', 'keyThreeId', 'keySubId', 'keyZeroId', 'keyDotId', 'keyAddId', 'playBtn', 'pauseBtn', 'rewindBtn');
        for (var i=0; i < events.length; i = i+1) {
            this.addClickEvent(events[i], function() { view.setInnerHTML('screenId', this.value) });
        }
        this.addClickEvent('keyOneByXId', function() {view.setInnerHTMLOneByX('screenId') });
        this.addClickEvent('keyUnaryOpId', function() {view.setInnerHTMLUnary('screenId') });
        this.addClickEvent('keyEqualToId', function() {view.evalDisplayResult('screenId') });
        this.addClickEvent('keyClearId', function() {view.clearScreen('screenId') });
        this.addClickEvent('keyBackspaceId', function() {view.setInnerHTMLBackspace('screenId') });
        this.addClickEvent('pauseBtn', function() {view.pauseSimulation() });
        this.addClickEvent('playBtn', function() {view.resumeSimulation() });
        this.addClickEvent('rewindBtn', function() {view.prevSimulation() });
    },

    setInnerHTML: function (id, innerHTML) {
        document.getElementById(id).innerHTML = this.getInnerHTML(id) + innerHTML;
    },

    setInnerHTMLOneByX: function(id) {
        document.getElementById(id).innerHTML = '1/(' + this.getInnerHTML(id) + ')';
    },

    setInnerHTMLUnary: function(id) {
        document.getElementById(id).innerHTML = '-(' + this.getInnerHTML(id) + ')';
    },

    pauseSimulation: function() {
        simulator.stop();
        document.getElementById('screenId').innerHTML = finalValue;
        isDelay = false;
    },

    resumeSimulation: function() {
        isDelay = true;
        prevClicked = false;
        simulator.delay(2500);
        document.getElementById('screenId').innerHTML = finalValue;
    },
    
    prevSimulation: function() {
        prevClicked = true;
        queueIndex--;
        simulator.prev();
    },

    setInnerHTMLBackspace: function(id) {
        var expr = this.getInnerHTML(id);
        expr = expr.substring(0, expr.length - 1);
        document.getElementById(id).innerHTML = expr;
    },

    evalDisplayResult: function(id) {
        try {
            model.expr = this.getInnerHTML(id);
            finalExpr = this.getInnerHTML(id);
            finalValue = model.evalExpr();
            view.setInnerHTML('exprTextId', finalExpr + '  =  ' + finalValue);
            document.getElementById(id).innerHTML = finalValue;
        }
        catch (IOException) {
            stackIndex = 0;
            greenVal = 0;
            isDelay = false;
            simulator.stop();
            if(model.expr.length == 0)
                document.getElementById(id).innerHTML = "NaN";
            else {
                var mFinalExpression = this.getInnerHTML(id);
                var invalidStartIndex = mFinalExpression.indexOf(model.expr);
                var mInvalidExpression = mFinalExpression.substring(invalidStartIndex);
                mFinalExpression = mFinalExpression.substring(0, invalidStartIndex);
                document.getElementById(id).innerHTML = mFinalExpression + '<span style="color: #FF0000;">' + mInvalidExpression + '</span>';
            }
        }
    },

    getInnerHTML: function (id) {
        var value = document.getElementById(id).innerHTML;
        return value;
    },

    clearScreen: function (id) {
        document.getElementById(id).innerHTML = '';
        for (var i=stackIndex; i>=0; i--) {
            document.getElementById(stackRows[i]).innerHTML = '';
        }
        startIndex = 0;
        stackIndex = 0;
        isDelay = false;
        isClBrckt = false;
        queueIndex = 0;
        queue.length = 0;
        popStringStack.length = 0;
        popStringIndex = 0;
        document.getElementById('exprTextId').innerHTML = '';
        document.getElementById('execMsgId').innerHTML = '';
        document.getElementById('exprEvalId').innerHTML = '';
        finalExpr = '';
        popCount = 0;
        finalValue = '';
    },

    init: function () {
        this.activateEvents();
    }
}

window.onload = function () {
    window.view.init();
}

var stackIndex = 0;
var stackRows = new Array('row1', 'row2', 'row3', 'row4', 'row5', 'row6', 'row7', 'row8', 'row9', 'row10');

var Simulator = function() {
    
    var timer, onComplete;
   
    this.complete = function(f){
      onComplete = f;
      return this;
    };

    this.delay = function(per) {
        console.log("Inside Delay ");
        timer = setInterval(function() {
            if (queue.length > queueIndex) {
                prot = queue[queueIndex];
                //console.log(prot);
                queueIndex++;
                prot[0].apply(this, prot[1]);
            }
            else {
                if(onComplete) onComplete();
                    clearInterval(timer);
            }
        }, per);
        return this;
    };

    this.addFunction = function(f, args) {
        
        if (timer)  
            queue.push([f, args]);
        else 
            f.apply(this, args);
        return this;
    };

    this.stop = function() {
        prevClicked = false;
        clearInterval(timer);
        return this;
    }

    this.next = function() {
        if(timer)
            clearInterval(timer);
        if(queue.length > queueIndex) {
            prot = queue[queueIndex];
            prot[0].apply(this, prot[1]);
            queueIndex++;
        }
        else
            if(onComplete) onComplete();
    }

    this.prev = function() {
        if(timer)
            clearInterval(timer);
        if(queue.length > queueIndex && queueIndex >= 1) {
            prot=queue[queueIndex-1];
            prot[0].apply(this, prot[1]);
        }
        else
            if(onComplete) onComplete();
    }
};

var simulator = new Simulator();
var stack = [];
var queue = [];
var lastGreenStack = [];
var lastRedStack = [];
var popStringStack = [];
var popStringIndex = 0;
var queueIndex = 0;
var isClBrckt = false;
var isDelay = false;
var popCount = 0;
var finalExpr;
var finalValue;
var startIndex = 0;
var prevClicked = false;
var startRedIndex = 0;
var redVal = '';
var lastPop = false;
var lastPush = false;
//var prevValue='';


function controller(value1, value2) {
    
    if(!isDelay) {
        simulator.delay(2500);
        isDelay = true;
    }
   
    var popAction = function(value1) {
       
        console.log('popped ==> ', value1);
        document.getElementById('screenId').innerHTML = finalValue;
        if(value1 != window.model.CLBRCKT && isClBrckt == false)
            document.getElementById('execMsgId').innerHTML = 'Popping the top 3 elements from stack and applying the operator function on them. Pushing the result on to the stack';
        if(value1 == window.model.CLBRCKT)
            isClBrckt = true;
        if(isClBrckt==true)
            document.getElementById('execMsgId').innerHTML = "Popping the elements, till we don't get a open bracket";
        var value1String = value1.toString();
        if(prevClicked == false) {
            redVal = value1String + redVal;
            popStringStack.push(redVal);
            popStringIndex++;
            document.getElementById('exprEvalId').innerHTML =  redVal;
            document.getElementById(stackRows[stackIndex-1]).innerHTML = '';
            stackIndex--;
            popCount++;
        }
        else {
             
            if(lastPush==true) {
                if(popCount==0)
                    popCount = 3;
                document.getElementById(stackRows[stackIndex-1]).innerHTML = '';
                stackIndex--;
            }
            else {
                var prevVal = popStringStack[popStringIndex].substring(0, popStringStack[popStringIndex].indexOf(value1String));
                view.setInnerHTML(stackRows[stackIndex++], prevVal);
                popCount--;
            }
            redVal = popStringStack[popStringIndex-1];
            popStringIndex--;
            //redVal = redVal.substring(prevVal.length);
            document.getElementById('exprEvalId').innerHTML =  redVal;
            
        }

        if(popCount==0)
            redVal = '';

        if(value1==window.model.OPBRCKT) {
            isClBrckt = false;
        }
        lastPop = true;
        lastPush = false;
    }
    
    var pushAction = function(value1) {
        console.log('pushed ==> ', value1);
        document.getElementById('screenId').innerHTML = finalValue;
        document.getElementById('execMsgId').innerHTML = '';
        if(prevClicked==false || lastPop == true) {
            view.setInnerHTML(stackRows[stackIndex++], value1);
        }
        else {
            document.getElementById(stackRows[stackIndex-1]).innerHTML = '';
            stackIndex--;
        } 
        view.setInnerHTML('execMsgId', 'Pushing ' + value1 + ' on to the stack');
        //document.getElementById('evalExprId').innerHTML = view.getInnerHTML('evalExprId') + value1;
        if(popCount==3) { 
            document.getElementById('exprEvalId').innerHTML = redVal + ' = ' + value1;
            redVal = '';
        }
        else {
            document.getElementById('exprEvalId').innerHTML = '';
            var value1String = value1.toString();
            if(prevClicked==false || lastPop==true) {
                if(prevClicked==false) 
                    startIndex += value1String.length;
                lastGreenStack.push(value1String);
                lastPop = false;
            }
            else 
                startIndex -= lastGreenStack.pop().length;
            var greenVal = finalExpr.substring(0, startIndex);
            var blackVal = finalExpr.substring(startIndex);
            //finalExpr = finalExpr.substring(value1.toString().length);
            document.getElementById('exprTextId').innerHTML = '';
            document.getElementById('exprTextId').innerHTML = '<span style="color: green;">' + greenVal + '</span>' + blackVal + ' = ' + finalValue; 
        }
        lastPush = true;
        popCount = 0;
        redVal = '';
        //document.getElementById('exprEvalId').innerHTML = '';
    }

    var newVal;
    var valInBrkt;

    if(value1 == window.model.CLBRCKT) {
        //stack.push(value1);
        simulator.addFunction(pushAction, [value1]);
        popCount = 0;
        newVal = stack.pop();
        valInBrkt = newVal;
        simulator.addFunction(popAction, [value1]);
        simulator.addFunction(popAction, [newVal]);
        while(newVal && newVal != window.model.OPBRCKT){
            newVal = stack.pop();
            simulator.addFunction(popAction, [newVal]);
        }
        stack.push(valInBrkt);
        simulator.addFunction(pushAction, [valInBrkt]);
        popCount = 0;
    }
    else if(value2 == "pop") {
        for(var i=0; i<3; i++) {
            newVal = stack.pop();
            simulator.addFunction(popAction, [newVal]);
        }
        stack.push(value1);
        simulator.addFunction(pushAction, [value1]);       
    }              
    else  {
        stack.push(value1);
        simulator.addFunction(pushAction, [value1]);
    }
}

/*$(document).ready(function(){
    window.model.expr = '(10-7)';
    window.model.evalExpr();
})*/