class Player:
  
  def __init__(self):
    self.cities = 4
    self.settlements = 5 
    self.roads = 15
    self.ore = 0 
    self.brick = 0 
    self.wool = 0 
    self.wheat = 0 
    self.wood = 0
    self.tradeGive = {}
    self.tradeGet = {} 
    self.points = 0 
    self.ports = {}
    
  def canBuildCity(self):
    return self.cities>0 and True #has enough resources
    
  def canBuildSettlement(self):
    return self.settlements and True #has enough resources
    

class Hex:
  def __init__(self,ident):
    self.ident = ident
    
  def __str__(self):
    return str(self.ident)
    
  
  def __repr__(self):
    return str(self.ident)

class Board:
  def __init__(self):
    self.resources = ['field','field','field','field','forest','forest','forest','forest','pasture','pasture','pasture','pasture','mountains','mountains','mountains','hills','hills','hills','desert']
    self.ports = ['ore','wheat','wood','wool','brick','generic','generic','generic','generic']
    self.count = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]
    from random import shuffle
    shuffle(self.resources)
    shuffle(self.count)
    shuffle(self.ports)
    
    self.tiles= [[0 for x in range(5)] for y in range(5)] 
    i = 0
    ident = 65
    for row in [-2,-1,0,1,2]:
      count = -abs(row)+5
      start = abs(row)-2
      for col in range(start,start+count):
        h = Hex(chr(ident))
        if(self.resources[i-1]=='desert'):
          h.count=7
          i-=1
        else:
          h.count = self.count[i]
        h.resource=self.resources[i]
        self.tiles[row+2][col+2+min(0,-row)] = h
        i+=1
        ident+=1
    
    
    self.vertices = {} #location of cities/settlements
    self.edges = {} #location of roads
    
    return
  
  #is the location is ok to build?
  def canBuildRoad(self,player,location):
    return True
  
  #is the location ok to build?
  def canBuildSettlement(self,player,location):
    #is location empty?
    
    #is location far enough away from other players?
    
    #is location connected to a road/are we setting up the game?
    
    
    
    return True
  def canBuildCity(self,player,location):
    return True
  
  def buildSettlement(self,player,location):
    if(self.canBuildSettlement(player,location)):
      self.vertices[location] = [player,'settlement']
  
  def buildCity(self,player,location):
    if(self.canBuildCity):
      self.vertices[location] = [player,'city']
    
  
  def getTile(self,x,y):
  #axial coords with 0,0 at center
  #pointy-top
    print (self.tiles[y+2][x+2+min(0,-x)])
    return
  
  
  
  def printBoard(self):
    for row in self.tiles:
      print(row)
  
b = Board()
b.printBoard()
b.buildSettlement('bob','ADE')
print(b.vertices)
