import { _decorator, Component, Node, Vec3, EventTouch, UITransform, Vec2, tween, Tween } from 'cc';
import { DrawLine } from './DrawLine';
import { ElementScript } from './ElementScript';
import { GridGenerator } from './GridGenerator';
import { ItemScript } from './ItemScript';
const { ccclass, property } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {
    isTouch:boolean = false;
    mousePos:Vec3;
    @property(Node)
    thisBoard:Node = null;
    @property(GridGenerator)
    thisGrid:GridGenerator;
    private static instance: InputManager = null;
    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }
        return InputManager.instance;
    }
 
    onLoad()
    {
        if (InputManager.instance === null) {
            InputManager.instance = this;
        } else {
            this.destroy(); // Destroy any additional instances created
        }
   
        
    }
    start(): void {
        this.node.on(Node.EventType.TOUCH_START,(event:EventTouch)=>
        {
            this.OnTouchStart(event);
        },this);
        this.node.on(Node.EventType.TOUCH_MOVE,(event:EventTouch)=>
        {
    
            this.OnTouchMove(event);
        },this);
        this.node.on(Node.EventType.TOUCH_END,(event:EventTouch)=>
        {
            this.OnTouchEnd(event);
        },this)
    }
    OnTouchStart(event: EventTouch)
    {
        this.thisGrid.ResetListCellTraced();    
        this.mousePos = this.thisBoard.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
        for (let i = 0;i<this.thisGrid.gridSize;i++)
        {   
                this.thisGrid.cells[i].forEach(cell=>{    
                if(cell!=null && cell.getComponent(ElementScript).item!=null &&cell.getComponent(ElementScript).item.getComponent(ItemScript).type!=0  && cell.getComponent(UITransform).getBoundingBox().contains(new Vec2(this.mousePos.x,this.mousePos.y)))
                {
                    this.isTouch = true;
                    cell.getComponent(ElementScript).isSelect = true;
                    cell.getComponent(ElementScript).CheckTouch();
                    
                }
                
                })
        }
       
    
    }
    OnTouchMove(event:EventTouch)
    {
        this.mousePos = this.thisBoard.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
        for (let i = 0;i<this.thisGrid.gridSize;i++)
        {
                this.thisGrid.cells[i].forEach(cell=>{
                    if(cell!=null && cell.getComponent(UITransform).getBoundingBox().contains(new Vec2(this.mousePos.x,this.mousePos.y)))
                    {
                        cell.getComponent(ElementScript).isSelect = true;
                        cell.getComponent(ElementScript).CheckTouch();
                        
                    }
                })
        }
        // 

    }
    OnTouchEnd(event:EventTouch)
    {       
            if(this.isTouch)
            {
                if(this.thisGrid.getComponent(GridGenerator).listCellTraced.length>=2 )
                {
                    console.log("an duoc combo"+this.thisGrid.getComponent(GridGenerator).listCellTraced.length+"type:"+this.thisGrid.getComponent(GridGenerator).listCellTraced[1].getComponent(ElementScript).color);
                    this.ClaimCell();
                    for(let i = 0;i<this.thisGrid.listLineRender.length;i++)
                    {
                        this.thisGrid.listLineRender[i].destroy();
                    }
                    
                } else 
                {
                    this.thisGrid.ScaleItem(false);
                }
                this.isTouch = false;
            }
            
         
            this.thisGrid.ResetListCellTraced();
        
    }
    ClaimCell()
    {
        this.thisGrid.getComponent(GridGenerator).listCellTraced.forEach(obj=>{
            if(obj!=null)
            {
                let item:Node = obj.getComponent(ElementScript).item;
                item.getComponent(ItemScript).Claim();
            }
        
            
         })
    }
    
 

    update(deltaTime: number) {
      
    }
}

