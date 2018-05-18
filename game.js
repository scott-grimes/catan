
var GenerateBoard = function(){
  var resources = ["field","field","field","field","forest","forest","forest","forest","pasture","pasture","pasture","pasture","mountains","mountains","mountains","hills","hills","hills","desert"]
  var ports = ["ore","wheat","wood","wool","brick","generic","generic","generic","generic"]
  var tileCount = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]
  
  shuffle(resources);
  shuffle(ports);
  shuffle(tileCount);
  var hexes = {};
  var tiles = [[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null],[null,null,null,null,null,null,null]];
  //places land tiles randomly into our game board. capital letters represent land tiles
    var i = 0;
    var countIndex = 0;
    var ident = 65;
    for(var row = -2;row<=2;row+=1){
      count = -Math.abs(row)+5;
      var start = -row-2;
      if(row>0){
        start = -2;
      }
      for(var col = start;col<start+count;col+=1){
        
        var tileVal = 0;
        if(resources[i]=='desert'){
          tileVal=7;
          }
        else{
          tileVal = tileCount[countIndex];
          countIndex+=1;
          }
        var id = String.fromCharCode(ident);
        var h = new Hex(id,col,row,resources[i],tileVal);
        
        hexes[id] = h;
        i+=1;
        ident+=1;
     }
    }
    
    
    
    
    var oceans = [[1,-3],[3,-3],[3,-1],[2,1],[0,3],[-2,3],[-3,2],[-3,0],[-1,-2]];
    
    var ports = [[0,-3],[2,-3],[3,-2],[3,0],[1,2],[-1,3],[-3,3],[-3,1],[-2,-1]];
    
    ident = 97; // lowercase a
    //add our empty oceans  (lowercase letters)
    for(var i = 0;i<9;i+=1){
    var xa = oceans[i][0];
    var ya = oceans[i][1];
      var h = new Hex(String.fromCharCode(ident),xa,ya,'ocean',0);
      hexes[String.fromCharCode(ident)] = h;
      ident+=1;
    }
    
    ident = 1; // number as a string
    //add our empty oceans  (lowercase letters)
    for(var i = 0;i<9;i+=1){
    var xa = ports[i][0];
	var ya = ports[i][1];
      var h = new Hex("z"+ident.toString(),xa,ya,'port',0);
      h.port = ports[i];
      hexes["z"+ident.toString()] = h;
      ident+=1;
    }
	return hexes;
}

Player.prototype.addPort = function(){};
Player.prototype.addSettlement = function(){};
Player.prototype.upgradeSettlement = function(){};
Player.prototype.addRoad = function(){};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    var temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// our game logic
//accepts an array of player names
function Server(pNames){
	this.hexes = GenerateBoard();
	this.players = {}; 
	this.roads = {};
	this.towns = {};
	this.trades = {};

	for(var i = 0;i<pNames.length;i++){ 
		this.players[i] = new Player(i);
	}

	this.getBoardHexes = ()=>{return this.hexes;}

	 //all public-ly available info
	 this.getBoardState = function(){
	 	var state = {};

	 	return state;
	 }

	 //should only be called by the person
	 this.getPerson = function(id){

	 }

	 //get the public attributes of a person (visible cards, known VP, etc)
	 this.getPublicAttrOfPerson = function(id){

	 }
}

//allows interaction with the visual game
function GameBoard(hexes){

}
