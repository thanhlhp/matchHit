import { _decorator, Component, Node, Vec3, EventTouch, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {
    isTouch:boolean = false;
    mousePos:Vec3;
    @property(Node)
    thisBoard:Node = null;
    private static instance: InputManager = null;
    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }
        return InputManager.instance;
    }
    onLoad()
    {
        if (InputManager.instance === null) {
            InputManager.instance = this;
        } else {
            this.destroy(); // Destroy any additional instances created
        }
        this.node.on(Node.EventType.TOUCH_START,(event:EventTouch)=>
        {
          this.isTouch = true;
          //this.mousePos = new Vec2(event.getUILocation().x-540,event.getUILocation().y-960);
          this.mousePos = this.thisBoard.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
        });
        this.node.on(Node.EventType.TOUCH_MOVE,(event:EventTouch)=>
        {
            if(this.isTouch)
            {
                this.mousePos = this.thisBoard.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
                //this.mousePos = new Vec2(event.getUILocation().x-540,event.getUILocation().y-960);
                // console.log(loc);             
            }
        });
        this.node.on(Node.EventType.TOUCH_CANCEL,(event:EventTouch)=>
        {
            this.isTouch = false;
        })
    }
    start(): void {

    }

    update(deltaTime: number) {
      
    }
}

