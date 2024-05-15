import { _decorator, Component, Node, CCInteger, tween, Vec3, Vec2 } from 'cc';
import { ElementScript } from './ElementScript';
import { InputManager } from './InputManager';
const { ccclass, property } = _decorator;

@ccclass('ItemScript')
export class ItemScript extends Component {
    @property(CCInteger) type:number = 0;

    canDrop:boolean = false;
    listDropMove:Vec2[]=[];
    start() {

    }
    Claim()
    {
        tween(this.node)
                .call(()=>{
                    //this.node.getComponent(ItemScript).type = 0;
                    // this.node = null;
                })
                .to(0.25,{scale: new Vec3(0,0,0)})
                .call(()=>{
                    InputManager.getInstance().thisGrid.ScaleItem(false);
                    //InputManager.getInstance().thisGrid.CheckCellNull();
                })  
                .start()
    }
    Drop()
    {
        for(let i =0;i<this.listDropMove.length;i++)
        {
            let x = InputManager.getInstance().thisGrid.cells[this.listDropMove[i].x][this.listDropMove[i].y].position.x;
            let y = InputManager.getInstance().thisGrid.cells[this.listDropMove[i].x][this.listDropMove[i].y].position.y;
            tween(this.node)
            .call(()=>{
                //this.node.getComponent(ItemScript).type = 0;
               
            })
            .to(0.5,{position: new Vec3(x,y,0)})
            .call(()=>{  
                //item.destroy();
            })
            .start()
            // if(i == this.listDropMove.length)
            // {
            //     InputManager.getInstance().thisGrid.cells[this.listDropMove[i].x][this.listDropMove[i].y].getComponent(ElementScript).item = this.node;
            // }
        }
       
    }
    ResetListDrop()
    {
        this.canDrop = false;
        this.listDropMove = [];
    }
    update(deltaTime: number) {
        
    }
}

