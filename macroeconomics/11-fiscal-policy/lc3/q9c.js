(function(JXG, MacroLib) {
    'use strict';
    var brd1;

    function init() {
        MacroLib.init(MacroLib.ONE_BOARD);

        brd1 = MacroLib.createBoard('jxgbox1', {
            bboxlimits: [-1.5, 12, 12, -2.0],
            xname: 'Real National<br>Income',
            yname: 'Price<br>Level',
            grid: false
        });

        //Sliders
        var sliderx = brd1.create('slider', [
            [3.0, -1.5],
            [8, -1.5],
            [0.0, 0, 1.4]
        ], {
            withLabel: false,
            snapWidth: 0.05,
            color: 'orange'
        });
        //Positive Slider Transformation
        var sliderXPositive = brd1.create('transform', [
            function() {
                return sliderx.Value();
            },
            function() {
                return sliderx.Value();
            }
        ], {
            type: 'translate'
        });

        //Supply Line 1 - fixed
        var SRAS1 = MacroLib.createLine(brd1, {
            ltype: 'Supply',
            name: 'SRAS',
            color: 'dodgerblue'
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
            withLabel: false,
            highlight: true,
            visible: true
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


        ////////////
        // Intersection Box 1
        ////////////
        var iSDfix = brd1.create('intersection', [AD1, SRAS1, 0], {
            visible: false
        });
        var iSD = brd1.create('intersection', [SRAS1, AD2, 0], {
            visible: false
        });


        ////////////
        // Fixed Dashed Lines for Board 1
        ////////////
        var dashesFixedB1 = MacroLib.createDashedLines2Axis(brd1, iSDfix, {
            withLabel: true,
            xlabel: 'RGDP<sub>1</sub>',
            ylabel: 'PL<sub>1</sub>',
            color: 'darkgray'
        });

        ////////////
        // Dashes for Demand and Supply
        ////////////
        var dashesSD = MacroLib.createDashedLines2Axis(brd1, iSD, {
            withLabel: false,
            xlabel: 'RGDP<sub>2</sub>',
            ylabel: 'PL<sub>2</sub>',
            color: 'orange'
        });


        //////////////////
        // Interactivity
        //////////////////
        sliderx.on('down', function() {
            AD2.setAttribute({
                withLabel: true
            });
            dashesSD.Y1.setAttribute({
                withLabel: true
            });
            dashesSD.X1.setAttribute({
                withLabel: true
            });
            brd1.update();
        });

        sliderx.on('drag', function() {
            //Moving Dashed Lines for Demand/Supply
            dashesSD.Y1.moveTo([0, iSD.Y()]);
            dashesSD.Y2.moveTo([iSD.X(), iSD.Y()]);

            dashesSD.X1.moveTo([iSD.X(), 0]);
            dashesSD.X2.moveTo([iSD.X(), iSD.Y()]);

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
    MacroLib.onLoadPostMessage();

})(JXG, MacroLib, undefined);
