// Used as JSInput
(function(JXG, MacroLib) {
    'use strict';
    var brd1, AD1, AD2, SRAS1, SRAS2, iSD1, iSD2, dashS2;

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
        SRAS1 = MacroLib.createLine(brd1, {
            ltype: 'Supply',
            name: 'SRAS<sub>1</sub>',
            color: 'dodgerblue'
        });
        SRAS1.setAttribute({
            dash: 1
        });

        //Supply Line 2 - moveable
        SRAS2 = MacroLib.createLine(brd1, {
            ltype: 'Supply',
            name: 'SRAS<sub>2</sub>',
            color: 'dodgerblue'
        });
        SRAS2.setAttribute({
            withLabel: false,
            highlight: true,
            fixed: false
        });
        SRAS2.point1.setAttribute({
            fixed: false
        });
        SRAS2.point2.setAttribute({
            fixed: false
        });

        //Demand Line 1 - fixed
        AD1 = MacroLib.createLine(brd1, {
            ltype: 'Demand',
            name: 'AD<sub>1</sub>',
            color: 'orange'
        });
        AD1.setAttribute({
            dash: 1
        });

        //Demand Line 2 - moveable
        AD2 = MacroLib.createLine(brd1, {
            ltype: 'Demand',
            name: 'AD<sub>2</sub>',
            color: 'orange'
        });
        AD2.setAttribute({
            withLabel: false,
            highlight: true,
            fixed: false
        });
        AD2.point1.setAttribute({
            fixed: false
        });
        AD2.point2.setAttribute({
            fixed: false
        });

        ////////////
        // Intersection Box 1
        ////////////
        iSD1 = brd1.create('intersection', [AD1, SRAS1, 0], {
            visible: false
        });
        iSD2 = brd1.create('intersection', [AD2, SRAS2, 0], {
            visible: false
        });

        ////////////
        // Draggable Dashed Lines for Board 1
        ////////////
        dashS2 = MacroLib.createDashedLines2Axis(brd1, iSD2, {
            fixed: false,
            withLabel: false,
            xlabel: 'Y<sub>2</sub>',
            ylabel: 'PL<sub>2</sub>',
            color: 'orange'
        });

        ////////////
        // Fixed Dashed Lines for Board 1
        ////////////
        var dashesFixedB1 = MacroLib.createDashedLines2Axis(brd1, iSD1, {
            withLabel: true,
            xlabel: 'rY<sub>1</sub>',
            ylabel: 'PL<sub>1</sub>',
            color: 'dodgerblue'
        });

        ////////////
        //LRAS - straight line
        ////////////
        var LRAS = brd1.create('segment', [
            [5.75, 11.0],
            [5.75, 0.0]
        ], {
            strokeColor: 'darkgray',
            strokeWidth: '3',
            name: 'LRAS',
            withLabel: true,
            label: {
                offset: [-15, 200]
            }
        });
        var labelLRAS = brd1.create('text', [2.7, -0.4, 'rY<sub>F</sub>']);


        //////////////////
        // Interactivity
        //////////////////
        AD2.on('down', lineDown);
        AD2.on('drag', lineDrag);
        SRAS2.on('down', lineDown);
        SRAS2.on('drag', lineDrag);
    }

    function lineDrag() {
        //Moving Dashed Lines in Board 1
        dashS2.Y1.moveTo([0, iSD2.Y()]);
        dashS2.Y2.moveTo([iSD2.X(), iSD2.Y()]);

        dashS2.X1.moveTo([iSD2.X(), 0]);
        dashS2.X2.moveTo([iSD2.X(), iSD2.Y()]);
    }

    function lineDown() {
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
    }

    /////////////////////////
    // External DOM buttons
    /////////////////////////
    var resetAnimationBtn = document.getElementById('resetAnimationBtn');

    resetAnimationBtn.addEventListener('click', function() {
        JXG.JSXGraph.freeBoard(brd1);
        init();
    });

    //Standard edX JSinput functions
    function setState(transaction, statestr) {
        var state = JSON.parse(statestr);
        if (state.AD2 && state.SRAS2) {
            var point1 = [state.AD2.p1X, state.AD2.p1Y];
            var point2 = [state.AD2.p2X, state.AD2.p2Y];
            AD2.point1.moveTo(point1, 0);
            AD2.point2.moveTo(point2, 0);

            point1 = [state.SRAS2.p1X, state.SRAS2.p1Y];
            point2 = [state.SRAS2.p2X, state.SRAS2.p2Y];
            SRAS2.point1.moveTo(point1, 0);
            SRAS2.point2.moveTo(point2, 0);
            lineDown();
            lineDrag();

            brd1.update();
        }
        console.info('State updated successfully from saved.');
    }

    function getState() {
        var state = JSON.parse(getGrade());
        var statestr = JSON.stringify(state);
        console.info('State successfully saved.');
        return statestr;
    }

    function getGrade() {
        var state = {
            AD2: {
                p1X: AD2.point1.X(),
                p2X: AD2.point2.X(),
                p1Y: AD2.point1.Y(),
                p2Y: AD2.point2.Y()
            },
            SRAS2: {
                p1X: SRAS2.point1.X(),
                p2X: SRAS2.point2.X(),
                p1Y: SRAS2.point1.Y(),
                p2Y: SRAS2.point2.Y()
            },
            iSD1: {
                X: iSD1.X(),
                Y: iSD1.Y()
            },
            iSD2: {
                X: iSD2.X(),
                Y: iSD2.Y()
            }
        };
        var statestr = JSON.stringify(state);
        return statestr;
    }

    init();
    MacroLib.onLoadPostMessage();
    MacroLib.createChannel(getGrade, getState, setState);

})(JXG, MacroLib, undefined);
