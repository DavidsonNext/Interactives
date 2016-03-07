// Used as JSInput
(function(JXG, MacroLib) {
    'use strict';
    var brd1, AD1, AD2;

    function init() {
        MacroLib.init(MacroLib.ONE_BOARD);
        ////////////
        // BOARD 1
        ////////////
        brd1 = MacroLib.createBoard('jxgbox1', {
            bboxlimits: [-1.5, 12, 12, -1],
            xname: 'RGDP',
            yname: 'PL'
        });

        //Supply Line 1 - fixed
        var Supply = MacroLib.createLine(brd1, {
            ltype: 'Supply',
            name: 'SRAS',
            color: 'gray'
        });

        //Demand Line 1 - fixed
        AD1 = MacroLib.createLine(brd1, {
            ltype: 'Demand',
            name: 'AD<sub>1</sub>',
            color: 'gray'
        });
        AD1.setAttribute({
            dash: 1
        });

        //Demand Line 2 - moveable
        AD2 = MacroLib.createLine(brd1, {
            ltype: 'Demand',
            name: 'AD<sub>2</sub>',
            color: 'dodgerblue'
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
        var iSDfix = brd1.create('intersection', [AD1, Supply, 0], {
            visible: false
        });
        var iS2D = brd1.create('intersection', [AD2, Supply, 0], {
            visible: false
        });

        ////////////
        // Dashes for fixed Line
        ////////////
        var dashB1 = MacroLib.createDashedLines2Axis(brd1, iSDfix, {
            withLabel: true,
            xlabel: '',
            ylabel: 'PL<sub>1</sub>',
            color: 'gray'
        });

        ////////////
        // Dashes for draggable Moveable Line
        ////////////
        var dashS2 = MacroLib.createDashedLines2Axis(brd1, iS2D, {
            fixed: false,
            withLabel: false,
            xlabel: '',
            ylabel: 'PL<sub>2</sub>',
            color: 'dodgerblue'
        });

        //////////////////
        // Interactivity
        //////////////////
        AD2.on('down', function() {
            AD2.setAttribute({
                withLabel: true
            });
            dashS2.Y1.setAttribute({
                withLabel: true
            });
            brd1.update();
        });

        AD2.on('drag', function() {
            dashS2.Y1.moveTo([0, iS2D.Y()]);
            dashS2.Y2.moveTo([iS2D.X(), iS2D.Y()]);

            dashS2.X1.moveTo([iS2D.X(), 0]);
            dashS2.X2.moveTo([iS2D.X(), iS2D.Y()]);
        });
    }

    ////////////////////////
    // External DOM button
    ////////////////////////
    var resetAnimationBtn = document.getElementById('resetAnimationBtn');

    resetAnimationBtn.addEventListener('click', function() {
        JXG.JSXGraph.freeBoard(brd1);
        init();
    });

    init();
    MacroLib.onLoadPostMessage();

    //Standard edX JSinput functions
    function setState(transaction, statestr) {
        var state = JSON.parse(statestr);

        if (state.dragLine) {
            brd1.removeObject('AD2');
            var point1 = [state.dragLine.p1X, state.dragLine.p1Y];
            var point2 = [state.dragLine.p2X, state.dragLine.p2Y];

            //Demand Line 2 - moveable
            AD2.point1.moveTo(point1, 0);
            AD2.point2.moveTo(point2, 0);

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

    //Standard edX JSinput functions
    function getGrade() {
        var state = {
            dragLine: {
                p1X: AD2.point1.X(),
                p2X: AD2.point2.X(),
                p1Y: AD2.point1.Y(),
                p2Y: AD2.point2.Y()
            },
            staticLine: {
                p1X: AD1.point1.X(),
                p2X: AD1.point2.X(),
                p1Y: AD1.point1.Y(),
                p2Y: AD1.point2.Y()
            }
        };
        var statestr = JSON.stringify(state);
        return statestr;
    }

    MacroLib.createChannel(getGrade, getState, setState);

})(JXG, MacroLib, undefined);
