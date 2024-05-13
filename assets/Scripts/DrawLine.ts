import { _decorator, Component, Node, Graphics, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DrawLine')
export class DrawLine extends Component {
    @property(Graphics)
    graphics: Graphics | null = null;
    start() {
   
            this.graphics.strokeColor.fromHEX('#ffffff');
            this.graphics.lineWidth = 10;       
    }

    drawLine(startPos: Vec3, endPos: Vec3) {
            this.graphics.strokeColor.fromHEX('#ffffff');
            this.graphics.lineWidth = 10;    
            console.log("ve line ne",startPos,endPos);
            // Move pen to start position
            this.graphics.moveTo(startPos.x, startPos.y);

            // Draw line to end position
            this.graphics.lineTo(endPos.x, endPos.y);

            // Stroke the line
            this.graphics.stroke();
        
    }
}

