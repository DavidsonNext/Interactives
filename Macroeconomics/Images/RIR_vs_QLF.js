////////////
// BOARD 1
////////////
var newBBox = [-1.75, 12, 12, -1.75];

var brd1 = createBoard('jxgbox1',{xname:"Quantity of Loanable Funds", yname:"Real<br>Interest<br>Rate",
                                  grid:false,'xpos':[6,-0.5],'ypos':[-1.55,10], bboxlimits:newBBox});

//Guides
var L = newBBox[1];
var GY1 = brd1.create('segment',[[L/4,0.0],[L/4,L]],{name:'GY1',color:'DarkGray',dash:1,strokeWidth:2});
var GY2 = brd1.create('segment',[[L/2,0.0],[L/2,L]],{name:'GY2',color:'DarkGray',dash:1,strokeWidth:2});
var GY3 = brd1.create('segment',[[(3/4)*L,0.0],[(3/4)*L,L]],{name:'GY3',color:'DarkGray',dash:1,strokeWidth:2});

var GX1 = brd1.create('segment',[[0.0,(1/4)*L],[L,(1/4)*L]],{name:'GX1',color:'DarkGray',dash:1,strokeWidth:2});
var GX2 = brd1.create('segment',[[0.0,(1/2)*L],[L,(1/2)*L]],{name:'GX2',color:'DarkGray',dash:1,strokeWidth:2});
var GX3 = brd1.create('segment',[[0.0,(3/4)*L],[L,(3/4)*L]],{name:'GX3',color:'DarkGray',dash:1,strokeWidth:2});


//Standard edX JSinput functions
setState = function(transaction,statestr){
    state = JSON.parse(statestr);
    //console.log(state);
    //console.log(state["dragLine"]);

    if (state["LRAS2"]) {
        sliderx.moveTo([state['LRAS2']['X'],0],0);
        brd1.update();
    }

    console.debug('State updated successfully from saved.');
}

getState = function(){
    var state = JSON.parse(getGrade());
    statestr = JSON.stringify(state);
    // console.log(statestr);
    return statestr;
}

getGrade = function() {
    var state = {"LRAS2":{'X':sliderx.Value()}};
    statestr = JSON.stringify(state);
    //console.log('hello',statestr);
    return statestr;
}

MacroLib.createChannel(getGrade, getState, setState);


