import { _decorator, Component, Node, SkeletalAnimation } from 'cc';
import { DemonStats } from './DemonStats';
import { GamePlayManager } from './GamePlayManager';
import { InputManager } from './InputManager';
import { PlayerStats } from './PlayerStats';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('DemonController')
export class DemonController extends Component {
    @property(SkeletalAnimation) 
    demonAnimation :SkeletalAnimation = null;
    numberAtk:number;
    animString:string;
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
        this.demonAnimation.play("Idle");  
    }
    PlayAnimation(count:number) {
        this.animString = "Attack";
        this.numberAtk = count;
        
        // Lưu trữ callback cho animation này
        if(this.numberAtk>0 && this.isPlay== false)
        {
            this.demonAnimation.play(this.animString);
            console.log(this.animString)
            this.isPlay = true;
           
        }
        if(this.numberAtk ==0)
        {
            this.demonAnimation.play("Idle"); 
            if( GamePlayManager.getInstance().character.getComponent(PlayerStats).haveShield == true)
            {
                UIManager.getInstance().iconShield.active = false;
                GamePlayManager.getInstance().character.getComponent(PlayerStats).haveShield = false;
            }        
   
            InputManager.getInstance().isPlay = false;
        }
        
    }
    AnimTakeDame()
    {
        this.animString = "BeingHit";
        this.demonAnimation.play(this.animString);

    }
    AnimDead()
    {
        this.animString = "Death";
        this.demonAnimation.play(this.animString);

    }
    getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    OnAnimationFinished()
    {   
        if(this.animString =="Attack")
        {
            
            this.numberAtk--;
           
            GamePlayManager.getInstance().character.getComponent(PlayerStats).takeDamage(GamePlayManager.getInstance().character.getComponent(PlayerStats).damage);
            this.isPlay = false;
            this.PlayAnimation( this.numberAtk);
            console.log(this.numberAtk,this.isPlay)
        }
        if(this.animString =="Death")
        {
            
            this.node.destroy();
        }
    
    }

    update(deltaTime: number) {
        
    }
}

