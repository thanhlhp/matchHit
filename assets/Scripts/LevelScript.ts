import { _decorator, Component, Node, Prefab, instantiate, Scene } from 'cc';
import { DemonStats } from './DemonStats';
import { GamePlayManager } from './GamePlayManager';
import { InputManager } from './InputManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('LevelScript')

export class LevelScript extends Component {
    @property(Number)
    demonCount:number = 0;
    @property(Prefab)
    demonPb:Prefab = null;
    @property(Node)
    map:Node = null;
    @property(Node)
    spawnPosDemon:Node;
    start() {

    }
    GoNextDemon()
    {
        this.demonCount--;
        this.scheduleOnce(()=>{
            if(this.demonCount>=0)
            {
              
                let demon =  instantiate(this.demonPb);
                demon.getComponent(DemonStats).hp = 100;
                demon.getComponent(DemonStats).damage = 5;
                demon.setParent(this.map);
                GamePlayManager.getInstance().demon = demon;
                UIManager.getInstance().updateHpDemon(1);
                
                demon.setPosition(this.spawnPosDemon.position);
            } else
            {
                console.log("win");
            }
        },0.5)
       
    }
    update(deltaTime: number) {
        
    }
}

