import { _decorator, Component, Node, CCInteger, Vec3, UITransform, Vec2, CCFloat } from 'cc';
import { InputManager } from './InputManager';
const { ccclass, property } = _decorator;

@ccclass('ElementScript')
export class ElementScript extends Component {
    @property(Number) color:number = 0;
    isSelect: boolean = false;
    @property(CCFloat) posX : number;
    @property(CCFloat) posY:number;
    onLoad()
    {
        // this.node.on(Node.EventType.TOUCH_CANCEL,(event:EventTouch)=>
        // {
        //     this.isSelect = false;
        // })
    }
    start() {
        
    }
    /**
     * CheckTouch
     */
    CheckTouch(pos : Vec3)
    {
        if(InputManager.getInstance().isTouch)
        if(this.node.getComponent(UITransform).getBoundingBox().contains(new Vec2(pos.x,pos.y)) && this.isSelect == false) 
        {
            console.log(this.color,this.isSelect);
            this.isSelect = true;
        }
    }
    startEvent()
    {

    }
    update(deltaTime: number) 
    {
       this.CheckTouch(InputManager.getInstance().mousePos);
    }
}

