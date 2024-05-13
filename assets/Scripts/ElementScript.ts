import { _decorator, Component, Node, CCInteger, Vec3, UITransform, Vec2, CCFloat, EventTouch } from 'cc';
import { GridGenerator } from './GridGenerator';
import { InputManager } from './InputManager';
import { ItemScript } from './ItemScript';
const { ccclass, property } = _decorator;

@ccclass('ElementScript')
export class ElementScript extends Component {
    @property(CCInteger) color:number = 0;
    item: Node = null;
    isSelect: boolean = false;
    isTracing: boolean = false;
    breakable:boolean = false;
    health: number = 0;
    x:number;
    y:number;
    stt:number;
    onLoad()
    {
      
    }
    start() {
        
    }

    CheckTouch()
    { 
        if(InputManager.getInstance().isTouch)
        {
            let grid = InputManager.getInstance().thisGrid;
            if( this.isSelect == true && this.stt ==0) 
            {
                
                this.OnTouch();
               // this.isSelect = true;   
            }
            if(this.isTracing && this.stt<grid.listCellTraced.length && this.stt !=0)
                {
                    
                    for(let i = this.stt;i<grid.listCellTraced.length;i++)
                    {
                        grid.listCellTraced[i].getComponent(ElementScript).isSelect = false;
                        grid.listCellTraced[i].getComponent(ElementScript).isTracing = false;
                        grid.listCellTraced[i].getComponent(ElementScript).stt = 0;
                        
                    }
                    for(let i = this.stt-1;i<grid.listLineRender.length;i++)
                    {
                        grid.listLineRender[i].destroy();
                    }
                   
                    grid.listLineRender.splice(this.stt-1,grid.listLineRender.length-this.stt);
                    grid.listCellTraced.splice(this.stt,grid.listCellTraced.length-this.stt+1);         
                }
        }
        
        // }
    }
    OnTouch()
    {
        console.log("on touch ne",this.item)
        if(InputManager.getInstance().thisGrid.CheckCanTracing(this.node))
            {
                this.isTracing = true;

            }  
    }
    update(deltaTime: number) 
    {
        // console.log(InputManager.getInstance().isTouch);
        // if(InputManager.getInstance().mousePos!=null)
        // {
           
        //     this.CheckTouch(InputManager.getInstance().mousePos);
        // }
        
    }
}

