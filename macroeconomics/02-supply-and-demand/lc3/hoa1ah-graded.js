// Used as JSInput
(function(JXG, MacroLib) {
    'use strict';
    var leftComponents = {el: 'jxgbox1'}, rightComponents = {el: 'jxgbox2'};

    function initBoard(c, moveableDemand, moveableSupply) {
        var demandSliderY = -2.0, supplySliderY = -2.0;

        MacroLib.init(MacroLib.TWO_BOARDS);
        MacroLib.labelOffset({
            X: 100,
            Y: 75
        });

        c.board = MacroLib.createBoard(c.el, {
            bboxlimits: [-2, 12, 12, -4],
            xname: 'Quantity',
            yname: 'Price'
        });

        // Demand Line 1 - fixed
        c.demandLine1 = MacroLib.createLine(c.board, {
            ltype: 'Demand',
            name: 'D<sub>1</sub>',
            color: 'dodgerblue'
        });
        c.demandLine1.setAttribute({
            dash: 1
        });

        // Demand Line 2 - moveable
        c.demandLine2 = MacroLib.createLine(c.board, {
            ltype: 'Demand',
            name: 'D<sub>2</sub>',
            color: 'dodgerblue'
        });
        c.demandLine2.setAttribute({
            withLabel: false
        });

        // Supply Line 1 - fixed
        c.supplyLine1 = MacroLib.createLine(c.board, {
            ltype: 'Supply',
            name: 'S<sub>1</sub>',
            color: 'orange'
        });
        c.supplyLine1.setAttribute({
            dash: 1
        });

        // Supply Line 2 - moveable
        c.supplyLine2 = MacroLib.createLine(c.board, {
            ltype: 'Supply',
            name: 'S<sub>2</sub>',
            color: 'orange'
        });
        c.supplyLine2.setAttribute({
            withLabel: false
        });

        // Intersection of Demand Line 1 and Supply line 1 - fixed
        c.intersection1 = c.board.create('intersection', [c.demandLine1, c.supplyLine1, 0], {
            withLabel: false,
            visible: true
        });

        // Intersection of Demand Line 2 and Supply line 2 - moveable
        c.intersection2 = c.board.create('intersection', [c.demandLine2, c.supplyLine2, 0], {
            withLabel: false,
            visible: false
        });

        // Dashes to x, y axes for intersection 1
        c.dashes1 = MacroLib.createDashedLines2Axis(c.board, c.intersection1, {
            withLabel: true,
            xlabel: 'Q<sub>1</sub>',
            ylabel: 'P<sub>1</sub>',
            color: 'gray'
        });

        // Dashes to x, y axes for intersection 2
        c.dashes2 = MacroLib.createDashedLines2Axis(c.board, c.intersection2, {
            withLabel: true,
            xlabel: 'Q<sub>2</sub>',
            ylabel: 'P<sub>2</sub>',
            color: 'gray'
        });
        dashedLinesVisibility(c.dashes2, false);

        // Create a board with two sliders
        if (moveableDemand && moveableSupply) {
            demandSliderY = -2.0;
            supplySliderY = -3.25;
        }
        else {
            if (moveableDemand) {
                demandSliderY = -2.0;
            }
            else if (moveableSupply) {
                supplySliderY = -2.0;
            }
        }

        if (moveableDemand) {
            // Demand Slider
            c.demandSlider = c.board.create('slider', [
                [3.75, demandSliderY],
                [7.75, demandSliderY],
                [-1.0, 0.0, 1.0]
            ], {
                withLabel: false,
                snapWidth: 0.01,
                color: 'dodgerblue'
            });
            c.demandSliderText = c.board.create(
                'text',
                [3.25, demandSliderY,'&Delta;D'],
                {strokeColor: 'dodgerblue', anchorX: 'right', anchorY: 'middle'}
            );
            c.demandSlider.on('down', function() {
                demandSliderMouseDown(c)
            });
            c.demandSlider.on('drag', function() {
                demandSliderMouseDrag(c)
            });
        }

        if (moveableSupply) {
            // Supply Slider
            c.supplySlider = c.board.create('slider', [
                [3.75, supplySliderY],
                [7.75, supplySliderY],
                [-1.0, 0.0, 1.0]
            ], {
                withLabel: false,
                snapWidth: 0.01,
                color: 'orange'
            });
            c.supplySliderText = c.board.create(
                'text',
                [3.25, supplySliderY,'&Delta;S'],
                {strokeColor: 'orange', anchorX: 'right', anchorY: 'middle'}
            );
            c.supplySlider.on('down', function() {
                supplySliderMouseDown(c)
            });
            c.supplySlider.on('drag', function() {
                supplySliderMouseDrag(c);
            });
        }
    }

    function init() {
        initBoard(leftComponents, true, false);
        initBoard(rightComponents, false, true);
    }

    function demandSliderMouseDown(c) {
        if (c.supplySlider && c.supplySlider.Value() !== 5.75) {
            shiftSupply(c.board, c.supplyLine1, c.supplyLine2, c.dashes2, c.intersection2, [0, 0]);
            // Set slider to initial position
            c.supplySlider.setGliderPosition(0.5);
        }
        c.demandLine2.setAttribute({
            withLabel: true,
            offset: [125, -85]
        });
        c.intersection2.showElement();
        dashedLinesVisibility(c.dashes2, true);
    }

    function demandSliderMouseDrag(c) {
        var t = c.demandSlider.Value();
        shiftDemand(c.board, c.demandLine1, c.demandLine2, c.dashes2, c.intersection2, [t, t]);
    }

    function supplySliderMouseDown(c) {
        if (c.demandSlider && c.demandSlider.Value() !== 5.75) {
            shiftDemand(c.board, c.demandLine1, c.demandLine2, c.dashes2, c.intersection2, [0, 0]);
            // Set slider to initial position
            c.demandSlider.setGliderPosition(0.5);
        }
        c.supplyLine2.setAttribute({
            withLabel: true,
            offset: [125, -85]
        });
        c.intersection2.showElement();
        dashedLinesVisibility(c.dashes2, true);
    }

    function supplySliderMouseDrag(c) {
        var t = c.supplySlider.Value();
        shiftSupply(c.board, c.supplyLine1, c.supplyLine2, c.dashes2, c.intersection2, [t, -t]);
    }

    // Map the slider values in [slider._smin, slider._smax] to [0, 1]
    // This is used to set the slider value directly via the glider.
    function normalizeSliderValue(slider, value) {
        return (value - slider._smin) / (slider._smax - slider._smin);
    }

    /////////////////////////
    // External DOM buttons
    /////////////////////////
    var resetAnimation1Btn = document.getElementById('resetAnimation1Btn');
    var resetAnimation2Btn = document.getElementById('resetAnimation2Btn');

    //Interactivity
    if (resetAnimation1Btn) {
        resetAnimation1Btn.addEventListener('click', resetAnimation1);
    }
    if (resetAnimation2Btn) {
        resetAnimation2Btn.addEventListener('click', resetAnimation2);
    }

    // Demand lines are y = ax + b with a = -1 and b = 11.5. Middle of line segment: (5.75, 5.75)
    // Supply lines are y = ax + b with a = 1 and b = 0. Middle of line segment: (5.75, 5.75)

    function resetAnimation1() {
        JXG.JSXGraph.freeBoard(leftComponents.board);
        initBoard(leftComponents, true, false);
    }

    function resetAnimation2() {
        JXG.JSXGraph.freeBoard(rightComponents.board);
        initBoard(rightComponents, false, true);
    }

    function shiftDemand(board, demandLine1, demandLine2, dashes2, intersection2, trans) {
        var destPt1 = board.create('point', [demandLine1.point1.X() + trans[0], demandLine1.point1.Y() + trans[1]], {
                visible: false
            }),
            destPt2 = board.create('point', [demandLine1.point2.X() + trans[0], demandLine1.point2.Y() + trans[1]], {
                visible: false
            });
        moveLine(demandLine2, destPt1, destPt2, 0);
        moveDashedLines(dashes2, intersection2, 0);
        board.update();
    }

    function shiftSupply(board, supplyLine1, supplyLine2, dashes2, intersection2, trans) {
        var destPt1 = board.create('point', [supplyLine1.point1.X() + trans[0], supplyLine1.point1.Y() + trans[1]], {
                visible: false
            }),
            destPt2 = board.create('point', [supplyLine1.point2.X() + trans[0], supplyLine1.point2.Y() + trans[1]], {
                visible: false
            });
        moveLine(supplyLine2, destPt1, destPt2, 0);
        moveDashedLines(dashes2, intersection2, 0);
        board.update();
    }

    function movePoint(point, destPt, animDuration) {
        var duration = (typeof animDuration === 'undefined') ? 1000 : animDuration;

        point.moveTo([destPt.X(), destPt.Y()], duration);
    }

    function moveLine(line, destPt1, destPt2, animDuration) {
        var duration = (typeof animDuration === 'undefined') ? 1000 : animDuration;

        movePoint(line.point1, destPt1, animDuration);
        movePoint(line.point2, destPt2, animDuration);
    }

    function moveDashedLines(dashedLines, destPt, animDuration) {
        var duration = (typeof animDuration === 'undefined') ? 1000 : animDuration;

        dashedLines.X1.moveTo([destPt.X(), 0], duration);
        dashedLines.X2.moveTo([destPt.X(), destPt.Y()], duration);
        dashedLines.Y1.moveTo([0, destPt.Y()], duration);
        dashedLines.Y2.moveTo([destPt.X(), destPt.Y()], duration);
    }

    function dashedLinesVisibility(dashedLines, vis) {
        if (vis) {
            dashedLines.X1.showElement();
            dashedLines.XLine.showElement();
            dashedLines.Y1.showElement();
            dashedLines.YLine.showElement();
        }
        else {
            dashedLines.X1.hideElement();
            dashedLines.XLine.hideElement();
            dashedLines.Y1.hideElement();
            dashedLines.YLine.hideElement();
        }
    }

    // Standard edX JSinput functions.
    // These are adapted to a left board containing only a demand slider and to
    // a right board containing only a supply slider.
    function setState(transaction, stateStr) {
        var state = JSON.parse(stateStr);

        if (state.demand) {
            if (state.demand !== 0.0) {
                leftComponents.demandSlider.setGliderPosition(normalizeSliderValue(
                    leftComponents.demandSlider, state.demand)
                );
                demandSliderMouseDown(leftComponents);
                demandSliderMouseDrag(leftComponents);
            }
        }
        if (state.supply) {
            if (state.supply !== 0.0) {
                rightComponents.supplySlider.setGliderPosition(normalizeSliderValue(
                    rightComponents.supplySlider, state.supply)
                );
                supplySliderMouseDown(rightComponents);
                supplySliderMouseDrag(rightComponents);
            }
        }
        console.info('State updated successfully from saved.');
    }

    function getState() {
        var state = {
            demand: leftComponents.demandSlider.Value(),
            supply: rightComponents.supplySlider.Value()
        };
        console.info('State successfully saved.');
        return JSON.stringify(state);
    }

    function getGrade() {
        return getState();
    }

    init();
    MacroLib.onLoadPostMessage();
    MacroLib.createChannel(getGrade, getState, setState);

})(JXG, MacroLib, undefined);
