import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItempowerScript')
export class ItempowerScript extends Component {
    @property(RichText) text;
    xpower:number = 1;
    start() {

    }

    update(deltaTime: number) {
        
    }
}

