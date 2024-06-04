import { _decorator, Component, Node, Sprite, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkillItemController')
export class SkillItemController extends Component {
    @property(Node)
    fillImg:Node = null;
    canCast:boolean = false;
    start() {
       
    }
    Init(a:number)
    {
        let b = (this.fillImg.getComponent(Sprite).fillRange*10 - a)/10;
        console.log("ssss//"+b+a)
        if(b>0)
        {
            tween(this.fillImg.getComponent(Sprite))
            .to(1.5,{fillRange:b})
            .start();
        }
        else
        if(b<=0)
         {
            tween(this.fillImg.getComponent(Sprite))
            .to(1.5,{fillRange:0})
            .delay(1.5)
            .call(()=>{
                this.canCast = true;
            })
            .start();

         }
    }

    update(deltaTime: number) {
        
    }
}

