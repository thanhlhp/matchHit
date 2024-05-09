import { _decorator, Component, Node, CCInteger, Vec3, UITransform, Vec2, CCFloat } from 'cc';
import { InputManager } from './InputManager';
const { ccclass, property } = _decorator;

@ccclass('ElementScript')
export class ElementScript extends Component {
    @property(CCInteger) color:number = 0;
    isSelect: boolean = false;
    isTracing: boolean = false;
    breakable:boolean = false;
    health: number = 0;
    x:number;
    y:number;
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
    }
    OnTouch()
    {
        if(InputManager.getInstance().thisGrid.CheckCanTracing)
        {
            this.isTracing = true;
        }
    }
    update(deltaTime: number) 
    {
       this.CheckTouch(InputManager.getInstance().mousePos);
    }
}

