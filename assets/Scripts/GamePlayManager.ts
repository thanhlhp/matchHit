import { _decorator, Component, Node, UITransform, SkeletalAnimation, resources, instantiate, Prefab } from 'cc';
import { GridGenerator } from './GridGenerator';
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
    @property(Node)
    levelHolder:Node;
    @property(Node)
    mainCamera:Node;
    @property(Node)
    thisGrid:Node;

    private static instance: GamePlayManager = null;
    public static getInstance(): GamePlayManager {
        if (!GamePlayManager.instance) {
            GamePlayManager.instance = new GamePlayManager();
        }
        return GamePlayManager.instance;
    }
   
    onLoad()
    {
            localStorage.setItem("level","1");
            GamePlayManager.instance = this;
          
       
          
       
        
    }
    LoadLevel(callback)
    {
        resources.load('levels/'+localStorage.getItem("level"), Prefab, (err, prefab) => {
            if (err) {
                console.error(err);
                return;
            }
            let newNode = instantiate(prefab);
            this.level = newNode;
            this.level.setParent(this.levelHolder);
        });
        this.scheduleOnce(callback,0.2);
       
    }
    PlayAnimation(a:number,b:number)
    {
        this.character.getComponent(PlayerController).PlayAnimation(a,b);
    }
    start() {
        // this.LoadLevel(()=>{
            this.LoadLevel(()=>{
                this.thisGrid.getComponent(GridGenerator).GridGen();
                this.level.getComponent(LevelScript).GoNextDemon();
            })
       
        // });
       
      
        console.log("NextLvel");
        
    }
   
    update(deltaTime: number) {
        
    }
}

