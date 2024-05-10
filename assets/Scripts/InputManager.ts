import { _decorator, Component, Node, Vec3, EventTouch, UITransform, Vec2, tween } from 'cc';
import { ElementScript } from './ElementScript';
import { GridGenerator } from './GridGenerator';
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
        this.node.on(Node.EventType.TOUCH_START,(event:EventTouch)=>
        {
            this.OnTouchStart(event);
        },this);
        this.node.on(Node.EventType.TOUCH_MOVE,(event:EventTouch)=>
        {
            // if(this.isTouch)
            // {
            //     this.mousePos = this.thisBoard.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
            // }
            this.OnTouchMove(event);
        },this);
        this.node.on(Node.EventType.TOUCH_END,(event:EventTouch)=>
        {
            this.OnTouchEnd(event);
        },this)
        // this.node.on(Node.EventType.TOUCH_CANCEL,(event:EventTouch)=>
        // {
        //     this.isTouch = false;
           
        // })
    }
    OnTouchStart(event: EventTouch)
    {
        this.thisGrid.ResetListCellTraced();  
        this.isTouch = true;
        this.mousePos = this.thisBoard.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
        for (let i = 0;i<this.thisGrid.gridSize;i++)
        {
                this.thisGrid.cells[i].forEach(cell=>{
                    cell.getComponent(ElementScript).CheckTouch(this.mousePos);
                })
        }
       
    
    }
    OnTouchMove(event:EventTouch)
    {
        this.mousePos = this.thisBoard.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
        for (let i = 0;i<this.thisGrid.gridSize;i++)
        {
                this.thisGrid.cells[i].forEach(cell=>{
                    cell.getComponent(ElementScript).CheckTouch(this.mousePos);
                })
        }
        // 

    }
    OnTouchEnd(event:EventTouch)
    {
        this.isTouch = false;

        if(this.thisGrid.getComponent(GridGenerator).listCellTraced.length>=2)
        {
         console.log("an duoc combo"+this.thisGrid.getComponent(GridGenerator).listCellTraced.length+"type:"+this.thisGrid.getComponent(GridGenerator).listCellTraced[1].getComponent(ElementScript).color);
         this.thisGrid.getComponent(GridGenerator).listCellTraced.forEach(obj=>{
            obj.getComponent(ElementScript).item.destroy();
         
         })
        } else console.log("co list moi");
        this.thisGrid.ResetListCellTraced();
    }
    start(): void {

    }

    update(deltaTime: number) {
      
    }
}

