import { _decorator, Component, Node, Vec3, EventTouch, UITransform, Vec2, tween, Tween, Mask, CharacterController } from 'cc';
import { DrawLine } from './DrawLine';
import { ElementScript } from './ElementScript';
import { GamePlayManager } from './GamePlayManager';
import { GridGenerator } from './GridGenerator';
import { ItemScript } from './ItemScript';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {
    isTouch:boolean = false;
    isPlay:boolean = false;
    mousePos:Vec3;
    @property(Node)
    thisBoard:Node = null;
    @property(GridGenerator)
    thisGrid:GridGenerator;
    xPower: number = 0;
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
   
        
    }
    start(): void {
        this.node.on(Node.EventType.TOUCH_START,(event:EventTouch)=>
        {
            this.OnTouchStart(event);
        },this);
        this.node.on(Node.EventType.TOUCH_MOVE,(event:EventTouch)=>
        {
    
            this.OnTouchMove(event);
        },this);
        this.node.on(Node.EventType.TOUCH_END,(event:EventTouch)=>
        {
            this.OnTouchEnd(event);
        },this)
    }
    OnTouchStart(event: EventTouch)
    {
        
        if(this.isTouch == false && this.isPlay == false)
        {
            
            this.thisGrid.ResetListCellTraced();    
            this.mousePos = this.thisBoard.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
            for (let i = 0;i<=this.thisGrid.gridSize;i++)
            {   
                    this.thisGrid.cells[i].forEach(cell=>{    
                    if(cell!=null && cell.getComponent(ElementScript).item!=null &&cell.getComponent(ElementScript).haveItem && cell.getComponent(ElementScript).item.getComponent(UITransform).getBoundingBox().contains(new Vec2(this.mousePos.x,this.mousePos.y)))
                    {
                        this.isTouch = true;
                        cell.getComponent(ElementScript).isSelect = true;
                        cell.getComponent(ElementScript).CheckTouch();
                        
                    }
                    
                    })
            }
        }
       
       
    
    }
    OnTouchMove(event:EventTouch)
    {
       if(this.isPlay == false)
       { 
        this.mousePos = this.thisBoard.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(event.getUILocation().x,event.getUILocation().y,0));
        for (let i = 0;i<=this.thisGrid.gridSize;i++)
        {
                this.thisGrid.cells[i].forEach(cell=>{
                    if(cell!=null && cell.getComponent(ElementScript).item.getComponent(UITransform).getBoundingBox().contains(new Vec2(this.mousePos.x,this.mousePos.y)))
                    {
                        cell.getComponent(ElementScript).isSelect = true;
                        cell.getComponent(ElementScript).CheckTouch();
                        
                    }
                })
        }

       }
           
        
        
        // 

    }
    OnTouchEnd(event:EventTouch)
    {       
            if(this.isTouch && this.isPlay == false)
            {
                if(this.thisGrid.getComponent(GridGenerator).listCellTraced.length>=2 )
                {
                    console.log("an duoc combo"+this.thisGrid.getComponent(GridGenerator).listCellTraced.length+"type:"+this.thisGrid.getComponent(GridGenerator).listCellTraced[1].getComponent(ElementScript).color);
                    this.ClaimCell();
                    this.PlayFight();
                     setTimeout(()=>{
                        this.thisGrid.CheckCellNull();
                     },750)
                    for(let i = 0;i<this.thisGrid.listLineRender.length;i++)
                    {
                        this.thisGrid.listLineRender[i].destroy();
                    }
                    
                } else 
                {
                   
                    this.isTouch = false;
                    
                 
                }
                //
            } 
            this.thisGrid.ScaleItem(false);
            this.xPower = 0;
            this.thisGrid.ResetListCellTraced();
        
    }
    PlayFight()
    {       this.isPlay = true;
            GamePlayManager.getInstance().character.getComponent(PlayerController).PlayAnimation( this.thisGrid.getComponent(GridGenerator).listCellTraced.length);    
    }
    getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    ClaimCell()
    {
        this.thisGrid.getComponent(GridGenerator).listCellTraced.forEach(obj=>{
            if(this.thisGrid.getComponent(GridGenerator).listCellTraced.length<4)
            {
                if(obj!=null)
                {
                   obj.getComponent(ElementScript).Claim(obj,0);   
                  
                }   
            }
            if(this.thisGrid.getComponent(GridGenerator).listCellTraced.length>=4 &&
            this.thisGrid.getComponent(GridGenerator).listCellTraced.length<=5)
            {
                if(obj!=null)
                {
                if(obj.getComponent(ElementScript).stt ==this.thisGrid.getComponent(GridGenerator).listCellTraced.length)
                    obj.getComponent(ElementScript).Claim(obj,3);
                    else{
                        obj.getComponent(ElementScript).Claim(obj,0);
                    }
                  
                }   
            }
            if(this.thisGrid.getComponent(GridGenerator).listCellTraced.length>=6 &&
            this.thisGrid.getComponent(GridGenerator).listCellTraced.length<=8)
            {
                if(obj!=null)
                {
                if(obj.getComponent(ElementScript).stt ==this.thisGrid.getComponent(GridGenerator).listCellTraced.length)
                    obj.getComponent(ElementScript).Claim(obj,5);
                    else{
                        obj.getComponent(ElementScript).Claim(obj,0);
                    }
                  
                }   
            }
            if(this.thisGrid.getComponent(GridGenerator).listCellTraced.length>=9)
          
            {
                if(obj!=null)
                {
                if(obj.getComponent(ElementScript).stt ==this.thisGrid.getComponent(GridGenerator).listCellTraced.length)
                    obj.getComponent(ElementScript).Claim(obj,9);
                    else{
                        obj.getComponent(ElementScript).Claim(obj,0);
                    }
                  
                }   
            }
           
         })
         
       
            
         
        
    }
    
 

    update(deltaTime: number) {
     
    }
}

