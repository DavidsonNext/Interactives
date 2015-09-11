////////////
// BOARD 1
////////////
var brd1 = createBoard('jxgbox1',{xname:"Real GDP", yname:"PL",grid:false});

//Supply Line 1 - fixed
var S1B1 = createLine(brd1,{'ltype':'Supply','name':'SRAS<sub>1</sub>',color:'Lime'});
S1B1.setAttribute({'dash':1,'fixed':true,'highlight':false});

//Supply Line 2 - moveable
var S2B1 = createLine(brd1,{'ltype':'Supply','name':'SRAS<sub>2</sub>',color:'Lime'});
S2B1.setAttribute({'highlight':true,'withLabel':false});

//Demand Line 1 - fixed
var AD1 = createLine(brd1,{'ltype':'Demand','name':'AD<sub>1</sub>','color':'Orange'})
AD1.setAttribute({'dash':1,'fixed':true,'highlight':false});

//Demand Line 2 - moveable
var AD2 = createLine(brd1,{'ltype':'Demand','name':'AD<sub>2</sub>','color':'Orange'})
AD2.setAttribute({'withLabel':false,'highlight':true});

//LRAS - fixed
var LRAS = createLine(brd1,{'ltype':'Vertical','name':'LRAS','color':'DodgerBlue'})
LRAS.setAttribute({'withLabel':true,'fixed':true,'highlight':true,strokeWidth:3});

////////////
// Intersection Box 1
////////////
var iSDfix = brd1.create('intersection', [AD1, S1B1, 0], {visible:false});
var iS2D = brd1.create('intersection', [AD2, S1B1, 0], {visible:false});
var iSLB1 = brd1.create('intersection', [LRAS, S2B1, 0], {visible:false});

////////////
// Dashes for fixed Line
////////////
var dashesB1fixed = createDashedLines2Axis(brd1,iSDfix,
                                           {withLabel:true,
                                           xlabel:'rY<sub>1</sub>',
                                           ylabel:'PL<sub>1</sub>',
                                           color:'Gray'
                                           });

////////////
// Dashes for draggable Moveable Line
////////////
var dashesB1 = createDashedLines2Axis(brd1,iS2D,
                                           {withLabel:true,
                                           xlabel:'rY<sub>2</sub>',
                                           ylabel:'PL<sub>2</sub>',
                                           color:'Orange'
                                           });

dashesB1.Y1.setAttribute({visible:false});
dashesB1.X1.setAttribute({visible:false});
dashesB1.XLine.setAttribute({visible:false});
dashesB1.YLine.setAttribute({visible:false});


////////////
// Dashes for draggable SRAS2
////////////
var dashesLRASB1 = createDashedLines2Axis(brd1,iSLB1,
                                           {withLabel:true,
                                           xlabel:'',
                                           ylabel:'PL<sub>3</sub>',
                                           color:'Lime'
                                           });

dashesLRASB1.Y1.setAttribute({visible:false});
dashesLRASB1.X1.setAttribute({visible:false});
dashesLRASB1.XLine.setAttribute({visible:false});
dashesLRASB1.YLine.setAttribute({visible:false});

////////////
// BOARD 2
////////////
bboxlimits2 = [-2.5, 12, 12, -1.5];
var brd2 = createBoard('jxgbox2',{bboxlimits:bboxlimits2,xname:"UR", yname:"Inflation<br>Rate", 'ypos':[-2.4,10], grid:false});

//////////
// Connect Boards and Movement
//////////
brd1.addChild(brd2);


//COMPLICATED TRANSFORM USING REFLECTION
var refLine = brd2.create('line',[[10,0],[10,12]],{dash:1,visible:false});
var reflectBrd2 = brd2.create('transform',[refLine],{type:'reflect'});
var shiftC = brd2.create('transform',[8.5,0],{type:'translate'});
var C2 = brd2.create('point',[S2B1.point1,[shiftC,reflectBrd2]],{name:'C2',visible:false});

var shiftD = brd2.create('transform',[8.5,0],{type:'translate'});
var D2 = brd2.create('point',[S2B1.point2,[shiftD,reflectBrd2]],{name:'D2',visible:false});

//SRPC - moveable
var SRPC2 = brd2.create('segment',[C2,D2],{name:'SRPC<sub>2</sub>',fixed:false,withLabel:false,
                                           strokeWidth:5,strokeColor:'Lime',highlight:false,
                                           label:{offset:[95,-95]}});

var gr2 = brd2.create('group',[C2,D2]);

//SRPC - fixed
var SRPC1 = createLine(brd2,{'ltype':'Demand','name':'SRPC<sub>1</sub>','color':'DodgerBlue'});
SRPC1.setAttribute({'fixed':true,'highlight':false});

//LRAS - fixed
var LRAS = createLine(brd2,{'ltype':'Vertical','name':'LRPC','color':'DodgerBlue'})
LRAS.setAttribute({'dash':3,'withLabel':true,'fixed':true,'highlight':true,strokeWidth:2});

//Intersection B2
var iSDB2fix = brd2.create('intersection', [SRPC1, LRAS, 0], {name:'A1',highlight:false,
                                                              fillColor:'DodgerBlue',strokeColor:'DodgerBlue',
                                                              withLabel:true,visible:true});


////////////
// Dashes for fixed SRPC1
////////////
var dashesB2 = createDashedLines2Axis(brd2,iSDB2fix,
                                           {withLabel:true,
                                            fixed:true,
                                            xlabel:'5%',
                                            ylabel:'2%',
                                            color:'DodgerBlue'
                                           });

////////
// Invisible axis line - allows us to move points up and down the SRPC1 curve
// See the next intersection. DB2Y intersects with SRPC1
////////
var DB2YP1 = brd2.create('point',[0, iS2D.Y()],{withLabel:false,visible:false});
var DB2YP2 = brd2.create('point',[iS2D.X(), iS2D.Y()],{withLabel:false,visible:false});
var fakeD = brd2.create('segment',[DB2YP1,DB2YP2],{visible:false,strokeColor:'gray',strokeWidth:'2',
                                                            dash:'1',fixed:true} );

var iB2SRPC1 = brd2.create('intersection', [fakeD, SRPC1, 0], {name:'A2',highlight:false,
                                                              fillColor:'Orange',strokeColor:'Orange',
                                                              withLabel:true,visible:false});

////////////
// Dashes for moveable SRPC2
////////////
var dashesA2B2 = createDashedLines2Axis(brd2,iB2SRPC1,
                                           {withLabel:true,
                                            xlabel:'3%',
                                            ylabel:'4%',
                                            color:'Orange'
                                           });

dashesA2B2.Y1.setAttribute({visible:false});
dashesA2B2.X1.setAttribute({visible:false});
dashesA2B2.XLine.setAttribute({visible:false});
dashesA2B2.YLine.setAttribute({visible:false});

//////////////////
// Interactivity
//////////////////
brd1.on('move', function() {
    //Moving Dashed Lines in Board 1
    dashesB1.Y1.moveTo([0, iS2D.Y()]);
    dashesB1.Y2.moveTo([iS2D.X(), iS2D.Y()]);
    dashesB1.X1.moveTo([iS2D.X(), 0]);
    dashesB1.X2.moveTo([iS2D.X(), iS2D.Y()]);

    //Green Dashed Lines Board 1
    dashesLRASB1.Y1.moveTo([0, iSLB1.Y()]);
    dashesLRASB1.Y2.moveTo([iSLB1.X(), iSLB1.Y()]);
    dashesLRASB1.X1.moveTo([iSLB1.X(), 0]);
    dashesLRASB1.X2.moveTo([iSLB1.X(), iSLB1.Y()]);
    brd1.update()

    //BOARD 2
    //Moving Point A2
    DB2YP1.moveTo([0, iS2D.Y()]);
    DB2YP2.moveTo([iB2SRPC1.X(),iS2D.Y()]);

    //Orange Dashed Lines Board 2
    dashesA2B2.Y1.moveTo([0, iB2SRPC1.Y()]);
    dashesA2B2.Y2.moveTo([iB2SRPC1.X(), iB2SRPC1.Y()]);
    dashesA2B2.X1.moveTo([iB2SRPC1.X(), 0]);
    dashesA2B2.X2.moveTo([iB2SRPC1.X(), iB2SRPC1.Y()]);

});

brd1.on('mousedown', function() {
    // AD2.setAttribute({withLabel:true});
    // iB2SRPC.setAttribute({visible:true});

    AD2.setAttribute({withLabel:true});
    S2B1.setAttribute({withLabel:true});

    //First moveable drag lines
    dashesB1.Y1.setAttribute({visible:true});
    dashesB1.X1.setAttribute({visible:true});
    dashesB1.XLine.setAttribute({visible:true});
    dashesB1.YLine.setAttribute({visible:true});

    //Second moveable drag lines
    dashesLRASB1.Y1.setAttribute({visible:true});
    dashesLRASB1.X1.setAttribute({visible:true});
    dashesLRASB1.YLine.setAttribute({visible:true});
    dashesLRASB1.XLine.setAttribute({visible:true});

    brd1.update()

    // Board 2

    dashesA2B2.Y1.setAttribute({visible:true});
    dashesA2B2.X1.setAttribute({visible:true});
    dashesA2B2.XLine.setAttribute({visible:true});
    dashesA2B2.YLine.setAttribute({visible:true});

    SRPC2.setAttribute({withLabel:true});
    iB2SRPC1.setAttribute({visible:true});
    brd2.update();
});

// resetAnimation = function() {
//     //Initial line coords
//     var c1 = [2.0,9.5];
//     var c2 = [9.5,2.0];

//     //Animated Curve
//     AD2.point1.moveTo(c1,0);
//     AD2.point2.moveTo(c2,0);
//     AD2.setAttribute({withLabel:false});

//     iB2SRPC.setAttribute({visible:false});

//     //Hide Dashes
//     dashesB1.Y1.setAttribute({visible:false});
//     dashesB1.X1.setAttribute({visible:false});

//     dashesB1.XLine.setAttribute({visible:false});
//     dashesB1.YLine.setAttribute({visible:false});

//     //Dashed Lines
//     dashesB1.Y1.moveTo([0, iS2D.Y()],0);
//     dashesB1.Y2.moveTo([iS2D.X(), iS2D.Y()],0);

//     dashesB1.X1.moveTo([iS2D.X(), 0],0);
//     dashesB1.X2.moveTo([iS2D.X(), iS2D.Y()],0);

//     brd1.update();
//     brd2.update();
// };


setState = function(transaction,statestr){
    state = JSON.parse(statestr);
    //console.log(state);
    //console.log(state["dragLine"]);

    // if (state["dragLine"]) {
    //     brd1.removeObject('AD2');
    //     var point1 = [state["dragLine"]["p1X"],state["dragLine"]["p1Y"]];
    //     var point2 = [state["dragLine"]["p2X"],state["dragLine"]["p2Y"]]

    //     //Demand Line 2 - moveable
    //     AD2.point1.moveTo(point1,0);
    //     AD2.point2.moveTo(point2,0);

    //     brd1.update();
    // }
    //alert(statestr);
    console.debug('State updated successfully from saved.');
}

getState = function(){
    state = JSON.parse(getGrade());
    statestr = JSON.stringify(state);
    // console.log(statestr);
    return statestr;
}

//Standard edX JSinput functions
getGrade = function(){
    // state = {"dragLine":{'p1X':AD2.point1.X(),'p2X':AD2.point2.X(),
    //                      'p1Y':AD2.point1.Y(),'p2Y':AD2.point2.Y()},
    //          "staticLine":{'p1X':AD1.point1.X(),'p2X':AD1.point2.X(),
    //                        'p1Y':AD1.point1.Y(),'p2Y':AD1.point2.Y()}};
    // statestr = JSON.stringify(state);
    // console.log(statestr);

    return statestr;
}


createChannel(getGrade, getState, setState);


