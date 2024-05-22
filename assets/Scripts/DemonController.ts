import { _decorator, Component, Node, SkeletalAnimation } from 'cc';
import { GamePlayManager } from './GamePlayManager';
import { InputManager } from './InputManager';
const { ccclass, property } = _decorator;

@ccclass('DemonController')
export class DemonController extends Component {
    @property(SkeletalAnimation) 
    demonAnimation :SkeletalAnimation = null;
    numberAtk:number;
    isPlay:boolean = false;
    onLoad()
    {
        this.demonAnimation = this.getComponent(SkeletalAnimation);
        if (this.demonAnimation) {
            // Lắng nghe sự kiện 'finished' trên skeletalAnimation
            this.demonAnimation.on(SkeletalAnimation.EventType.FINISHED,this.OnAnimationFinished, this);
        } else {
            console.error('SkeletalAnimation component is not assigned.');
        }
       
    }
    start() {
        this.demonAnimation.play("idle1");  
    }
    PlayAnimation(count:number) {
        let animString = "Attack1";
        this.numberAtk = count;
        
        // Lưu trữ callback cho animation này
        if(this.numberAtk>0 && this.isPlay== false)
        {
            this.demonAnimation.play(animString);
            this.isPlay = true;
           
        }
        if(this.numberAtk ==0)
        {
            InputManager.getInstance().isPlay = false;
        }
        
    }
    getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    OnAnimationFinished()
    {
        this.numberAtk--;
        this.isPlay = false;
        this.PlayAnimation( this.numberAtk);
        console.log(this.numberAtk,this.isPlay)
    }

    update(deltaTime: number) {
        
    }
}

