import { _decorator, Component, Node, CCInteger, Vec3, UITransform, Vec2, CCFloat, EventTouch, tween, instantiate, Prefab, RichText } from 'cc';
import { GridGenerator } from './GridGenerator';
import { InputManager } from './InputManager';
import { ItempowerScript } from './ItempowerScript';
import { ItemScript } from './ItemScript';
const { ccclass, property } = _decorator;

@ccclass('ElementScript')
export class ElementScript extends Component {
    @property(CCInteger) color:number = 0;
    @property(Prefab) itemPowerX = null;
    item: Node = null;
    @property(Node)
    breakableLayer:Node;
    isSelect: boolean = false;
    isTracing: boolean = false;
    haveItem:boolean = false;
    idItem:number = 0;
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
    CheckHavItem()
    {
   
    }
    CheckTouch()
    { 
        if(InputManager.getInstance().isTouch)
        {
            let grid = InputManager.getInstance().thisGrid;
            if( this.isSelect == true && this.stt ==0) 
            {
                
                this.OnTouch();
                console.log(this.x,this.y);
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
    Claim(cell:Node,xPower:Number)
    {
        tween(cell.getComponent(ElementScript).item)
                .call(()=>{
            
                })
                .to(0.5,{scale: new Vec3(0,0,0)})
                .call(()=>{
                    console.log(xPower);
                    if(xPower==0)
                        cell.getComponent(ElementScript).item = null;
                    else{
                        let item = instantiate(this.itemPowerX);
                        item.getComponent(ItempowerScript).xpower = xPower;
                        item.setParent(InputManager.getInstance().thisBoard);
                        item.setPosition(this.node.position);
                        item.setSiblingIndex(InputManager.getInstance().thisGrid.getComponent(GridGenerator).indexItem)
                        InputManager.getInstance().thisGrid.getComponent(GridGenerator).indexItem++;
                        item.getComponent(ItempowerScript).text.string = "<color=#00ff00>x</color><color=#0fffff>"+xPower+"</color>";
                        cell.getComponent(ElementScript).item = item;
                    }
           
                })  
                .call(()=>{
                    
                })
                .start()
                InputManager.getInstance().thisGrid.ScaleItem(false);
                
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

