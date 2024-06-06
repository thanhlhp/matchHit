import { _decorator, Component, Node, ProgressBar } from 'cc';
import { CameraController } from './CameraController';
import { DemonController } from './DemonController';
import { GamePlayManager } from './GamePlayManager';
import { InputManager } from './InputManager';
import { ItemPhaseScript } from './ItemPhaseScript';
import { LevelScript } from './LevelScript';
import { PlayerController } from './PlayerController';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('DemonStats')
export class DemonStats extends Component {
    @property(Number)
    id: number = 0;

    @property(Number)
    hp: number = 100;

    @property(Number)
    damage: number = 5;
    hpBase: number;
    animDemon:DemonController;
    onLoad() {
        this.hpBase = this.hp;
        this.animDemon = this.getComponent(DemonController);
    }

    takeDamage(amount: number) {
        UIManager.getInstance().SpawnTextDame2(amount.toString());
        GamePlayManager.getInstance().mainCamera.getComponent(CameraController).PanCam();
        this.animDemon.AnimTakeDame();
        if (this.hp > 0) {
            this.hp -= amount;
            
            UIManager.getInstance().updateHpDemon( this.hp/this.hpBase);

            // this.die();
            // InputManager.getInstance().isPlay = false;
          
            // GamePlayManager.getInstance().demon = null;
            // GamePlayManager.getInstance().level.getComponent(LevelScript).GoNextDemon();
        }
    }

    die() 
    {
        this.animDemon.AnimDead();
        InputManager.getInstance().isPlay = false;  
        GamePlayManager.getInstance().demon = null;
        
        UIManager.getInstance().listPhaseItem[GamePlayManager.getInstance().level.getComponent(LevelScript).demonCount].getComponent(ItemPhaseScript).ChangeType(2);
        GamePlayManager.getInstance().level.getComponent(LevelScript).demonCount++;

        if( GamePlayManager.getInstance().level.getComponent(LevelScript).demonCount<=3)
        {
      
            GamePlayManager.getInstance().character.getComponent(PlayerController).isRuning = true;
      
        }
            
        else{
            UIManager.getInstance().OpenPopupWin();
        }

        
        // Thêm logic khi nhân vật chết, ví dụ: hủy node, phát hiệu ứng, v.v.
      
            //this.node.destroy();

       
    }

    attack() {
       
    }
}

