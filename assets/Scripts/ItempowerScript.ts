import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItempowerScript')
export class ItempowerScript extends Component {
    @property(RichText) text;
    start() {

    }

    update(deltaTime: number) {
        
    }
}

