import { _decorator, Component, Node, ProgressBar } from 'cc';
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

    onLoad() {
        this.hpBase = this.hp;
    }

    takeDamage(amount: number) {
        this.hp -= amount;
        UIManager.getInstance().SpawnTextDame2(amount.toString());
        UIManager.getInstance().updateHpDemon( this.hp/this.hpBase);
        if (this.hp <= 0) {
            this.die();
            InputManager.getInstance().isPlay = false;
            UIManager.getInstance().text.string = GamePlayManager.getInstance().level.getComponent(LevelScript).demonCount.toString();
            GamePlayManager.getInstance().demon = null;
            GamePlayManager.getInstance().level.getComponent(LevelScript).GoNextDemon();
        }
    }

    die() 
    {
        // Thêm logic khi nhân vật chết, ví dụ: hủy node, phát hiệu ứng, v.v.
      
            this.node.destroy();
       
    }

    attack() {
       
    }
}

