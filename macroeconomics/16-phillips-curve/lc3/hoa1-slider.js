(function(JXG, MacroLib) {
    'use strict';
    var brd1, brd2;

    function init() {
        MacroLib.init(MacroLib.TWO_BOARDS);
        JXG.Options.text.fontSize = 13;

        ////////////
        // BOARD 1
        ////////////
        brd1 = MacroLib.createBoard('jxgbox1', {
            bboxlimits: [-1.5, 12, 12, -1.5],
            xname: 'Real GDP',
            yname: 'PL',
            grid: false
        });

        //Sliders
        var slidery = brd1.create('slider', [
            [-1.0, 2.0],
            [-1.0, 8],
            [-1.0, 0, 2.0]
        ], {
            withLabel: false,
            snapWidth: 0.05,
            color: 'lime'
        });

        var sliderx = brd1.create('slider', [
            [2.0, -0.8],
            [8, -0.8],
            [-1.0, 0, 2.0]
        ], {
            withLabel: false,
            snapWidth: 0.05,
            color: 'orange'
        });

        //Positive Slider Transformation
        var sliderYPositive = brd1.create('transform', [
            function() {
                return -slidery.Value();
            },
            function() {
                return 0.0;
            }
        ], {
            type: 'translate'
        });

        //Positive Slider Transformation
        var sliderXPositive = brd1.create('transform', [
            function() {
                return sliderx.Value();
            },
            function() {
                return 0.0;
            }
        ], {
            type: 'translate'
        });


        //Supply Line 1 - fixed
        var S1B1 = MacroLib.createLine(brd1, {
            ltype: 'Supply',
            name: 'SRAS<sub>1</sub>',
            color: 'lime'
        });
        S1B1.setAttribute({
            dash: 1
        });

        //Supply Line 2 - moveable
        var S2B1 = MacroLib.createTransformLine(brd1, {
            transformList: [sliderYPositive],
            ltype: 'Supply',
            name: 'SRAS<sub>2</sub>',
            color: 'lime'
        });
        S2B1.setAttribute({
            withLabel: false
        });

        //Demand Line 1 - fixed
        var AD1 = MacroLib.createLine(brd1, {
            ltype: 'Demand',
            name: 'AD<sub>1</sub>',
            color: 'orange'
        });
        AD1.setAttribute({
            dash: 1
        });

        //Demand Line 2 - moveable
        var AD2 = MacroLib.createTransformLine(brd1, {
            transformList: [sliderXPositive],
            ltype: 'Demand',
            name: 'AD<sub>2</sub>',
            color: 'orange'
        });
        AD2.setAttribute({
            withLabel: false
        });

        //LRAS - fixed
        var LRAS = MacroLib.createLine(brd1, {
            ltype: 'Vertical',
            name: 'LRAS',
            color: 'dodgerblue'
        });
        LRAS.setAttribute({
            withLabel: true,
            strokeWidth: 3
        });

        ////////////
        // Intersection Box 1
        ////////////
        var iSDfix = brd1.create('intersection', [AD1, S1B1, 0], {
            visible: false
        });
        var iS2D = brd1.create('intersection', [AD2, S1B1, 0], {
            visible: false
        });
        var iSLB1 = brd1.create('intersection', [LRAS, S2B1, 0], {
            visible: false
        });

        ////////////
        // Dashes for fixed Line
        ////////////
        var dashesB1fixed = MacroLib.createDashedLines2Axis(brd1, iSDfix, {
            withLabel: true,
            xlabel: 'rY<sub>1</sub>',
            xoffsets: [15, 25],
            ylabel: 'PL<sub>1</sub>',
            yoffsets: [30, 15],
            color: 'gray'
        });

        ////////////
        // Dashes for draggable Moveable Line
        ////////////
        var dashesB1 = MacroLib.createDashedLines2Axis(brd1, iS2D, {
            withLabel: true,
            xlabel: 'rY<sub>2</sub>',
            xoffsets: [15, 25],
            ylabel: 'PL<sub>2</sub>',
            yoffsets: [30, 15],
            color: 'orange'
        });

        dashesB1.Y1.setAttribute({
            visible: false
        });
        dashesB1.X1.setAttribute({
            visible: false
        });
        dashesB1.XLine.setAttribute({
            visible: false
        });
        dashesB1.YLine.setAttribute({
            visible: false
        });

        ////////////
        // Dashes for draggable SRAS2
        ////////////
        var dashesLRASB1 = MacroLib.createDashedLines2Axis(brd1, iSLB1, {
            withLabel: true,
            xlabel: '',
            xoffsets: [5, 15],
            ylabel: 'PL<sub>3</sub>',
            yoffsets: [30, 15],
            color: 'lime'
        });

        dashesLRASB1.X1.setAttribute({
            visible: false
        });
        dashesLRASB1.Y1.setAttribute({
            visible: false
        });
        dashesLRASB1.XLine.setAttribute({
            visible: false
        });
        dashesLRASB1.YLine.setAttribute({
            visible: false
        });

        ////////////
        // BOARD 2
        ////////////
        brd2 = MacroLib.createBoard('jxgbox2', {
            bboxlimits: [-2.75, 12, 12, -1.5],
            xname: 'UR',
            yname: 'Inflation<br>Rate',
            grid: false
        });

        //////////
        // Connect Boards and Movement
        //////////
        brd1.addChild(brd2);


        //COMPLICATED TRANSFORM USING REFLECTION
        var refLine = brd2.create('line', [
            [10, 0],
            [10, 12]
        ], {
            dash: 1,
            visible: false
        });
        var reflectBrd2 = brd2.create('transform', [refLine], {
            type: 'reflect'
        });
        var shiftC = brd2.create('transform', [8.5, 0], {
            type: 'translate'
        });
        var C2 = brd2.create('point', [S2B1.point1, [shiftC, reflectBrd2]], {
            name: 'C2',
            visible: false
        });

        var shiftD = brd2.create('transform', [8.5, 0], {
            type: 'translate'
        });
        var D2 = brd2.create('point', [S2B1.point2, [shiftD, reflectBrd2]], {
            name: 'D2',
            visible: false
        });

        //SRPC - moveable
        var SRPC2 = brd2.create('segment', [C2, D2], {
            name: 'SRPC<sub>2</sub>',
            fixed: false,
            withLabel: false,
            strokeWidth: 5,
            strokeColor: 'lime',
            label: {
                offset: [95, -95]
            }
        });

        var gr2 = brd2.create('group', [C2, D2]);

        //SRPC - fixed
        var SRPC1 = MacroLib.createLine(brd2, {
            ltype: 'Demand',
            name: 'SRPC<sub>1</sub>',
            color: 'dodgerblue'
        });

        //LRAS - fixed
        // var LRAS = createLine(brd2, {ltype: 'Vertical', name: 'LRPC', color: 'dodgerblue'})
        var LRPC = brd2.create('segment', [
            [6.25, 0.5],
            [6.25, 11.0]
        ], {
            strokeColor: 'dodgerblue',
            name: 'LRPC',
            withLabel: true,
            label: {
                offset: [-15, 130]
            }
        });
        LRPC.setAttribute({
            dash: 3,
            withLabel: true,
            highlight: true,
            strokeWidth: 2
        });

        //Intersection B2
        var iSDB2fix = brd2.create('intersection', [SRPC1, LRPC, 0], {
            name: 'A1',
            fillColor: 'dodgerblue',
            strokeColor: 'dodgerblue',
            withLabel: true,
            visible: true
        });

        //Intersection B2
        var iSLB2 = brd2.create('intersection', [SRPC2, LRPC, 0], {
            name: 'A3',
            fillColor: 'lime',
            strokeColor: 'lime',
            withLabel: true,
            visible: false
        });

        ////////////
        // Dashes for fixed SRPC1
        ////////////
        var dashesB2 = MacroLib.createDashedLines2Axis(brd2, iSDB2fix, {
            withLabel: true,
            xlabel: '5.0%',
            xoffsets: [18, 22],
            ylabel: '2.0%',
            color: 'dodgerblue'
        });

        ////////
        // Invisible axis line - allows us to move points up and down the SRPC1 curve
        // See the next intersection. DB2Y intersects with SRPC1
        ////////
        var fakeD = brd2.create('segment',
            [
                [0, function(x) {
                    return (iSDB2fix.Y() + sliderx.Value());
                }],
                [iSLB2.X(), function(x) {
                    return (iSDB2fix.Y() + sliderx.Value());
                }]
            ], {
                visible: false,
                withLabel: false,
                strokeColor: 'gray',
                strokeWidth: '2',
                dash: '0'
            });

        var iB2SRPC1 = brd2.create('intersection', [fakeD, SRPC1, 0], {
            name: 'A2',
            fillColor: 'orange',
            strokeColor: 'orange',
            withLabel: true,
            visible: false
        });

        ////////////
        // Dashes for moveable SRPC2
        ////////////
        var dashesA2B2 = MacroLib.createDashedLines2Axis(brd2, iB2SRPC1, {
            withLabel: true,
            xlabel: '',
            ylabel: '',
            color: 'orange'
        });

        dashesA2B2.Y1.setAttribute({
            visible: false
        });
        dashesA2B2.X1.setAttribute({
            visible: false
        });
        dashesA2B2.XLine.setAttribute({
            visible: false
        });
        dashesA2B2.YLine.setAttribute({
            visible: false
        });

        var sliderLabelB2X = brd2.create('text', [function(x) {
                return (iB2SRPC1.X() - 0.5);
            }, -0.5,
            function() {
                return (5.0 - sliderx.Value()).toFixed(1) + '%';
            }
        ], {
            visible: true
        });


        var sliderLabelB2Y = brd2.create('text', [-1.45,
            function(y) {
                return (iB2SRPC1.Y());
            },
            function() {
                return (2.0 + sliderx.Value()).toFixed(1) + '%';
            }
        ], {
            visible: false
        });


        //////////////////
        // Interactivity
        //////////////////
        sliderx.on('down', sliderDown);
        slidery.on('down', sliderDown);
        sliderx.on('drag', sliderDrag);
        slidery.on('drag', sliderDrag);

        function sliderDown() {
            // AD2.setAttribute({withLabel:true});
            // iB2SRPC.setAttribute({visible:true});

            AD2.setAttribute({
                withLabel: true
            });
            S2B1.setAttribute({
                withLabel: true
            });

            //First moveable drag lines
            dashesB1.Y1.setAttribute({
                visible: true
            });
            dashesB1.X1.setAttribute({
                visible: true
            });
            dashesB1.XLine.setAttribute({
                visible: true
            });
            dashesB1.YLine.setAttribute({
                visible: true
            });

            //Second moveable drag lines
            dashesLRASB1.Y1.setAttribute({
                visible: true
            });
            dashesLRASB1.X1.setAttribute({
                visible: true
            });
            dashesLRASB1.YLine.setAttribute({
                visible: true
            });
            dashesLRASB1.XLine.setAttribute({
                visible: true
            });

            brd1.update();

            // Board 2
            //First set of moveable lines
            dashesA2B2.Y1.setAttribute({
                visible: true
            });
            dashesA2B2.X1.setAttribute({
                visible: true
            });
            dashesA2B2.XLine.setAttribute({
                visible: true
            });
            dashesA2B2.YLine.setAttribute({
                visible: true
            });

            //Dynamic Labels
            sliderLabelB2Y.setAttribute({
                visible: true
            });

            SRPC2.setAttribute({
                withLabel: true
            });
            iB2SRPC1.setAttribute({
                visible: true
            });
            iSLB2.setAttribute({
                visible: true
            });
            brd2.update();
        }

        function sliderDrag() {
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
            brd1.update();

            //BOARD 2
            //Moving Point A2
            // DB2YP1.moveTo([0, iS2D.Y()]);
            // DB2YP2.moveTo([iB2SRPC1.X(),iS2D.Y()]);

            //Orange Dashed Lines Board 2
            dashesA2B2.Y1.moveTo([0, iB2SRPC1.Y()]);
            dashesA2B2.Y2.moveTo([iB2SRPC1.X(), iB2SRPC1.Y()]);
            dashesA2B2.X1.moveTo([iB2SRPC1.X(), 0]);
            dashesA2B2.X2.moveTo([iB2SRPC1.X(), iB2SRPC1.Y()]);

        }
    }

    /////////////////////////
    // External DOM button
    /////////////////////////
    var resetAnimationBtn = document.getElementById('resetAnimationBtn');

    resetAnimationBtn.addEventListener('click', function() {
        JXG.JSXGraph.freeBoard(brd1);
        JXG.JSXGraph.freeBoard(brd2);
        init();
    });

    init();
    MacroLib.onLoadPostMessage();

})(JXG, MacroLib, undefined);
