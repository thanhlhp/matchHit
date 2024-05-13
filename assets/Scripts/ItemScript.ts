import { _decorator, Component, Node, CCInteger, tween, Vec3 } from 'cc';
import { InputManager } from './InputManager';
const { ccclass, property } = _decorator;

@ccclass('ItemScript')
export class ItemScript extends Component {
    @property(CCInteger) type:number = 0;

    start() {

    }
    Claim()
    {
        tween(this.node)
                .call(()=>{
                    this.node.getComponent(ItemScript).type = 0;
                    this.node = null;
                })
                .to(0.25,{scale: new Vec3(0,0,0)})
                .call(()=>{
                   
                    //item.destroy();
                })
                .call(()=>{
                    InputManager.getInstance().thisGrid.ScaleItem(false);
                 
                })
                .start()
    }
    update(deltaTime: number) {
        
    }
}

