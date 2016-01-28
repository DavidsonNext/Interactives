(function($, _, JXG, undefined) {
    'use strict';

    var boundingBox = [-0.25, 1.5, 11.0, -1.5],
        config = window.superpositionTwoPulsesSettings || {
            forwardPulseWidth: 0.5,
            forwardPulseAmp: 0.5,
            backwardPulseWidth: 0.5,
            backwardPulseAmp: 0.5,
            c: 2.0
        },
        backwardPulseWidth = config.backwardPulseWidth,
        backwardPulseAmp = config.backwardPulseAmp,
        forwardPulseWidth = config.forwardPulseWidth,
        forwardPulseAmp = config.forwardPulseWidth,
        c = config.c,
        t = 0.0, tMin = 0.0, tMax = 5.0, tStep = 0.01,
        superpositionWaveBoard, superpositionWaveCurve,
        tSlider, tSliderValue, animateButton, backwardButton, forwardButton, animateIcon,
        isAnimating = false, anim;

    init();

    function init() {
        $(window).on('resize', resizeBox);
        $('#dnext-about-link').on('click', toggle);

        createSuperpositionWaveBoard();
        createSlider();
        updateGraph();

        animateButton = $('#animate');
        animateButton.on('click', animateButtonHandler);

        backwardButton = $('#backward');
        backwardButton.on('click', backwardButtonHandler);

        forwardButton = $('#forward');
        forwardButton.on('click', forwardButtonHandler);

        animateIcon = animateButton.children('i');
    }

    function resizeBox(){
        var containerWidth = $('.dnext-tool-container').width();
        superpositionWaveBoard.needsFullUpdate = true;
        superpositionWaveBoard.resizeContainer(containerWidth, superpositionWaveBoard.canvasHeight);
        superpositionWaveBoard.setBoundingBox(boundingBox);
        superpositionWaveBoard.update();
    }

    function toggle() {
        var link = $('#dnext-about-link'),
            text = $('#dnext-about-text');

        text.toggle();

        if (text.css('display') === 'none') {
            link.text('+ about');
        }
        else {
            text.css('display', 'block');
            link.text('- about');
        }
    }

    function createSlider() {
        tSliderValue = $('#t-slider-value');
        tSlider = $('#t-slider');
        tSlider.slider({
            min: tMin,
            max: tMax,
            step: tStep,
            value: t,
            slide: function(event, ui ) {
                tSliderValue.html(ui.value);
                t = ui.value;
                updateGraph();
            }
        });
    }

    function animateButtonHandler(event) {
        if (isAnimating) {
            stopAnimation();
        }
        else {
            startAnimation();
        }
        event.stopPropagation();
    }

    function backwardButtonHandler(event) {
        tSlider.slider('value', tSlider.slider('value') - tStep);
        updateAnimation();
    }

    function forwardButtonHandler(event) {
        tSlider.slider('value', tSlider.slider('value') + tStep);
        updateAnimation();
    }

    function forwardPulse(x) {
        return (0.0 <= x && x <= forwardPulseWidth) ? forwardPulseAmp : 0.0;
    }

    function backwardPulse(x) {
        return (10.0 <= x && x <= 10.0 + backwardPulseWidth) ? backwardPulseAmp : 0.0;
    }

    function forwardWave(x) {
        return forwardPulse(x - c*t);
    }

    function backwardWave(x) {
        return backwardPulse(x + c*t);
    }

    function superpositionWave(x) {
        return forwardWave(x) + backwardWave(x);
    }

    function startAnimation() {
        if (!isAnimating) {
            if (tSlider.slider('value') === tMax) {
                tSlider.slider('value', tMin);
                animateIcon.removeClass('fa-pause fa-backward');
                animateIcon.addClass('fa-play');
                updateAnimation();
            }
            else {
                animateIcon.removeClass('fa-play fa-backward');
                animateIcon.addClass('fa-pause');
                isAnimating = true;
                animate();
            }
        }
    }

    function stopAnimation() {
        if (tSlider.slider('value') === tMax) {
            animateIcon.removeClass('fa-pause fa-play');
            animateIcon.addClass('fa-backward');
        }
        else {
            animateIcon.removeClass('fa-pause fa-backward');
            animateIcon.addClass('fa-play');
        }
        isAnimating = false;
        cancelAnimationFrame(anim);
    }

    function updateAnimation() {
        t = tSlider.slider('value');
        tSliderValue.html(t);
        updateGraph();
    }

    function animate() {
        anim = requestAnimationFrame(animate);
        tSlider.slider('value', tSlider.slider('value') + tStep);
        if (tSlider.slider('value') === tMax) {
            stopAnimation();
        }
        updateAnimation();
    }

    function createSuperpositionWaveBoard() {
        JXG.Options.text.fontSize = 14;

        superpositionWaveBoard = JXG.JSXGraph.initBoard('superposition-wave-board', {
            boundingbox: boundingBox,
            axis: true,
            showNavigation: false,
            zoom: false,
            pan: false,
            showCopyright: false,
            grid: false
        });

        superpositionWaveCurve = superpositionWaveBoard.create(
            'curve',
            [[], []],
            {strokeWidth: 2, strokeColor: 'blue', highlight: false}
        );
    }

    function updateGraph() {
        var dataX = [], dataY = [],
            x, xMin = -0.001, xMax = 11.0, xInc = 0.01;

        for (x = xMin; x <= xMax; x += xInc) {
            dataX.push(x);
            dataY.push(superpositionWave(x));
        }

        superpositionWaveCurve.dataX = dataX;
        superpositionWaveCurve.dataY = dataY;

        superpositionWaveBoard.update();
    }
})(jQuery, _, JXG);
