var Macro = (function(JXG, MacroLib) {
  'use strict';
  var brd1;

  function init() {
    MacroLib.init(MacroLib.ONE_BOARD);
    ////////////
    // BOARD 1
    ////////////
    var bboxlimits = [-1.5, 12, 12, -1.2];
    brd1 = JXG.JSXGraph.initBoard('jxgbox1', {axis:false,
                                            showCopyright: false,
                                            showNavigation: false,
                                            zoom: false,
                                            pan: false,
                                            boundingbox:bboxlimits,
                                            grid: false,
                                            hasMouseUp: true,
    });

    var xaxis1 = brd1.create('axis', [[0, 0], [11, 0]], {withLabel: false});
    var yaxis1 = brd1.create('axis', [[0, 0], [0, 11]], {withLabel: false});

    //Axes
    xaxis1.removeAllTicks();
    yaxis1.removeAllTicks();

    var xlabel1 = brd1.create('text',[9,-0.5,"Real GDP"],{fixed:true});
    var ylabel1 = brd1.create('text',[-1.2,10,"Price<br>Level"],{fixed:true});

    //Supply Line 1 - fixed
    var SRAS1 = MacroLib.createSupply(brd1,{name:'SRAS<sub>1</sub>',color:'DodgerBlue'});
    SRAS1.setAttribute({'dash':1,'fixed':true,'highlight':false});

    //Supply Line 2 - moveable
    var SRAS2 = MacroLib.createSupply(brd1,{name:'SRAS<sub>2</sub>',color:'DodgerBlue'});
    SRAS2.setAttribute({withLabel:false});

    //Demand Line 1 - fixed
    var AD1 = MacroLib.createDemand(brd1,{name:'AD<sub>1</sub>',color:'Orange'});
    AD1.setAttribute({'dash':1,'fixed':true,'highlight':false});

    //Demand Line 2 - moveable
    var AD2 = MacroLib.createDemand(brd1,{name:'AD<sub>2</sub>',color:'Orange'});
    AD2.setAttribute({withLabel:false});


    ////////////
    // Intersection Box 1
    ////////////
    var iSDfix = brd1.create('intersection', [AD1, SRAS1, 0], {visible:false});
    var iS2D = brd1.create('intersection', [AD2, SRAS2, 0], {visible:false});

    ////////////
    // Draggable Dashed Lines for Board 1
    ////////////
    var dashS2 = MacroLib.createDashedLines2Axis(brd1,iS2D,
                                      {fixed:true,
                                       withLabel:false,
                                       xlabel:'Y<sub>2</sub>',
                                       ylabel:'PL<sub>2</sub>',
                                       color:'Orange'});

    ////////////
    // Fixed Dashed Lines for Board 1
    ////////////
    var dashesFixedB1 = MacroLib.createDashedLines2Axis(brd1,iSDfix,
                                              {fixed:true,
                                               withLabel:true,
                                               xlabel:'rY<sub>1</sub>',
                                               ylabel:'PL<sub>1</sub>',
                                               color:'DodgerBlue'});

    ////////////
    //LRAS - straight line
    ////////////
    var LRAS = brd1.create('segment',[[7.0,11.0],[7.0,0.0]],
                           {'strokeColor':'DarkGray','strokeWidth':'3',
                            'name':'LRAS','withLabel':true, 'fixed':true,
                            'label':{'offset':[-15,200]}});
    var labelLRAS = brd1.create('text',[6.7,-0.4,"rY<sub>F</sub>"],{fixed:true});

    //////////////////
    // Interactivity
    //////////////////
    brd1.on('move', function() {
        //Moving Dashed Lines in Board 1
        dashS2.Y1.moveTo([0, iS2D.Y()]);
        dashS2.Y2.moveTo([iS2D.X(), iS2D.Y()]);

        dashS2.X1.moveTo([iS2D.X(), 0]);
        dashS2.X2.moveTo([iS2D.X(), iS2D.Y()]);

    });

    brd1.on('mousedown', function() {
        AD2.setAttribute({withLabel:true});
        SRAS2.setAttribute({withLabel:true});
        dashS2.Y1.setAttribute({withLabel:true});
        dashS2.X1.setAttribute({withLabel:true});
        brd1.update()
    });
  }

  /////////////////////////
  // External DOM button
  /////////////////////////
  var resetAnimationBtn = document.getElementById('resetAnimationBtn');

  resetAnimationBtn.addEventListener('click', function() {
      JXG.JSXGraph.freeBoard(brd1);
      init();
  });

  init();

  //Standard edX JSinput functions
  function setState(transaction, statestr){
      state = JSON.parse(statestr);
      console.log(statestr);
      //console.log(state["dragLine"]);

      if (state["AD2"] && state["SRAS2"]) {
          //brd1.removeObject('AD2');
          var point1 = [state["AD2"]["p1X"],state["AD2"]["p1Y"]];
          var point2 = [state["AD2"]["p2X"],state["AD2"]["p2Y"]]
          AD2.point1.moveTo(point1,0);
          AD2.point2.moveTo(point2,0);

          var point1 = [state["SRAS2"]["p1X"],state["SRAS2"]["p1Y"]];
          var point2 = [state["SRAS2"]["p2X"],state["SRAS2"]["p2Y"]]
          SRAS2.point1.moveTo(point1,0);
          SRAS2.point2.moveTo(point2,0);

          brd1.update();
      }

      console.debug('State updated successfully from saved.');
  }

  function getState(){
      var state = JSON.parse(getGrade());
      statestr = JSON.stringify(state);
      // console.log(statestr);
      return statestr;
  }

  function getGrade() {
      var state = {"AD2":{'p1X':AD2.point1.X(),'p2X':AD2.point2.X(),
                          'p1Y':AD2.point1.Y(),'p2Y':AD2.point2.Y()},
                   "AD1":{'p1X':AD1.point1.X(),'p2X':AD1.point2.X(),
                          'p1Y':AD1.point1.Y(),'p2Y':AD1.point2.Y()},
                   "SRAS2":{'p1X':SRAS2.point1.X(),'p2X':SRAS2.point2.X(),
                            'p1Y':SRAS2.point1.Y(),'p2Y':SRAS2.point2.Y()},
                   "SRAS1":{'p1X':SRAS1.point1.X(),'p2X':SRAS1.point2.X(),
                            'p1Y':SRAS1.point1.Y(),'p2Y':SRAS1.point2.Y()}
                  };
      statestr = JSON.stringify(state);
      return statestr;
  }

  MacroLib.createChannel(getGrade, getState, setState);

  return {
      setState: setState,
      getState: getState,
      getGrade
  };
})(JXG, MacroLib, undefined);
