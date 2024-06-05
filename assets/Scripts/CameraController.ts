import { _decorator, Component, Node, tween, Vec3, Tween, easing } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    posHome:Vec3;
    posPlay:Vec3;
    onLoad()
    {
        this.posHome = new Vec3(this.node.position.x,1,-1);
        this.posPlay = new Vec3(this.node.position.x,2,1);
    }
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
    TransCamPlay()
    {
        tween(this.node)
        .to(1,{position: this.posPlay})
        .start();
    }
    TransCamHome()
    {
        tween(this.node)
        .to(1,{position: this.posHome})
        .start();
    }
    update(deltaTime: number) {
        
    }
}

