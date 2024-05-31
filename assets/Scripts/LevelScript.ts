import { _decorator, Component, Node, Prefab, instantiate, Scene } from 'cc';
import { DemonStats } from './DemonStats';
import { GamePlayManager } from './GamePlayManager';
import { InputManager } from './InputManager';
import { LevelHolder } from './LevelHolder';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;
@ccclass('CellEditor')
export class CellEditor {
    @property
    breakable: boolean = false;
    @property
    id:number = 0
    @property
    hp: number = 0;
   
 

    // constructor(hp: number, atk: number) {
    //     this.hp = hp;
    //     this.atk = atk;
    // }

    // updateStats(newHp: number, newAtk: number) {
    //     this.hp = newHp;
    //     this.atk = newAtk;
    // }
}
@ccclass('DemonEditor')
export class DemonEditor {
    @property
    id:number = 0
    @property
    hp: number = 0;
    @property
    atk: number = 0;
 

    // constructor(hp: number, atk: number) {
    //     this.hp = hp;
    //     this.atk = atk;
    // }

    // updateStats(newHp: number, newAtk: number) {
    //     this.hp = newHp;
    //     this.atk = newAtk;
    // }
}
@ccclass('LevelScript')

export class LevelScript extends Component {
    @property(Number)
    demonCount:number = 0;
    @property(Node)
    map:Node = null;
    @property(Node)
    spawnPosDemon:Node;
    @property(DemonEditor)
    demonList:DemonEditor[] = new Array(4);
    levelHolder:LevelHolder;
    @property(CellEditor)
    listCellEditor:CellEditor[][] = new Array(new Array(36))
    onLoad()
    {
        this.demonCount = 0;
        this.levelHolder = GamePlayManager.getInstance().levelHolder.getComponent(LevelHolder);
    }
   
    start() {
        console.log(this.demonCount);

    }
    GoNextDemon()
    {
        this.demonCount++;
        this.scheduleOnce(()=>{
            if(this.demonCount<=2)
            {
              
                let demon =  instantiate(this.levelHolder.demonPbs[this.demonList[this.demonCount].id]);
                demon.getComponent(DemonStats).hp = this.demonList[this.demonCount].hp;
                demon.getComponent(DemonStats).damage = this.demonList[this.demonCount].atk;
                demon.setParent(this.map);
                
                GamePlayManager.getInstance().demon = demon;
                UIManager.getInstance().updateHpDemon(1);
                demon.setPosition(this.spawnPosDemon.position);
            } else
            {
                UIManager.getInstance().OpenPopupWin();
                console.log("win",this.demonCount);
            }
        },0.5)
       
    }
    update(deltaTime: number) {
        
    }
}

