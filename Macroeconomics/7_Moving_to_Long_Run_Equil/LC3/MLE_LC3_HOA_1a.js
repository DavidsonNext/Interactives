var Macro = (function(JXG, MacroLib) {
    'use strict';
    var brd1;

    function init() {
        MacroLib.init(MacroLib.ONE_BOARD);
        ////////////
        // BOARD 1
        ////////////
        brd1 = MacroLib.createBoard('jxgbox1', {
            bboxlimits: [-1.5, 12, 12, -1],
            xname: 'Real GDP',
            yname: 'Price<br>Level'
        });

        //Supply Line 1 - fixed
        var SRAS1 = MacroLib.createSupply(brd1, {
            name: 'SRAS<sub>1</sub>',
            color: 'DodgerBlue'
        });
        SRAS1.setAttribute({
            'dash': 1,
            'fixed': true,
            'highlight': false
        });

        //Supply Line 2 - moveable
        var SRAS2 = MacroLib.createSupply(brd1, {
            name: 'SRAS<sub>2</sub>',
            color: 'DodgerBlue'
        });
        SRAS2.setAttribute({
            withLabel: false
        });

        //Demand Line 1 - fixed
        var AD1 = MacroLib.createDemand(brd1, {
            name: 'AD<sub>1</sub>',
            color: 'Orange'
        });
        AD1.setAttribute({
            'dash': 1,
            'fixed': true,
            'highlight': false
        });

        //Demand Line 2 - moveable
        var AD2 = MacroLib.createDemand(brd1, {
            name: 'AD<sub>2</sub>',
            color: 'Orange'
        });
        AD2.setAttribute({
            withLabel: false
        });


        ////////////
        // Intersection Box 1
        ////////////
        var iSDfix = brd1.create('intersection', [AD1, SRAS1, 0], {
            visible: false
        });
        var iS2D = brd1.create('intersection', [AD2, SRAS2, 0], {
            visible: false
        });

        ////////////
        // Draggable Dashed Lines for Board 1
        ////////////
        var dashS2 = MacroLib.createDashedLines2Axis(brd1, iS2D, {
            fixed: false,
            withLabel: false,
            xlabel: 'Y<sub>2</sub>',
            ylabel: 'PL<sub>2</sub>',
            color: 'Orange'
        });

        ////////////
        // Fixed Dashed Lines for Board 1
        ////////////
        var dashesFixedB1 = MacroLib.createDashedLines2Axis(brd1, iSDfix, {
            withLabel: true,
            xlabel: 'rY<sub>1</sub>',
            ylabel: 'PL<sub>1</sub>',
            color: 'DodgerBlue'
        });

        ////////////
        //LRAS - straight line
        ////////////
        var LRAS = brd1.create('segment', [
            [3.0, 11.0],
            [3.0, 0.0]
        ], {
            'strokeColor': 'DarkGray',
            'strokeWidth': '3',
            'name': 'LRAS',
            'withLabel': true,
            'fixed': true,
            'label': {
                'offset': [-15, 200]
            }
        });
        var labelLRAS = brd1.create('text', [2.7, -0.4, 'rY<sub>F</sub>'], {
            fixed: true
        });


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
            AD2.setAttribute({
                withLabel: true
            });
            SRAS2.setAttribute({
                withLabel: true
            });
            dashS2.Y1.setAttribute({
                withLabel: true
            });
            dashS2.X1.setAttribute({
                withLabel: true
            });
            brd1.update();
        });
    }

    /////////////////////////
    // External DOM buttons
    /////////////////////////
    var resetAnimationBtn = document.getElementById('resetAnimationBtn');

    resetAnimationBtn.addEventListener('click', function() {
        JXG.JSXGraph.freeBoard(brd1);
        init();
    });

    init();

})(JXG, MacroLib, undefined);
