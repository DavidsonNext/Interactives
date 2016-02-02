//General Parameters for Macro
JXG.Options.point.showInfobox = false;
JXG.Options.segment.strokeColor = 'Pink';
JXG.Options.segment.strokeWidth = '5';
JXG.Options.text.fontSize = 16;
JXG.Options.text.useMathJax = true;

//Custom Parameters
labelOffset = {'X':160,'Y':150};

createSupply = function(board,options) {
    var name = options.name || '';
    var color = options.color || JXG.Options.segment.strokeColor;
    var c1,c2,S1,S2,N;

    c1 = [2.0,2.0];
    c2 = [9.5,9.5];
    S1 = board.create('point',c1,{withLabel:false,visible:false});
    S2 = board.create('point',c2,{withLabel:false,visible:false});
    //N = board.create('text',[S2.X(),S2.Y(),name]);
    return board.create('segment',[S1,S2],{'strokeColor':color,
                                           'name':name,'withLabel':true,
                                           'label':{'offset':[labelOffset.X,labelOffset.Y]}
                                          });
}

createDemand = function(board,options) {
    var name = options.name || '';
    var color = options.color || JXG.Options.segment.strokeColor;
    var c1,c2,D1,D2;

    c1 = [2.0,9.5];
    c2 = [9.5,2.0];
    D1 = board.create('point',c1,{withLabel:false,visible:false});
    D2 = board.create('point',c2,{withLabel:false,visible:false});
    return board.create('segment',[D1,D2],{'strokeColor':color,
                                           'name':name,'withLabel':true,
                                           'label':{'offset':[labelOffset.X,-labelOffset.Y]}
                                          });
}


/////////////////////////////////////////////////////////////
// Dashed Lines
createDashedLines2Axis = function(board,intersection,options) {
    var fixed = options.fixed || true;  // defaults
    var withLabel = options.withLabel || false;
    var xlabel = options.xlabel || '';  
    var ylabel = options.ylabel || '';
    var color = options.color || 'gray';
    var visible = options.visible || true;
    
    var Y1,Y2,YLine,X1,X2,XLine,obj={};
    var Y1 = board.create('point',[0, intersection.Y()],
                     {'withLabel':withLabel,'name':ylabel,'visible':true,'size':'0.5',
                     'strokeColor':'Gray','label':{'offset':[-35,-2]}});

    var Y2 = board.create('point',[intersection.X(), intersection.Y()],
                     {'withLabel':false,'visible':false,'size':'0.0','strokeColor':''});

    var YLine = board.create('segment',[Y1,Y2],
                        {'strokeColor':color,'strokeWidth':'2','dash':'1','fixed':fixed,'visible':visible});

    var X1 = board.create('point',[intersection.X(), 0],
                     {'withLabel':withLabel,'name':xlabel,'visible':true,'size':'0.5',
                     'strokeColor':'Gray','label':{'offset':[-5,-15]}});

    var X2 = board.create('point',[intersection.X(), intersection.Y()],
                     {'withLabel':false,'visible':false,'size':'0.0','strokeColor':''});

    var XLine = board.create('segment',[X1,X2],
                        {'strokeColor':color,'strokeWidth':'2','dash':'1','fixed':fixed,'visible':visible});
    
    
    var obj = {
        Y1: Y1,
        Y2: Y2,
        YLine: YLine,
        X1: X1,
        X2: X2,
        XLine: XLine
    }
    
    return obj;
}
