import { _decorator, Component, Node, UITransform, SkeletalAnimation, resources, instantiate, Prefab } from 'cc';
import { CameraController } from './CameraController';
import { GridGenerator } from './GridGenerator';
import { InputManager } from './InputManager';
import { ItemPhaseScript } from './ItemPhaseScript';
import { LevelScript } from './LevelScript';
import { PlayerController } from './PlayerController';
import { PlayerStats } from './PlayerStats';
import { UIManager } from './UIManager';
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
                //this.level.getComponent(LevelScript).GoNextDemon();
            })
       
        // });
       
      
        console.log("NextLvel");
        
    }
    PlayGame()
    {
        this.mainCamera.getComponent(CameraController).TransCamPlay();
        UIManager.getInstance().ShowUiGamePlay();
        this.character.getComponent(PlayerController).isRuning = true;
        this.level.getComponent(LevelScript).GoNextDemon();
        this.character.getComponent(PlayerController).CharacterAnim.getState('idle1').pause();
    }
    GoFight(bool:boolean)
    {
        if(bool)
        {
           
            if(this.character.getComponent(PlayerController).isRuning)
            {
                UIManager.getInstance().updateHpDemon(1);
                this.character.getComponent(PlayerController).CharacterAnim.getState('idle1').resume();
                this.character.getComponent(PlayerController).isRuning = false;
                this.character.getComponent(PlayerController).isPlay = false;
                InputManager.getInstance().isPlay = false;
                UIManager.getInstance().listPhaseItem[this.level.getComponent(LevelScript).demonCount].getComponent(ItemPhaseScript).ChangeType(1);
                
            } 
        }
        else
        {
            this.character.getComponent(PlayerController).CharacterAnim.getState('idle1').pause();
        }
        
    }
   
    update(deltaTime: number) {
        
    }
}

