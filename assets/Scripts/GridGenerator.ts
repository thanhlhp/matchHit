import { _decorator, Component, Node, Prefab, instantiate, Vec3, random } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridGenerator')
export class GridGenerator extends Component {
    @property(Prefab)
    cellPrefabs: Prefab[] = []; // Assign a prefab in the editor
    @property(Node)
    board : Node;

    @property
    gridSize: number = 8; // Grid dimensions
    cellSize: number = 100; // Size of each cell in pixels
  
    start() {
        
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                let index =Math.round(this.getRandomNumber(0,2));   
                const cell = instantiate(this.cellPrefabs[index]); // Create a new cell from the prefab
                cell.setParent(this.board); // Set the parent of the cell to this node
                // Calculate position based on grid coordinates
                const posX = j * this.cellSize - (this.gridSize / 2) * this.cellSize + this.cellSize / 2;
                const posY = i * this.cellSize - (this.gridSize / 2) * this.cellSize + this.cellSize / 2;
                cell.setPosition(new Vec3(posX, posY, 0));
            }
        }
    }
    getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}

