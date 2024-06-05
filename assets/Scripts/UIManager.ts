import { _decorator, Component, Node, ScrollBar, ProgressBar, Vec3, instantiate, Prefab, RichText, Scene, Director, director, Label, tween, Sprite } from 'cc';
import { DemonStats } from './DemonStats';
import { GamePlayManager } from './GamePlayManager';
import { PlayerStats } from './PlayerStats';
import { SkillItemController } from './SkillItemController';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Node)
    hpPlayer:Node;
    @property(Node)
    hpDemon:Node;
    @property(Node)
    board:Node;
    @property(Node)
    phase:Node;
    @property(Node)
    popupWin:Node;
    @property(Node)
    posTextDame1:Node = null;
    @property(Node)
    posTextDame2:Node = null;
    @property(Node)
    iconShield:Node;
    @property(Label)
    text: Label;
    @property(Prefab)
    textDame: Prefab;
    @property(Node)
    listPhaseItem:Node[] = [];
    @property(SkillItemController)
    listSkills:SkillItemController[] = [];
    @property(Node)
    posBoard:Node;
    @property(Node)
    posPhase:Node;
    @property(Node)
    posBarHpPlayer:Node;
    @property(Node)
    posBarHpDemon:Node;
    @property(Node)
    startBtn:Node;

    private static instance: UIManager = null;
    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager();
        }
        return UIManager.instance;
    }
    
    onLoad()
    {
        UIManager.instance = this;
    }
    ShowUiGamePlay()
    {
        tween(this.hpPlayer)
        .to(0.5,{position:this.posBarHpPlayer.position})
        .start();
        tween(this.hpDemon)
        .to(0.5,{position:this.posBarHpDemon.position})
        .start();
        tween(this.board)
        .to(0.5,{position:this.posBoard.position})
        .start();
        tween(this.phase)
        .to(0.5,{position:this.posPhase.position})
        .start();
    }
    start() {
        this.hpPlayer.getComponent(ProgressBar).progress = 1;
        this.hpDemon.getComponent(ProgressBar).progress = 1;
        this.text.string ="Level:"+ localStorage.getItem("level");
    }
    CastSkillRed()
    {
        if(this.listSkills[0].canCast)
        {
            //Logic here
            console.log("nem lua");
            GamePlayManager.getInstance().demon.getComponent(DemonStats).takeDamage(GamePlayManager.getInstance().character.getComponent(PlayerStats).damage*GamePlayManager.getInstance().character.getComponent(PlayerStats).dameFireBall);
            this.listSkills[0].canCast = false;
            this.listSkills[0].fillImg.getComponent(Sprite).fillRange = 1;
        }
    }
    CastSkillBlue()
    {
        if(this.listSkills[1].canCast)
        {
            //Logic here
            console.log("buff shield");
            this.iconShield.active = true;

            GamePlayManager.getInstance().character.getComponent(PlayerStats).haveShield = true;
            this.listSkills[1].canCast = false;
            this.listSkills[1].fillImg.getComponent(Sprite).fillRange = 1;
        }
    }
    CastSkillGreen()
    {
        if(this.listSkills[2].canCast)
        {
            //Logic here
            console.log("heal");
            GamePlayManager.getInstance().character.getComponent(PlayerStats).heal_vfx.play();
            let newHp = GamePlayManager.getInstance().character.getComponent(PlayerStats).hp+GamePlayManager.getInstance().character.getComponent(PlayerStats).damage*3;
            GamePlayManager.getInstance().character.getComponent(PlayerStats).hp = newHp;
            this.updateHpPlayer(newHp/ GamePlayManager.getInstance().character.getComponent(PlayerStats).hpBase)
            this.listSkills[2].canCast = false;
            this.listSkills[2].fillImg.getComponent(Sprite).fillRange = 1;
        }
    }
    OpenPopupWin()
    {
        this.popupWin.active = true;
    }
    ClosePopupWin()
    {
        this.popupWin.active = false;
        let level = parseInt(localStorage.getItem('level'))+1;
        localStorage.setItem("level",level.toString())
        director.loadScene("GameScene");
    }
    SpawnTextDame1(s:string)
    {
        console.log(s);
        let text =  instantiate(this.textDame);
        text.getComponent(RichText).string = s;
        text.setParent(this.node);
        text.setPosition(this.posTextDame1.position);
    }
    SpawnTextDame2(s:string)
    {
        console.log(s);
        let text =  instantiate(this.textDame);
        text.getComponent(RichText).string = s;
        text.setParent(this.node);
        text.setPosition(this.posTextDame2.position);
    }
    updateHpPlayer(value: number)
    {
        tween(this.hpPlayer.getComponent(ProgressBar))
        .to(0.5,{progress:value})
        .start();
    }
    updateHpDemon(value: number)
    {
        tween(this.hpDemon.getComponent(ProgressBar))
        .to(0.5,{progress:value})
        .start();
    }
    BtnStart()
    {
        GamePlayManager.getInstance().PlayGame();
        this.startBtn.active =false;
    }
    update(deltaTime: number) {
        
    }
}

