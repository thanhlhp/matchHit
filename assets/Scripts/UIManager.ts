import { _decorator, Component, Node, ScrollBar, ProgressBar, Vec3, instantiate, Prefab, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Node)
    hpPlayer:Node;
    @property(Node)
    hpDemon:Node;
    @property(Node)
    popupWin:Node;
    @property(Node)
    posTextDame1:Node = null;
    @property(Node)
    posTextDame2:Node = null;
    @property(Prefab)
    textDame: Prefab;
    private static instance: UIManager = null;
    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager();
        }
        return UIManager.instance;
    }
    onLoad()
    {
        if (UIManager.instance === null) {
            UIManager.instance = this;
        } else {
            this.destroy(); // Destroy any additional instances created
        }
    }
    start() {
        this.hpPlayer.getComponent(ProgressBar).progress = 1;
        this.hpDemon.getComponent(ProgressBar).progress = 1;
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
        this.hpPlayer.getComponent(ProgressBar).progress = value;
    }
    updateHpDemon(value: number)
    {
        this.hpDemon.getComponent(ProgressBar).progress = value;
    }
    update(deltaTime: number) {
        
    }
}

