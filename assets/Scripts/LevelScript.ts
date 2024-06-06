import { _decorator, Component, Node, Prefab, instantiate, Scene, Vec3 } from 'cc';
import { DemonStats } from './DemonStats';
import { GamePlayManager } from './GamePlayManager';
import { InputManager } from './InputManager';
import { ItemPhaseScript } from './ItemPhaseScript';
import { LevelHolder } from './LevelHolder';
import { PlayerController } from './PlayerController';
import { PlayerStats } from './PlayerStats';
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
    @property(LevelHolder)
    levelHolder:LevelHolder;
    @property(CellEditor)
    listCellEditor:CellEditor[] = new Array(36)
    @property(Node)
    listPosDemon:Node[] = new Array(4);
    listDemon:Node[] = new  Array(4);
    onLoad()
    {
        //this.demonCount = 0;
        if(this.levelHolder == null)
        this.levelHolder = GamePlayManager.getInstance().levelHolder.getComponent(LevelHolder);
    }
   
    start() {
        console.log(this.demonCount);
        this.demonCount = 0;

    }
    GoNextDemon()
    {
        // this.demonCount++;
        this.scheduleOnce(()=>{
            for(let i = 0;i<this.demonList.length;i++)
            {  
                let demon =  instantiate(this.levelHolder.getComponent(LevelHolder).demonPbs[this.demonList[i].id]);
                demon.getComponent(DemonStats).hp = this.demonList[i].hp;
                demon.getComponent(DemonStats).damage = this.demonList[i].atk;
                demon.setPosition(this.listPosDemon[i].position);
                demon.setParent(this.map);
                this.listDemon[i] = demon;
                console.log(demon.position.z+"/ssss/"+demon.worldPosition.z);
                //UIManager.getInstance().text.string = GamePlayManager.getInstance().level.getComponent(LevelScript).demonCount.toString();

                
               
            } 
        },0.5)
       
    }
    update(deltaTime: number) {
        if(GamePlayManager.getInstance().character.getComponent(PlayerController).isRuning)
            this.node.position = new Vec3(this.node.position.x,this.node.position.y,this.node.position.z-4*deltaTime)
        if(GamePlayManager.getInstance().character.position.z>=this.listPosDemon[this.demonCount].worldPosition.z-4)
        {
            GamePlayManager.getInstance().demon = this.listDemon[this.demonCount];
            GamePlayManager.getInstance().GoFight(true);
        } else
        {
            GamePlayManager.getInstance().GoFight(false);
        }
    }
}

