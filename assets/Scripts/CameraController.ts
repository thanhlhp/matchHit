import { _decorator, Component, Node, tween, Vec3, Tween, easing } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    start() {

    }
    PanCam()
    {
        let pos = this.node.position;
        tween(this.node)
                .call(()=>{
            
                })
                .by(0.05,{position: new Vec3(0,0,0.15)})  
                .by(0.05,{position: new Vec3(0,0,-0.15)})  
                .call(()=>{
                    
                })
                .start()
    }
    update(deltaTime: number) {
        
    }
}

