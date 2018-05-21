var tileColor = {"ocean":"HoneyDew", "pasture": "lightgreen", "field" : "Khaki","mountains": "grey","hills": "LightSalmon","desert":"yellow","forest":"OliveDrab","port":"HoneyDew"};
var listOfTowns = [];
function getPlayerID(){
    return playerID;
}

var createSVGElement = function(tagName) {
    return $(document.createElementNS(
        'http://www.w3.org/2000/svg', tagName) );
  };

// handles road interactions
var roadHandler = function(evt){
    var $road = $(this);

    if($road.data('owner') !== 'none') return;

    if(evt.type === 'mouseenter'){
        $road.attr('stroke-opacity',1);
    }

    if(evt.type === 'mouseleave'){
        $road.attr('stroke-opacity',0);
    }

    if(evt.type === 'click' && roadIsAllowed($road,getPlayerID())){
        $road.data('owner',getPlayerID());
        $road.attr('stroke-opacity',1);
    }
}

var townHandler = function(evt){
    var $town = $(this);

    if($town.data('owner') !== 'none') return;

    if(evt.type === 'mouseenter'){
        $town.attr('opacity',1);
    }
    if(evt.type === 'mouseleave'){
        $town.attr('opacity',0);
    }
    if(evt.type === 'click' && townIsAllowed($town,getPlayerID())){
        $town.data('owner',getPlayerID());
        $town.attr('opacity',1);
    }
}

function GameWindow(){
    var $board = $('#board');
    $board.attr('width',500);
    $board.attr('height',400);

    var $ocean = createSVGElement('rect')
    .attr('fill',tileColor['ocean'])
    .attr('width',500)
    .attr('height',400)
    .appendTo($board);

    var hexSize = 36;

    var hexes = Catan.getBoardHexes();
    var boardState = Catan.getBoardState();
    var roads = {};
    var vertices = {};

var BuildHex = function(hData) {

    //create a hex object for our gameboard
    var $Hex = createSVGElement('polygon')
      .addClass('hex');
    
    //center of gameboard at x_0, y_0
    
    var x_0 = $board[0].getAttribute('width')/2;
    var y_0 = $board[0].getAttribute('height')/2;
    var size = hexSize;
    //x_a,y_a are the axial coordinates of the hex
    var x_a = hData.x
    var y_a = hData.y
    
    //x,y are pixel coords of the center of the hexagon
    var x = x_0+size*(x_a+y_a/2)*Math.sqrt(3);
    var y = y_0+y_a*size*1.5;
    
    size = size*.8;

    // points on our hex
    var points = [];
    points.push([ x,y-size]);  
    points.push([x+size*Math.sqrt(3)/2,y-size*.5]);  
    points.push([x+size*Math.sqrt(3)/2,y+size*.5]);     
    points.push([x,y+size]);   
    points.push([x-size*Math.sqrt(3)/2,y+size*.5]);  
    points.push([x-size*Math.sqrt(3)/2,y-size*.5]);   
    points = points.reduce((memo,x)=>{ 
        var p = Math.round(x[0],0)+','+Math.round(x[1],0)+' ';
        memo+=p;
        return memo;}
        ,'');

    $Hex.attr('points',points);

    $Hex.attr('fill',tileColor[hData.type]);
    var $numTile;

    if(hData.type !=='ocean' && hData.type!=='port'){

        $Hex.attr('stroke','black')
        .data('val',hData.tileVal)
        .data('type',hData.type)
        .addClass('hex');

        $numTile = createSVGElement('text')
        .attr('alignment-baseline',"middle")
        .attr('text-anchor','middle')
        .attr('x',x)
        .attr('y',y)
        .text(hData.tileVal)
        .css('pointer-events', 'none');
        /*
        if(hData.tileVal===7){
            $numTile.text('robber')
            tileVal = 'robber';
        }

        $Hex.on('mouseenter',()=>{

            $numTile.text( $Hex.data('type') )
    });
    $Hex.on('mouseleave',()=>{
            $numTile.text( $Hex.data('val') )
    });*/
    }

    

    $board.append($Hex)
    $board.append($numTile)
    // ctx.fillText(String(hex.id),x-5,y+5);
}
//given a hex object, return the pixels at the center of the hexagon      
var hexToPixel = function(hex){
    
    var size = hexSize;
    var x_0 = $board[0].getAttribute('width')/2;
    var y_0 = $board[0].getAttribute('height')/2;
    //x_a,y_a are the axial coordinates of the hex
    var x_a = hex.x;
    var y_a = hex.y;
    //x,y are pixel coords of the center of the hexagon
    var x = x_0+size*(x_a+y_a/2)*Math.sqrt(3);
    var y = y_0+y_a*size*1.5;
    return [x,y]
}
//returns the hex id given the x and y axial coords of the hex. returns null if no hex is found
var hexFromAx = function(x,y){
    for(var key in hexes){
        var h = hexes[key];
        if(h.x===x && h.y===y){
            return h.id;
        }
    }
    return null;
}
//given pixel coordinates x,y, returns the hex object which contains the point (x,y). returns null if you did not click on a valid hexagon
var pixelToHex = function(x,y){
    var x_0 = 4*hexSize;
    var y_0 = $board[0].getAttribute('height')/2;
    var size = hexSize;
    var xc = x-x_0;
    var yc = y-y_0;
    var xa = (xc * Math.sqrt(3)/3 - y / 3) / size;
    var ya = yc * 2/3 / size;
    
    
    var xf = xa;
    var zf = ya;
    var yf = -xf-zf;
    
    var rx = Math.round(xf);
    var ry = Math.round(yf);
    var rz = Math.round(zf);
    var x_diff = Math.abs(rx - xf);
    var y_diff = Math.abs(ry - yf);
    var z_diff = Math.abs(rz - zf);
    if (x_diff > y_diff && x_diff > z_diff){
        rx = -ry-rz; }
    else if(y_diff > z_diff){
        ry = -rx-rz;}
    else{
        rz = -rx-ry;}
    //rx and rz are the x and y axial coords of our hexagon
    
    return hexFromAx(rx,rz);
}
//returns an array with all the id's of the neighbor of the given hex id
var neighbors = function(id){
    var h = hexes[id];
    var answer = [];
    var axial_directions = [[1,  0], [1, -1], [ 0, -1],[-1,  0], [-1, 1], [ 0, 1]];
    var x0 = h.x;
    var y0 = h.y;
    for(var i=0;i<6;i++){
    var xa = x0+axial_directions[i][0];
    var ya = y0+axial_directions[i][1];
    if(hexFromAx(xa,ya)!=null){
        answer.push(hexFromAx(xa,ya));
    }
    }
    return answer.sort();
}
//returns the two coordinate pairs representing the line on the edge between the two hex id's
var roadBoundry = function(id1, id2){
    //vector from hex 1 towards hex2
    var hex1 = hexes[id1];
    var hex2 = hexes[id2];

    var top, bottom;
    if(hex1.id>hex2.id){
    top = hex1;
    bottom = hex2;
    }
    else{
    top = hex2;
    bottom = hex1;
    }
    [xa1,ya1] = hexToPixel(top);
    [xa2,ya2] = hexToPixel(bottom);
    var dx = (xa2-xa1);
    var dy = (ya2-ya1);
    var dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    dx = dx/dist;
    dy = dy/dist;
    var size = hexSize*.9
    var angle = 20;
    c = Math.cos(angle*Math.PI/180);
    var s = Math.sin(angle*Math.PI/180);
    var x1 = xa1+size*(dx*c-s*dy)
    var y1 = ya1+size*(dx*s+c*dy);
    angle = -angle;
    c = Math.cos(angle*Math.PI/180);
    s = Math.sin(angle*Math.PI/180);
    var x2 = xa1+size*(dx*c-s*dy)
    var y2 = ya1+size*(dx*s+c*dy);
    return [x1,y1,x2,y2];
}
//fills our gameboard with road objects
var BuildRoads = function(hData){
    if(hData.type === 'ocean' || hData.type === 'port') return;

    var adjHexes = neighbors(hData.id);

    for(var i = 0;i<adjHexes.length;i++){

        var coords = roadBoundry(hData.id, adjHexes[i]);
        var roadID = [hData.id,adjHexes[i]];
        roadID = roadID.sort();
        roadID = roadID.join('_');

        var $road = createSVGElement('line')
        .attr('stroke',playerColors[getPlayerID()])
        .attr('stroke-opacity',0)
        .attr('stroke-width',8)
        .attr('stroke-linecap','round')
        .attr('x1',coords[0])
        .attr('y1',coords[1])
        .attr('x2',coords[2])
        .attr('y2',coords[3])
        .attr('id',roadID)
        .data('owner','none')
        .addClass('road');

        $board.append($road)
    }
}
//returns the three hexes which touch the city located at the given coord location
var cityFromPixel = function(coord){
    var x = coord[0];
    var y = coord[1];
    //gets the closest hex to the location
    var h = pixelToHex(x,y);
    if(h==null){ return null; }
    //gets a list of the neighbors
    var neigh = neighbors(h);
    //distance the city is from all the neighbors
    var dists = {};
    for(var i = 0;i<neigh.length;i+=1){
    var n = hexToPixel(hexes[neigh[i]]);
    dists[neigh[i]] = Math.sqrt(Math.pow(x-n[0],2)+Math.pow(y-n[1],2));
    }
    //pick two lowest distances
    var sortedDistances = Object.keys(dists).sort(function(a,b){return dists[a]-dists[b]})
    var solution = [sortedDistances[0],sortedDistances[1],h.id]
    //alphabitizes the hexes, returns the list
    return solution.sort();
}

//returns the ID's of the towns which touch the given hex
var getTownsOnHex = function(hData){
    var nHexes = neighbors(hData.id);
    var potentialPairs = pick2of(nHexes); //all possible pairs of neighbors
    var actualPairs = [];   //neighbors which touch each other
    for(var i = 0;i<potentialPairs.length;i++){
        if(areNeighbors( potentialPairs[i][0], potentialPairs[i][1] ))
            actualPairs.push(potentialPairs[i]);
        
    }

    var townIDs = []
    for(var i = 0;i<actualPairs.length;i++){
        var threeHexes = [hData.id].concat(actualPairs[i])
        townIDs.push( threeHexes.sort().join('_') )
    }
    return townIDs;
}
//returns true if two hex ID's are neighbors
var areNeighbors = function(a,b){
    var n1 = neighbors(a);
    return n1.includes(b);
}

    //returns an array of the x,y pixel locations of the verticies touching the hex
var hexVertices = function(h){
    var s = hexSize;
    var xc,yc;
    [xc,yc] = hexToPixel(h);
    var vertices = [];
    var v = [[0,1],[Math.sqrt(3)/2,.5],[-Math.sqrt(3)/2,.5],[0,-1],[-Math.sqrt(3)/2,-.5],[Math.sqrt(3)/2,-.5]];
    for(var i = 0;i<6;i+=1){
    vertices.push([xc+v[i][0]*s,yc+v[i][1]*s]);
    }
    return vertices;
    }

//given an array containing three points [x,y], return the center of the circle containing the three points
var centerOfThreePoints = function(arr){
    var p0 = arr[0];
    var p1 = arr[1];
    var p2 = arr[2];

    p1[0]-= p0[0]; 
    p1[1]-= p0[1]; 
    p2[0]-= p0[0]; 
    p2[1]-= p0[1];

        var Z1= p1[0] * p1[0] + p1[1] * p1[1];
        var  Z2= p2[0] * p2[0] + p2[1] * p2[1];
        var D= 2 * (p1[0] * p2[1] - p2[0] * p1[1]);

        var Xc= (Z1 * p2[1] - Z2 * p1[1]) / D + p0[0];
        var Yc= (p1[0] * Z2 - p2[0] * Z1) / D + p0[1];

        return [Xc,Yc];
}

var BuildTown = function(id){
    listOfTowns.push(id);
    var onHexes = id.split('_');
    var $town = createSVGElement('circle');

    var hCenters = [];
    for(var i = 0;i<3;i++){
        var h = hexes [ onHexes[i] ];
        var coord = hexToPixel(h);
        hCenters.push(coord);
    }

    var center = centerOfThreePoints(hCenters);

    $town.attr('cx',center[0])
    .attr('cy',center[1])
    .attr('r',10)
    .attr('fill',playerColors[getPlayerID()])
    .attr('opacity',0)
    .data('owner','none')
    .attr('id',id)
    .addClass('town');

    $board.append($town);

}

var BuildTowns = function(hData){
    
    var townsAroundHex = getTownsOnHex(hData)
    for(var i = 0;i<townsAroundHex.length;i++){
        if(!listOfTowns.includes( townsAroundHex[i]))
            BuildTown( townsAroundHex[i]);

    }

    return;
}


 
    for(var key in hexes){
        BuildHex(hexes[key]);
        BuildRoads(hexes[key]);
    }
    for(var key in hexes){

        BuildTowns(hexes[key]);
    }

    

$('.road').on('mouseenter mouseleave click',roadHandler);
$('.town').on('mouseenter mouseleave click',townHandler);


};


