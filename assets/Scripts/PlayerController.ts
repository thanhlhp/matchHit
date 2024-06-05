import { _decorator, Component, Node, SkeletalAnimation, tween, animation, AnimationManager } from 'cc';
import { DemonController } from './DemonController';
import { DemonStats } from './DemonStats';
import { GamePlayManager } from './GamePlayManager';
import { GridGenerator } from './GridGenerator';
import { InputManager } from './InputManager';
import { PlayerStats } from './PlayerStats';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(SkeletalAnimation) 
    CharacterAnim :SkeletalAnimation = null;
    animationCallbacks = {};
    numberAtk:number = 0;
    numberAtkdemon:number = 0;
    xPower:number = 1;
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
        console.log('PlayerController start');
        this.CharacterAnim.play("idle1");   
        // this.scheduleOnce(()=>{
        //     // this.CharacterAnim.play("Attack3");  
        //     this.CharacterAnim.defaultClip = this.CharacterAnim.clips[3];
        // },3);
    }

    PlayAnimation(count:number,xPower:number) {
       
        let a =  Math.round(this.getRandomNumber(1,3));
        let animString = "Attack"+a;
        this.numberAtk = count;
        this.xPower = xPower;

        // Lưu trữ callback cho animation này
        if(this.numberAtk>0 && this.isPlay== false)
        {
            if(GamePlayManager.getInstance().demon!=null)
            {
            
                this.numberAtkdemon++;
                console.log(this.CharacterAnim);
                this.CharacterAnim.play(animString);
                console.log("anim san sang: "+animString)
                this.isPlay = true;
                // console.log(animString);
              
            } 
            else
            {
           
                InputManager.getInstance().isPlay = false;
            }
              
          
           
        } 
        if(this.numberAtk ==0)
        {
            this.CharacterAnim.play("idle1"); 
            if(GamePlayManager.getInstance().demon!=null)
            {
              
                GamePlayManager.getInstance().demon.getComponent(DemonController).PlayAnimation(this.numberAtkdemon);
                this.numberAtkdemon = 0;
            } else 
            {
                this.numberAtkdemon = 0;
                console.log("Next demon");
            }
       
        }
        
    }
    getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    OnAnimationFinished()
    {
        console.log("sssss");
        if(GamePlayManager.getInstance().demon!=null)
        {
            console.log(this.xPower);
            this.numberAtk--;
            if(this.numberAtk > 0)
            GamePlayManager.getInstance().demon.getComponent(DemonStats).takeDamage(GamePlayManager.getInstance().character.getComponent(PlayerStats).damage)
            else  GamePlayManager.getInstance().demon.getComponent(DemonStats).takeDamage(GamePlayManager.getInstance().character.getComponent(PlayerStats).damage*this.xPower);
            this.isPlay = false;
            this.PlayAnimation( this.numberAtk,this.xPower);
        } else
        {
            this.numberAtk= 0;
          this.isPlay = false;
          InputManager.getInstance().isPlay = false;
          this.CharacterAnim.play("idle1");  
        }
       
     
        console.log(this.numberAtk,this.isPlay)
    }
  
    update(deltaTime: number) {
        
    }
}

