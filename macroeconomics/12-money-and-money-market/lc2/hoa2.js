(function(JXG, MacroLib) {
    'use strict';
    var brd1, AD2, G;

    function init() {
        MacroLib.init(MacroLib.ONE_BOARD);
        ////////////
        // brd1 1
        ////////////
        brd1 = MacroLib.createBoard('jxgbox1', {
            bboxlimits: [-2.5, 12, 12, -2],
            xname: 'Quantity<br>of Money',
            yname: 'Nominal<br>Interest<br>Rate'
        });

        //Demand Line 1 - fixed
        var AD1 = MacroLib.createLine(brd1, {
            ltype: 'Demand',
            color: 'gray'
        });
        AD1.setAttribute({
            dash: 1
        });

        //Demand Line 2 - moveable
        var AD2 = MacroLib.createLine(brd1, {
            ltype: 'Demand',
            name: 'D<sub>m</sub>',
            color: 'dodgerblue'
        });
        AD2.setAttribute({
            withLabel: true,
            highlight: true
        });

        var original = AD2;

        G = brd1.create('glider', [6.75, 6.75, AD2], {
            name: 'A'
        });

        brd1.on('down', function() {
            brd1.update();
        });
    }

    //Animation for shifting curve SouthWest
    function decreaseXY() {
        resetAnimation();
        brd1.update();
        AD2.point1.moveTo([1.0, 8.5], 1000);
        AD2.point2.moveTo([8.5, 1.0], 1000);
        brd1.update();
    }

    //Animation for shifting curve NorthEast
    function increaseXY() {
        resetAnimation();
        brd1.update();
        AD2.point1.moveTo([3.0, 10.5], 1000);
        AD2.point2.moveTo([10.5, 3.0], 1000);
        brd1.update();
    }

    function increaseA() {
        resetAnimation();
        brd1.update();
        G.moveTo([4.0, 8.0], 1000);
        brd1.update();
    }

    function decreaseA() {
        resetAnimation();
        brd1.update();
        G.moveTo([8.0, 4.0], 1000);
        brd1.update();
    }

    function resetAnimation() {
        JXG.JSXGraph.freeBoard(brd1);
        init();
    }

    /////////////////////////
    // External DOM buttons
    /////////////////////////
    var animationEconomicsEffectBtn = document.getElementById('animationEconomicsEffectBtn');
    var resetAnimationBtn = document.getElementById('resetAnimationBtn');

    //Interactivity
    animationEconomicsEffectBtn.addEventListener('click', increaseA);
    resetAnimationBtn.addEventListener('click', resetAnimation);

    init();
    MacroLib.onLoadPostMessage();

})(JXG, MacroLib, undefined);
