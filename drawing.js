function draw_grid(ctx, minor, major, stroke, fill) {
    minor = minor || 10;
    major = major || minor * 5;
    stroke = stroke || "#00FF00";
    fill = fill || "#009900";
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    let width = ctx.canvas.width, height = ctx.canvas.height
    for(var x = 0; x < width; x += minor) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25;
            ctx.stroke();
            if(x % major == 0 ) {ctx.fillText(x, x, 10);}
        }
    for(var y = 0; y < height; y += minor) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.lineWidth = (y % major == 0) ? 0.5 : 0.25;
            ctx.stroke();
            if(y % major == 0 ) {ctx.fillText(y, 0, y + 10);}
        }
    ctx.restore();
};
function draw_pacman (x, y, pacmanradius, mouth) {
    x=x || 200;
    y=y || 200;
    pacmanradius = pacmanradius || 40;
    mouth=mouth || 1;
    mouthstate=[mouth*Math.PI*0.2, Math.PI*1.8];
    ctx.beginPath();
    ctx.strokeStyle='white';
    ctx.lineWidth = 2;
    ctx.arc(x, y, pacmanradius, mouthstate[0], mouthstate[1]);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fillStyle='yellow';
    ctx.fill();
    ctx.stroke();
};
function draw_ship(ctx, x, y, front, radius, options) {
     degree = (2*Math.PI)/360;
     curve1 = options.curve1 || 0.5;
     curve2 = options.curve2 || 0.75;
    options = options || {};
    ctx.save();
    ctx.translate (x, y);
    ctx.rotate(front*degree);
    // guide showing the collision radius
    if(options.guide) {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    // default color values
        ctx.lineWidth = options.lineWidth || 2;
        ctx.strokeStyle = options.stroke || "white";
        ctx.fillStyle = options.fill || "black";
    // draw the ship in three lines
         angle = (options.angle || 0.5 * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(radius, 0);
    ctx.quadraticCurveTo(
        Math.cos(angle) * radius * curve2,
        Math.sin(angle) * radius * curve2,
        Math.cos(Math.PI - angle) * radius,
        Math.sin(Math.PI - angle) * radius
        );
//a control point based on the curve variable
    ctx.quadraticCurveTo(
        -radius * curve1, 0,
        Math.cos(Math.PI + angle) * radius,
        Math.sin(Math.PI + angle) * radius
        );
    ctx.quadraticCurveTo(
        Math.cos(-angle) * radius * curve2,
        Math.sin(-angle) * radius * curve2,
        radius, 0
        );
    //ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if(options.guide) {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(
        Math.cos(-angle) * radius,
        Math.sin(-angle) * radius
        );
        ctx.lineTo(0, 0);
        ctx.lineTo(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
        );
        ctx.moveTo(-radius, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        Math.cos(angle) * radius * curve2,
        Math.sin(angle) * radius * curve2,
        radius/40, 0, 2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
        Math.cos(-angle) * radius * curve2,
        Math.sin(-angle) * radius * curve2,
        radius/40, 0, 2 * Math.PI
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(radius * curve1 - radius, 0, radius/50, 0, 2 *
        Math.PI);
        ctx.fill();
    }
    ctx.restore();
};
function ball_scatter (ctx, bx, by, br, pc) {
    bx = bx || 0;
    by = by || 0;
    br = br || 50;
    direction = [30, 50, 70, 90, 110, 130, 150];
    degree = Math.PI/180;
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(pc*degree);
    begin = 0;
    end = Math.PI;
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#00FF00";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, br, begin, end);  
for (k=0; k<=direction.length; k++)
{
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(direction[k]*degree)*br, Math.sin(direction[k]*degree)*br);
};
    ctx.stroke();
    ctx.restore();
};
function draw_asteroid(ctx, radius, options, noise, x, y, segments) {
    segments = segments || 20+Math.random()*5;
    options = options || {};
    ctx.strokeStyle = options.stroke || "red";
    ctx.fillStyle = options.fill || "blue";
    yellow = 'yellow';
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(options.rotation)
    ctx.beginPath();
        for(let i = 0; i < shape.length; i++) {
            ctx.rotate(2 * Math.PI / shape.length);
            ctx.lineTo(radius+(radius*noise*shape[i])/2, 0);
        }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
        if(options.guide) {
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, radius+radius*noise/2, 0, 2*Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, radius-radius*noise/2, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();
        }
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.font = '48px serif'
        ctx.fillText('hire me!', 0, 0);
        ctx.stroke();
    ctx.restore();
    //>>>>the below code allows function self randomise
/*
    shape = [];
        for (var i = 0; i < segments; i++) {
        shape.push(2 * (Math.random() - 0.5));
        }
*/
//>>the below code allows function to save shape during animation,
//>>it needs to be used in main file before main draw loop<<
/*
var segments = 20+Math.random()*5;
    var shape = [];
        for(var i = 0; i < segments; i++) {
        shape.push(2 * (Math.random() - 0.5));
    };
*/
    }

function drawPlayerLeaflet(){
    ctx.save();
    ctx.translate(0,0);
    ctx.fillStyle='rgb(214, 211, 159)';
    ctx.fillRect(0,0,200,400);



    ctx.restore();
}







// let grd = ctx.createRadialGradient(75,50,5,90,60,100);
// grd.addColorStop(0,"red");
// grd.addColorStop(1,"white");    
// // Fill with gradient
// ctx.fillStyle = grd;





















let mouX = 500;
let mouY = 300;
let Gamer={
    guild:{color:'green'},
};
function drawCross(x,y,s,color){
    //crossess------------------
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+s);
    ctx.lineTo(x+s,y+s);
    ctx.lineTo(x+s,y);
    ctx.lineTo(x+2*s,y);
    ctx.lineTo(x+2*s,y-s);
    ctx.lineTo(x+s,y-s);
    ctx.lineTo(x+s,y-2*s);
    ctx.lineTo(x,y-2*s);
    ctx.lineTo(x,y-s);
    ctx.lineTo(x-s,y-s);
    ctx.lineTo(x-s,y);
    ctx.closePath();
    ctx.lineWidth=1;
    ctx.stroke();
}
function heals(){
        //healingSign------------------------
        drawCross(34,49,4,'red');
        drawCross(40,31,3,'red');
        drawCross(30,35,2,'blue');
        drawCross(48,40,2.5,'blue');
}
function drawSword(){
        //sword---------------------------
        ctx.beginPath();
        ctx.strokeStyle='rgb(185, 190, 178)';
        ctx.arc(49,31,2,0,Math.PI*2);//sword hilt
        ctx.moveTo(30,50);//sword-middle
        ctx.lineTo(50,30);
        ctx.moveTo(38,32);
        ctx.lineTo(47,42);//sword cross
        ctx.moveTo(43,36);//blaed start on cross
        ctx.lineTo(28,48);
        ctx.lineTo(25,54);//blade tip
        ctx.lineTo(32,52);
        ctx.lineTo(44,38);//blade end on cross
        ctx.closePath();
        ctx.fillStyle='grey'
        ctx.lineWidth=1;
        ctx.fill();
        ctx.stroke();
}

    function mouse(){
        ctx.strokeStyle='white';
        ctx.fillStyle=Gamer.guild.color;
        ctx.save();
        //pointy--element---------
        ctx.beginPath();
        ctx.translate(mouX,mouY);
        ctx.moveTo(22,42);
        ctx.lineTo(0,0);
        ctx.lineTo(20,10);
        ctx.bezierCurveTo(30,20,20,30,23,45);
        ctx.moveTo(58,40);
        ctx.lineWidth=1;
        ctx.stroke();
        ctx.fill();
        ctx.stroke();
        //place for function
        drawSword()
        heals()
        //place for function
        ctx.beginPath();
        ctx.arc(32,22,5,0,Math.PI*2);
        ctx.fill();
        ctx.lineWidth=1;
        ctx.restore();
        ctx.stroke();
    }
    const m1 = {
        name:'taper',
        playBook:[ [[],[1,0,0,0,0,0]] , [[],[1,1,0,1,0,0]] , [[0,1,0,0,1,1],[2,1,0,1,0,0]] , [[],[0,1,0,0,0,0]] , [[0,0,0,0,1,0],[3,1,0,1,0,0]] ],
        guild:{color:'black'},
        
        theGuild:{color:'green'},
        sprint:4,run:10,tac:9,kick:6,kickDist:9,def:7,arm:4,infGen:6,infMax:1,
        isBleeding:true,isBurning:true,isDiseased:true,isKnockedDown:true,isPoisoned:true,isSnared:true,
    }

    let leafletBackground = new Image();
    leafletBackground.src='./bg.jpg';

    function modelInfo (m1){
        ctx.save();
        ctx.lineWidth=1;
        ctx.translate(0,0);
        ctx.beginPath();
        ctx.drawImage(leafletBackground, 0, 0, 250, 300);
        ctx.font = "800 25px Arial ";
        ctx.textAlign = "center";
        ctx.fillText(m1.name, 125,35);
        ctx.font = "800 12px Arial ";
        for(let i = 0; i<6;i++){
            ctx.save();
            let attributes = ['MOV','TAC','KICK','DEF','ARM','INF'];
            let attributesValues = [[m1.sprint,m1.run],m1.tac,[m1.kick,m1.kickDist],m1.def,m1.arm,[m1.infGen,m1.infMax]];
            ctx.beginPath();
            ctx.globalAlpha=0.2;
            ctx.fillStyle= m1.theGuild.color;
            ctx.fillRect(40*i+6,64,38,30);ctx.stroke();ctx.fill();ctx.restore();
            ctx.fillStyle='black';
            ctx.fillText(attributes[i],40*i+26,76);
            ctx.fillText(attributesValues[i],40*i+26,90);
            ctx.stroke();ctx.fill();
        }
        ctx.beginPath();
        // ctx.fillText('MOV',20,75);
        // ctx.fillText('TAC',53,75);
        // ctx.fillText('KICK',90,75);
        // ctx.fillText('DEF',126,75);
        // ctx.fillText('ARM',163,75);
        // ctx.fillText('INF',197,75);
        ctx.strokeStyle = m1.guild.color;
        ctx.moveTo(10,80);ctx.lineTo(240,80);
        ctx.globalAplha = 1;
        for(let i = 0;i<m1.playBook.length;i++){
             let x = 27*(i+1);let l = x-5; let r = x+5;
             let y = 116;
             let v = 124;
             let z = 127;
                if (m1.playBook[i][0].length === 0) {//do nothing
                } else {
                    let dmg = m1.playBook[i][0][0];
                    let mom = m1.playBook[i][0][1];
                    let ddge = m1.playBook[i][0][2];
                    let psh = m1.playBook[i][0][3];
                    let tackle = m1.playBook[i][0][4];
                    let KD = m1.playBook[i][0][5];
                    ctx.beginPath();
                    if(mom===1){ctx.fillStyle= m1.theGuild.color;ctx.strokeStyle = 'white'}else{ctx.fillStyle='white';ctx.strokeStyle='black'};
                    ctx.arc(x,y,13,0,Math.PI*2);
                    ctx.fill();
                    ctx.stroke();
                    ctx.lineWidth = 1;
                    ctx.font = "800 12px Arial ";
                    ctx.textAlign = "center";
                    if(mom===1){ctx.fillStyle= 'white';ctx.strokeStyle = 'white'}else{ctx.fillStyle='black';ctx.strokeStyle='black'};
                    if(dmg !== 0 ){
                        ctx.fillText(dmg, x, ddge>0||psh>0||KD>0||tackle>0?y:v);
                           ctx.closePath();
                    }
                    if( ddge > 2){
                        ctx.fillText('<<<', psh>0?l:x, dmg>0||KD>0||tackle>0?v:v);
                            ctx.closePath();
                    }else if(ddge===2){
                        ctx.fillText('<<', psh>0?l:x, dmg>0||KD>0||tackle>0?v:v);
                           ctx.closePath();}else if(ddge===1){
                            ctx.fillText('<', psh>0?l:x, dmg>0||KD>0||tackle>0?v:v);
                                  ctx.closePath();
                        };
                    if( psh > 2 ){
                        ctx.fillText('>>>', ddge>0?r:x, dmg>0||KD>0||tackle>0?v:v);
    
                        ctx.closePath();
                    }else if(psh===2){
                        ctx.fillText('>>', ddge>0?r:x, dmg>0||KD>0||tackle>0?v:v);
                            ctx.closePath();}else if(psh===1){
                            ctx.fillText('>', ddge>0?r:x, dmg>0||KD>0||tackle>0?v:v);
                                   ctx.closePath();};
                    if( tackle===1){
                        ctx.fillText('T', x, dmg>0||ddge>0||psh>0?y:KD>0?y:v);
                        ctx.closePath();};
                    if (KD===1){
                        ctx.fillText('KD', x, dmg>0||ddge>0?y:tackle>0?z:v);
                            ctx.closePath();};
                    ctx.stroke();
                }
                //--------bottom--of--playbook-------------------------------------
              y += 28;
              v += 28;
              z += 28;
              let dmg = m1.playBook[i][1][0];
              let mom = m1.playBook[i][1][1];
              let ddge = m1.playBook[i][1][2];
              let psh = m1.playBook[i][1][3];
              let tackle = m1.playBook[i][1][4];
              let KD = m1.playBook[i][1][5];
              ctx.beginPath();
              if(mom===1){ctx.fillStyle= m1.theGuild.color;ctx.strokeStyle = 'white'}else{ctx.fillStyle='white';ctx.strokeStyle='black'};
              ctx.arc(x,y,12,0,Math.PI*2);
              ctx.fill();
              ctx.stroke();
              ctx.lineWidth = 1;
              ctx.font = "900 12px Arial ";
              ctx.textAlign = "center";
              if(mom===1){ctx.fillStyle= 'white';ctx.strokeStyle = 'white'}else{ctx.fillStyle='black';ctx.strokeStyle='black'};
              if(dmg !== 0 ){
                  ctx.fillText(dmg, x, ddge>0||psh>0||KD>0||tackle>0?y:v);
                     ctx.closePath();
              }
              if( ddge > 2){
                  ctx.fillText('<<<', psh>0?l:x, dmg>0||KD>0||tackle>0?z:v);
                      ctx.closePath();
              }else if(ddge===2){
                  ctx.fillText('<<', psh>0?l:x, dmg>0||KD>0||tackle>0?z:v);
                     ctx.closePath();}else if(ddge===1){
                      ctx.fillText('<', psh>0?l:x, dmg>0||KD>0||tackle>0?z:z);
                            ctx.closePath();
                  };
              if( psh > 2 ){
                  ctx.fillText('>>>', ddge>0?r:x, dmg>0||KD>0||tackle>0?v:v);

                  ctx.closePath();
              }else if(psh===2){
                  ctx.fillText('>>', ddge>0?r:x, dmg>0||KD>0||tackle>0?v:v);
                      ctx.closePath();}else if(psh===1){
                      ctx.fillText('>', ddge>0?r:x, dmg>0||KD>0||tackle>0?v:v);
                             ctx.closePath();};
              if( tackle===1){
                  ctx.fillText('T', x, dmg>0||ddge>0||KD>0||psh>0?y:v);
                  ctx.closePath();};
              if (KD===1){
                  ctx.fillText('KD', x, dmg>0||ddge>0||KD>0||tackle>0?y:v);
                      ctx.closePath();};
              ctx.stroke();
        }


        let conditionesForDisplay = [m1.isBleeding,m1.isBurning,m1.isDiseased,m1.isKnockedDown,m1.isPoisoned,m1.isSnared];        
        for(let i = 0; i < conditionesForDisplay.length;i++){
        if(conditionesForDisplay[i]===true)
            ctx.save();
        ctx.beginPath();
        ctx.drawImage(img, x - bsc, y - bsc, 2 * bsc, 2 * bsc);
        ctx.arc(x, y, bsc, 0, Math.PI * 2, true);
        ctx.clip();
        ctx.restore();
        
    }


        ctx.stroke();
        ctx.restore();
    }
