import { _decorator, Component, Node, ProgressBar } from 'cc';
import { CameraController } from './CameraController';
import { DemonController } from './DemonController';
import { GamePlayManager } from './GamePlayManager';
import { InputManager } from './InputManager';
import { LevelScript } from './LevelScript';
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
        this.hp -= amount;
        UIManager.getInstance().SpawnTextDame2(amount.toString());
        GamePlayManager.getInstance().mainCamera.getComponent(CameraController).PanCam();
        UIManager.getInstance().updateHpDemon( this.hp/this.hpBase);
        this.animDemon.AnimTakeDame();
        if (this.hp <= 0) {
            this.die();
            InputManager.getInstance().isPlay = false;
          
            GamePlayManager.getInstance().demon = null;
            GamePlayManager.getInstance().level.getComponent(LevelScript).GoNextDemon();
        }
    }

    die() 
    {
        this.animDemon.AnimDead();
        // Thêm logic khi nhân vật chết, ví dụ: hủy node, phát hiệu ứng, v.v.
      
            //this.node.destroy();

       
    }

    attack() {
       
    }
}

