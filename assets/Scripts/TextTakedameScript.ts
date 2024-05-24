import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TextTakedameScript')
export class TextTakedameScript extends Component {
    start() {
        tween(this.node)
        .by(0.25,{position:new Vec3(0,150,0)})
        .to(0.25,{scale:Vec3.ZERO})
        .call(()=>{
            this.destroy();
        }).start();
    }
    update(deltaTime: number) {
        
    }
}

