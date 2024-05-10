import { _decorator, Component, Node, CCInteger, Vec3, UITransform, Vec2, CCFloat, EventTouch } from 'cc';
import { InputManager } from './InputManager';
const { ccclass, property } = _decorator;

@ccclass('ElementScript')
export class ElementScript extends Component {
    @property(CCInteger) color:number = 0;
    @property(Node) item = null;
    isSelect: boolean = false;
    isTracing: boolean = false;
    breakable:boolean = false;
    health: number = 0;
    x:number;
    y:number;
    stt:number;
    onLoad()
    {
      
    }
    start() {
        
    }

    CheckTouch(pos : Vec3)
    {
        if(InputManager.getInstance().isTouch)
        if(this.node.getComponent(UITransform).getBoundingBox().contains(new Vec2(pos.x,pos.y)) && this.isSelect == false) 
        {
            this.OnTouch();
            this.isSelect = true;   
        }
        if(this.node.getComponent(UITransform).getBoundingBox().contains(new Vec2(pos.x,pos.y)) && this.isSelect == true)
        {

        }
    }
    OnTouch()
    {
        if(InputManager.getInstance().thisGrid.CheckCanTracing(this.node))
        {
            this.isTracing = true;
        }
    }
    update(deltaTime: number) 
    {
        // console.log(InputManager.getInstance().isTouch);
        // if(InputManager.getInstance().mousePos!=null)
        // {
           
        //     this.CheckTouch(InputManager.getInstance().mousePos);
        // }
        
    }
}

