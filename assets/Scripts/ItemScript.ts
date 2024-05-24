import { _decorator, Component, Node, CCInteger, tween, Vec3, Vec2, TypeScript } from 'cc';
import { ElementScript } from './ElementScript';
import { InputManager } from './InputManager';
const { ccclass, property } = _decorator;

@ccclass('ItemScript')
export class ItemScript extends Component {
    @property(CCInteger) type:number = 0;
    canDrop:boolean = false;
    listDropMove:Vec2[]=[];
    start() {

    }
    
    
    ResetListDrop()
    {
        // this.canDrop = false;
        this.listDropMove = [];
    }
    update(deltaTime: number) {
        
    }
}

