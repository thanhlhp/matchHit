import { _decorator, Component, Node, CCInteger, UI, ParticleSystem } from 'cc';
import { CameraController } from './CameraController';
import { GamePlayManager } from './GamePlayManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerStats')
export class PlayerStats extends Component {
    @property(Number)
    id: number = 0;

    @property(Number)
    hp: number = 100;

    @property(Number)
    damage: number = 5;
    @property(ParticleSystem)
    heal_vfx:ParticleSystem;
    dameFireBall:number = 1.5;
    haveShield:boolean = false;
    hpBase:number;
    onLoad() {
        this.hpBase = this.hp;
        
    }

    takeDamage(amount: number) {
        if(this.haveShield)
        {
            console.log("dam vao shield");
            UIManager.getInstance().SpawnTextDame1("BLOCKED");
        } else
        {
            this.hp -= amount;
            UIManager.getInstance().SpawnTextDame1(amount.toString());
            GamePlayManager.getInstance().mainCamera.getComponent(CameraController).PanCam();
            UIManager.getInstance().updateHpPlayer(this.hp/this.hpBase);
            if (this.hp <= 0) {
                this.die();
            }
        }
      
    }

    die() {
        // Thêm logic khi nhân vật chết, ví dụ: hủy node, phát hiệu ứng, v.v.

        this.node.destroy();
    }

    attack() {
       
    }

}

