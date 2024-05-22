import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamePlayManager')
export class GamePlayManager extends Component {
    @property(Node) 
    character:Node = null;
    @property(Node) 
    demon:Node = null;
    private static instance: GamePlayManager = null;
    public static getInstance(): GamePlayManager {
        if (!GamePlayManager.instance) {
            GamePlayManager.instance = new GamePlayManager();
        }
        return GamePlayManager.instance;
    }
 
    onLoad()
    {
        if (GamePlayManager.instance === null) {
            GamePlayManager.instance = this;
        } else {
            this.destroy(); // Destroy any additional instances created
        }

        
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}

