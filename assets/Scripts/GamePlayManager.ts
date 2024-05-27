import { _decorator, Component, Node, UITransform, SkeletalAnimation } from 'cc';
import { LevelScript } from './LevelScript';
import { PlayerController } from './PlayerController';
import { PlayerStats } from './PlayerStats';
const { ccclass, property } = _decorator;

@ccclass('GamePlayManager')
export class GamePlayManager extends Component {
    @property(Node) 
    character:Node;
    @property(Node) 
    demon:Node = null;
    @property(Node)
    level:Node;



    private static instance: GamePlayManager = null;
    public static getInstance(): GamePlayManager {
        if (!GamePlayManager.instance) {
            GamePlayManager.instance = new GamePlayManager();
        }
        return GamePlayManager.instance;
    }
 
    onLoad()
    {
     
            GamePlayManager.instance = this;
     

       
        
    }
    PlayAnimation(a:number,b:number)
    {
        this.character.getComponent(PlayerController).PlayAnimation(a,b);
    }
    start() {
       
        this.level.getComponent(LevelScript).GoNextDemon();
    }
   
    update(deltaTime: number) {
        
    }
}

