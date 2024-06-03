import { _decorator, Component, Node, Sprite, Color, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemPhaseScript')
export class ItemPhaseScript extends Component {
    start() {

    }
    ChangeType(type:number)
    {
        if(type == 0)
        {
            this.getComponent(Sprite).color = Color.WHITE
        } else
        if(type == 1)
        {
            tween(this.node)
            .to(0.5,{scale:new Vec3(1.1,1.1,1.1)})
            .start()
            this.getComponent(Sprite).color = Color.RED
        } else
        if(type == 2)
        {
            tween(this.node)
            .to(0.5,{scale:new Vec3(1,1,1)})
            .start()
            this.getComponent(Sprite).color = Color.GREEN
        }
    }
    update(deltaTime: number) {
        
    }
}

