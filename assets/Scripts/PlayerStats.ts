import { _decorator, Component, Node, CCInteger, UI } from 'cc';
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
    hpBase:number;
    onLoad() {
        this.hpBase = this.hp;
        
    }

    takeDamage(amount: number) {
        this.hp -= amount;
        UIManager.getInstance().SpawnTextDame1(amount.toString());
        UIManager.getInstance().updateHpPlayer(this.hp/this.hpBase);
        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        // Thêm logic khi nhân vật chết, ví dụ: hủy node, phát hiệu ứng, v.v.

        this.node.destroy();
    }

    attack() {
       
    }

}

