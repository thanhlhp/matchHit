import { _decorator, Component, Node, SkeletalAnimation, tween, animation, AnimationManager } from 'cc';
import { DemonController } from './DemonController';
import { GamePlayManager } from './GamePlayManager';
import { InputManager } from './InputManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(SkeletalAnimation) 
    CharacterAnim :SkeletalAnimation = null;
    animationCallbacks = {};
    numberAtk:number = 0;
    numberAtkdemon:number = 0;
    isPlay:boolean = false;
    onLoad()
    {
        this.CharacterAnim = this.getComponent(SkeletalAnimation);
        if (this.CharacterAnim) {
            // Lắng nghe sự kiện 'finished' trên skeletalAnimation
            this.CharacterAnim.on(SkeletalAnimation.EventType.FINISHED,this.OnAnimationFinished, this);
        } else {
            console.error('SkeletalAnimation component is not assigned.');
        }
       
    }
    start() {
        this.CharacterAnim.play("idle1");  
    }
    PlayAnimation(count:number) {
        let a =  Math.round(this.getRandomNumber(1,3));
        let animString = "Attack"+a;
        this.numberAtk = count;
      
       
        // Lưu trữ callback cho animation này
        if(this.numberAtk>0 && this.isPlay== false)
        {
            this.numberAtkdemon++;
            this.CharacterAnim.play(animString);
            this.isPlay = true;
           
        }
        if(this.numberAtk ==0)
        {
            GamePlayManager.getInstance().demon.getComponent(DemonController).PlayAnimation(this.numberAtkdemon);
            this.numberAtkdemon = 0;
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

