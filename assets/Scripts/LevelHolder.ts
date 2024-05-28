import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelHolder')
export class LevelHolder extends Component {
    @property(Prefab)
    demonPbs:Prefab[] = [];
    start() {

    }

    update(deltaTime: number) {
        
    }
}

