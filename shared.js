var playerColors = ['red','green','blue','orange','black'];

function Hex(id,x,y,type,tileVal){
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.tileVal = tileVal;
}

function Road(id,owner){
    this.id = id;
    this.owner = owner;
}

function Town(id,owner,type){
    this.id = id;
    this.owner = owner;
    this.type = type;
}

function Player(id,name){
    this.id = id;
    this.name = name;
    this.color = playerColors[id];
}

function roadIsAllowed(roadID,playerID){
    return true;
}

function townIsAllowed(townID,playerID){
    return true;
}
