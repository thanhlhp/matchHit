import { _decorator, Component, Node, SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    @property(SkeletalAnimation) 
    CharacterAnim :SkeletalAnimation;
    onLoad()
    {
        this.CharacterAnim = this.getComponent(SkeletalAnimation);
    }
    start() {
   
        this.CharacterAnim.play("Attack2");
    }

    update(deltaTime: number) {
        
    }
}

