import { _decorator, Component, Node, Prefab, instantiate, Vec3, random } from 'cc';
import { ElementScript } from './ElementScript';
const { ccclass, property } = _decorator;

@ccclass('GridGenerator')
export class GridGenerator extends Component {
    @property(Prefab)
    cellPrefabs: Prefab[] = []; // Assign a prefab in the editor
    @property(Node)
    board : Node;
    cells:Node[][] = [];
    listCellTraced:Node[] = [];
    gridSize: number = 8; // Grid dimensions
    cellSize: number = 100; // Size of each cell in pixels
  
    start() {   
        this.ResetListCellTraced();
        for (let i = 0; i < this.gridSize; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.gridSize; j++)
            {
                this.cells[i][j] = null;
            }
        }
        
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                let index =Math.round(this.getRandomNumber(0,2));   
                const cell = instantiate(this.cellPrefabs[index]); // Create a new cell from the prefab
                cell.setParent(this.board); // Set the parent of the cell to this node
                // cell.getComponent(ElementScript).posX = i;
                // cell.getComponent(ElementScript).posY = j;    
                // Calculate position based on grid coordinates
                const posx = j * this.cellSize - (this.gridSize / 2) * this.cellSize + this.cellSize / 2;
                const posy = i * this.cellSize - (this.gridSize / 2) * this.cellSize + this.cellSize / 2;
                cell.setPosition(new Vec3(posx, posy, 0));
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
        for (let i = 0; i < this.gridSize; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.gridSize; j++)
            {
                this.cells[i][j].getComponent(ElementScript).isTracing = false;
                this.cells[i][j].getComponent(ElementScript).isSelect = false;
            }
        }
    }
    CheckCanTracing()
    {
        if(this.listCellTraced.length == 0)
        {
            return true
        } 
        
    }
    getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}

