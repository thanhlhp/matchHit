import { _decorator, Component, Node, Prefab, instantiate, Vec3, random, Tween, tween, easing, Vec2 } from 'cc';
import { setUncaughtExceptionCaptureCallback } from 'process';
import { DrawLine } from './DrawLine';
import { ElementScript } from './ElementScript';
import { ItemScript } from './ItemScript';
const { ccclass, property } = _decorator;

@ccclass('GridGenerator')
export class GridGenerator extends Component {
    @property(Prefab)
    cellPrefabs: Prefab[] = []; // Assign a prefab in the editor
    @property(Node)
    board : Node;
    @property(Prefab)
    box:Prefab;
    @property(Prefab)
    line: Prefab;
    cells:Node[][] = [];
    listCellTraced:Node[] = [];
    listLineRender:Node[] = [];
    idItemCurent:number = 0;
    gridSize: number = 6; // Grid dimensions
    cellSize: number = 120; // Size of each cell in pixels
    indexItem :number = 100;
    indexCell: number = 0;
    indeLine:number;
    start() {   
        
        for (let i = -1; i < this.gridSize+1; i++) {
            this.cells[i] = [];
            for (let j = -1; j < this.gridSize+1; j++)
            {
                
                this.cells[i][j] = null;
            }
        }
        
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                let index =Math.round(this.getRandomNumber(0,this.cellPrefabs.length-1));   
                const cell = instantiate(this.box); // Create a new cell from the prefab
                cell.setParent(this.board);

                //const element = instantiate(this.cellPrefabs[index])
                //element.setParent(this.board)
                 // Set the parent of the cell to this node
                // cell.getComponent(ElementScript).posX = i;
                // cell.getComponent(ElementScript).posY = j;    
                // Calculate position based on grid coordinates
                const posx = j * this.cellSize - (this.gridSize / 2) * this.cellSize + this.cellSize / 2;
                const posy = i * this.cellSize - (this.gridSize / 2) * this.cellSize + this.cellSize / 2;
                cell.setPosition(new Vec3(posx, posy, 0));
                cell.setSiblingIndex(this.indexCell);
                this.indexCell++;
                const element = instantiate(this.cellPrefabs[index])
                element.setParent(this.board)
                element.setPosition(cell.position);
                element.setSiblingIndex(this.indexItem)
                this.indexItem++;
                cell.getComponent(ElementScript).item = element;
                if(this.cells[i][j] == null)
                {
                    this.cells[i][j] = cell;
                    this.cells[i][j].getComponent(ElementScript).x = i;
                    this.cells[i][j].getComponent(ElementScript).y = j;
                }
                    
            }
        }
    }
    ResetListCellTraced()
    {
        this.listCellTraced = [];
        this.listLineRender = [];
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                this.cells[i][j].getComponent(ElementScript).isSelect = false;
                this.cells[i][j].getComponent(ElementScript).isTracing = false;
                this.cells[i][j].getComponent(ElementScript).stt = 0;
                this.cells[i][j].getComponent(ElementScript).item.getComponent(ItemScript).ResetListDrop();
            } 
        }
    }
    CheckCanTracing(cell:Node)
    {
        this.indeLine = this.indexCell;
        console.log("tracking");
        if(cell.getComponent(ElementScript).item.getComponent(ItemScript).type>0)// dieu kien type cua cell co the an
        {
            
            if(this.listCellTraced.length == 0)
            {
                this.listCellTraced.push(cell);
                cell.getComponent(ElementScript).stt = 1;
                this.idItemCurent = cell.getComponent(ElementScript).item.getComponent(ItemScript).type;
     
                this.ScaleItem(true);
                return true;
            }else
            {
                
                //Xu ly xung quanh cell
           
                let a = cell.getComponent(ElementScript).x;
                let b = cell.getComponent(ElementScript).y;
                let beforeCell = this.listCellTraced[this.listCellTraced.length-1];
                
                if(this.cells[a-1][b] == beforeCell|| this.cells[a+1][b] == beforeCell
                    ||(this.cells[a][b-1] == beforeCell)||this.cells[a][b+1] == beforeCell
                    ||(this.cells[a-1][b-1] == beforeCell)||this.cells[a+1][b+1] == beforeCell
                    ||(this.cells[a-1][b+1] == beforeCell)||(this.cells[a+1][b-1] == beforeCell))
                    {
                        if(beforeCell.getComponent(ElementScript).item.getComponent(ItemScript).type == cell.getComponent(ElementScript).item.getComponent(ItemScript).type)
                        {
                            this.listCellTraced.push(cell);
                            const line = instantiate(this.line);
                            line.setParent(this.board);
                            
                            line.getComponent(DrawLine).drawLine(beforeCell.position,cell.position);
                            // console.log(this.minIndexLayer);
                            line.setSiblingIndex(this.indeLine);
                            this.indeLine++;
                            this.listLineRender.push(line)
                            
                            console.log(this.listLineRender);
                            cell.getComponent(ElementScript).stt = this.listCellTraced.length;
                            return  true;
                        }
                    }
            } 
          
        } else return false;
        return false;
        
    }
    ScaleItem(scale: boolean)
    {
       
        if(scale)
        {
            for (let i = 0; i < this.gridSize; i++) {
                for (let j = 0; j < this.gridSize; j++)
                {       
                    if(this.cells[i][j].getComponent(ElementScript).item!=null)
                     if(this.cells[i][j].getComponent(ElementScript).item.getComponent(ItemScript).type == this.idItemCurent && this.cells[i][j].getComponent(ElementScript).haveItem)
                        {
                     
                            tween(this.cells[i][j].getComponent(ElementScript).item)
                            .to(0.2,{scale: new Vec3(1.2,1.2,1.2)})
                            .start()
                        }
                    
                  
                }
            }
        } else 
        {
            for (let i = 0; i < this.gridSize; i++) {
                for (let j = 0; j < this.gridSize; j++)
                {
                    if(this.cells[i][j].getComponent(ElementScript).item!=null)
                        if(this.cells[i][j].getComponent(ElementScript).item.getComponent(ItemScript).type == this.idItemCurent&& this.cells[i][j].getComponent(ElementScript).haveItem)
                        {
                             
                                tween(this.cells[i][j].getComponent(ElementScript).item)
                                .to(0.2,{scale: new Vec3(1,1,1)})
                                .start()
                        }
                    
                   
                }
            }
        }
        
    }
    CheckCellNull()
    {
        for(let i = 0;i<this.gridSize;i++){
            for(let j = 0;j<this.gridSize;j++)
            {
           
                if(this.cells[i][j].getComponent(ElementScript).haveItem == false)
                {
                    // xu ly fill
                    this.FillHoleCell(this.cells[i][j]);
                   
                }

            //day tu ngoai vao hamg tren cung.
            
            // check fukk mang xem con null k -->  CheckCellNull()

              
            }
        }
    }
    DropItems()
    {
        for(let i = 0;i<this.gridSize;i++){
            for(let j = 0;j<this.gridSize;j++)
            {
                if(this.cells[i][j].getComponent(ElementScript).item.getComponent(ItemScript).canDrop)
                {
                    this.cells[i][j].getComponent(ElementScript).item.getComponent(ItemScript).Drop();
                }
                console.log(this.cells[i][j].getComponent(ElementScript).item.getComponent(ItemScript).listDropMove,"O",i,j)
            }
    }
}
    FillHoleCell(cell:Node)
    {
            let haveDropItem = false;
            let x = cell.getComponent(ElementScript).x;
            let y = cell.getComponent(ElementScript).y;
            if(this.cells[x+1][y]!=null)
                {
                if(this.cells[x+1][y].getComponent(ElementScript).haveItem&& haveDropItem == false)
                    {
                        var newItem = new Node;
                        newItem = this.cells[x+1][y].getComponent(ElementScript).item;
                     
                        this.cells[x][y].getComponent(ElementScript).haveItem = true;   
                        this.cells[x][y].getComponent(ElementScript).item = newItem;
                        this.cells[x+1][y].getComponent(ElementScript).haveItem = false;
                        //this.cells[x+1][y].getComponent(ElementScript).item.getComponent(ItemScript).type = 0;
                        this.cells[x+1][y].getComponent(ElementScript).item.getComponent(ItemScript).canDrop = true;
                        this.cells[x+1][y].getComponent(ElementScript).item.getComponent(ItemScript).listDropMove.push(new Vec2(x,y));
                        haveDropItem = true;
                        
                    } 
                }
            if (this.cells[x+1][y-1]!=null)
               {
                if(this.cells[x+1][y-1].getComponent(ElementScript).haveItem && haveDropItem == false)
                    {
                        var newItem = new Node;
                        newItem = this.cells[x+1][y-1].getComponent(ElementScript).item;
                        this.cells[x][y].getComponent(ElementScript).haveItem = true;
                       
                        this.cells[x][y].getComponent(ElementScript).item = newItem;
                        this.cells[x+1][y-1].getComponent(ElementScript).haveItem= false;
                        this.cells[x+1][y-1].getComponent(ElementScript).item.getComponent(ItemScript).canDrop = true;
                        //this.cells[x+1][y-1].getComponent(ElementScript).item.getComponent(ItemScript).type = 0;
                        this.cells[x+1][y-1].getComponent(ElementScript).item.getComponent(ItemScript).listDropMove.push(new Vec2(x,y));
                        haveDropItem = true;
                    }
               }
            if(this.cells[x+1][y+1]!=null)
               { 
                if(this.cells[x+1][y+1].getComponent(ElementScript).haveItem && haveDropItem == false)
                    {  
                        var newItem = new Node;
                        newItem = this.cells[x+1][y+1].getComponent(ElementScript).item;
                        this.cells[x][y].getComponent(ElementScript).haveItem = true;
                        this.cells[x][y].getComponent(ElementScript).item  = newItem;
                        this.cells[x+1][y+1].getComponent(ElementScript).haveItem = false;
                        //this.cells[x+1][y+1].getComponent(ElementScript).item.getComponent(ItemScript).type = 0;
                        this.cells[x+1][y+1].getComponent(ElementScript).item.getComponent(ItemScript).canDrop = true;
                        this.cells[x+1][y+1].getComponent(ElementScript).item.getComponent(ItemScript).listDropMove.push(new Vec2(x,y));
                        haveDropItem = true;
                    } 
               }

          
          
    }
    getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}

