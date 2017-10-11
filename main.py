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
    
    #blank board 
    self.tiles= [[0 for x in range(7)] for y in range(7)] 
    
    #capital letters represent land tiles
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
        self.tiles[row+3][col+3+min(0,-row)] = h
        i+=1
        ident+=1
        
        
    self.printBoard()
    print()
    
    portLocationsInAxialCoords = [[0,-3],[2,-3],[3,-2],[3,0],[1,2],[-1,3],[-3,3],[-3,1],[-2,-1]]
    
    oceanLocationsInAxialCoords = [1,-3],[3,-3],[3,-1],[2,1],[0,3],[-2,3],[-3,2],[-3,0],[-1,-2]
    
    ident = ord('a')
    #add our empty oceans  (lowercase letters)
    for col,row in oceanLocationsInAxialCoords:
      h = Hex(chr(ident))
      self.tiles[row+3][col+3] = h
      ident+=1
    
    
    ident = 1
    #add our ports  (numbers 1-9)
    for col,row in portLocationsInAxialCoords:
      h = Hex(str(ident))
      self.tiles[row+3][col+3] = h
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
    if(self.canBuildCity(player,location)):
      self.vertices[location] = [player,'city']
      
  def buildRoad(self,player,location):
    if(self.canBuildRoad(player,location)):
      self.edges[location] = player
    return
    
  
  def getTile(self,x,y):
  #axial coords with 0,0 at center
  #pointy-top
    print (self.tiles[y+3][x+3])
    return
  
  
  
  def printBoard(self):
    for row in self.tiles:
      print(row)
  
b = Board()
b.printBoard()
print()
b.buildSettlement('bob','ADE')
print(b.vertices)
b.getTile(0,3)
b.getTile(0,-2)
b.getTile(1,-2)
b.getTile(2,-2)
b.getTile(0,0)
b.getTile(0,-1)
b.getTile(-2,2)
b.getTile(1,1)
