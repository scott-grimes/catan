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
    self.count = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]
    
    from random import shuffle
    shuffle(self.resources)
    shuffle(self.count)
    print(self.resources)
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
    return
  
  
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
b.getTile(0,0)
b.getTile(0,2)
b.getTile(0,-2)
