var playerColors = ['red','green','blue','orange','black'];
var townIDs = ["A_B_E", "A_B_a", "A_D_E", "A_D_i", "A_a_z1", "A_i_z1", "B_C_F", "B_C_z2", "B_E_F", "B_a_z2", "C_F_G", "C_G_z3", "C_b_z2", "C_b_z3", "D_E_I", "D_H_I", "D_H_z9", "D_i_z9", "E_F_J", "E_I_J", "F_G_K", "F_J_K", "G_K_L", "G_L_c", "G_c_z3", "H_I_M", "H_M_z8", "H_h_z8", "H_h_z9", "I_J_N", "I_M_N", "J_K_O", "J_N_O", "K_L_P", "K_O_P", "L_P_d", "L_c_z4", "L_d_z4", "M_N_Q", "M_Q_g", "M_g_z8", "N_O_R", "N_Q_R", "O_P_S", "O_R_S", "P_S_z5", "P_d_z5", "Q_R_f", "Q_f_z7", "Q_g_z7", "R_S_z6", "R_f_z6", "S_e_z5", "S_e_z6"];

function GameState(){
    this.hexes = {}
    this.players = {};
    this.roads = {};
    this.towns = {};
    this.trades = {};
}

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

Player.prototype.addPort = function(){};
Player.prototype.addSettlement = function(){};
Player.prototype.upgradeSettlement = function(){};
Player.prototype.addRoad = function(){};

//returns a list of the towns adjacent to the given townID
function getTownsAdjacentToTown(townID){
var threeHexes = townID.split('_');


    var adjacentTowns = [];
    for(var i = 0;i<townIDs.length;i++){
        var sumTrues = 0;
        sumTrues = townIDs[i].indexOf(threeHexes[0])!==-1 ? sumTrues+1: sumTrues;
        sumTrues = townIDs[i].indexOf(threeHexes[1])!==-1 ? sumTrues+1: sumTrues;
        sumTrues = townIDs[i].indexOf(threeHexes[2])!==-1 ? sumTrues+1: sumTrues;

        if(sumTrues===2){
            adjacentTowns.push(townIDs[i])
        }
    }
    return adjacentTowns;
}

// returns true if the given town ID has another town next to it
function townTooClose(townID){
    var adjacentTowns = getTownsAdjacentToTown(townID);

    for(var i = 0;i<adjacentTowns.length;i++){
        
    }


}
// generates all possible two-element combos of the array
function pick2of(arr){
    var sol = [];
    for(var i = 0;i<arr.length-1;i++){
        for(var j = i+1;j<arr.length;j++){
            sol.push( [arr[j],arr[i]]);
        }
    }
    return sol;
}

function roadIsAllowed(roadID,playerID){
    return true;
}

function townIsAllowed(townID,playerID){
    return true;
}
