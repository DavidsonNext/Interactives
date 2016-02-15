var Macro = (function(JXG, MacroLib) {
    'use strict';
    var brd1, AD1, AD2, SRAS1, SRAS2;

    function init() {
        MacroLib.init(MacroLib.ONE_BOARD);
        ////////////
        // BOARD 1
        ////////////
        brd1 = MacroLib.createBoard('jxgbox1', {
            bboxlimits: [-1.5, 12, 12, -1.2],
            xname: 'Real GDP',
            yname: 'Price<br>Level'
        });

        //Supply Line 1 - fixed
        SRAS1 = MacroLib.createLine(brd1, {
            ltype: 'Supply',
            name: 'SRAS<sub>1</sub>',
            color: 'DodgerBlue'
        });
        SRAS1.setAttribute({
            dash: 1,
            fixed: true
        });

        //Supply Line 2 - fixed
        SRAS2 = MacroLib.createLine(brd1, {
            ltype: 'Supply',
            name: 'SRAS<sub>2</sub>',
            color: 'DodgerBlue'
        });
        SRAS2.setAttribute({
            withLabel: false
            fixed: true
        });

        //Demand Line 1 - fixed
        AD1 = MacroLib.createLine(brd1, {
            ltype: 'Demand',
            name: 'AD<sub>1</sub>',
            color: 'Orange'
        });
        AD1.setAttribute({
            dash: 1,
            fixed: true
        });

        //Demand Line 2 - fixed
        AD2 = MacroLib.createLine(brd1, {
            ltype: 'Demand',
            name: 'AD<sub>2</sub>',
            color: 'Orange'
        });
        AD2.setAttribute({
            withLabel: false,
            fixed: true
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
            fixed: true,
            withLabel: false,
            xlabel: 'Y<sub>2</sub>',
            ylabel: 'PL<sub>2</sub>',
            color: 'Orange'
        });

        ////////////
        // Fixed Dashed Lines for Board 1
        ////////////
        var dashesFixedB1 = MacroLib.createDashedLines2Axis(brd1, iSDfix, {
            fixed: true,
            withLabel: true,
            xlabel: 'rY<sub>1</sub>',
            ylabel: 'PL<sub>1</sub>',
            color: 'DodgerBlue'
        });

        ////////////
        //LRAS - straight line
        ////////////
        var LRAS = brd1.create('segment', [
            [7.0, 11.0],
            [7.0, 0.0]
        ], {
            strokeColor: 'DarkGray',
            strokeWidth: '3',
            name: 'LRAS',
            withLabel: true,
            fixed: true,
            label: {
                offset: [-15, 200]
            }
        });
        var labelLRAS = brd1.create('text', [6.7, -0.4, 'rY<sub>F</sub>'], {
            fixed: true
        });
    }

    init();
    MacroLib.onLoadPostMessage();

})(JXG, MacroLib, undefined);
