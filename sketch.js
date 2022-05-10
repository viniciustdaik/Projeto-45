var girl, 
girlidleleftanm, girlidlerightanm, 
girljumpleftanm, girljumprightanm, 
girlrasteraleftanm, girlrasterarightanm, 
girlpousoleftanm, girlpousorightanm, 
girlrunningleftanm, girlrunningrightanm, 
girlIsJumping = false, girlIsRastera = false, girlIsRunning = false, girlanmrunning = false;

var borboleta, borboletaimgright;

var dialogo = 0;

var edges, invisibleGround, tree, rock, rockG;

var left = true, right = false;

var houseImg, foresthousebgImg, butterfliesbgImg, treeandrockbgImg;

var level = -5;


function preload(){
    //background
    houseImg = loadImage("house.png");
    foresthousebgImg = loadImage("forestbghouse.png");
    butterfliesbgImg = loadImage("butterfliesbg.png");
    treeandrockbgImg = loadImage("treeandrockbg.png");

    //girl anms
    girlidleleftanm = loadAnimation("./menina/idle/menina-idle-left.png", 
    "./menina/blink/menina-blink-left.png", "./menina/idle/menina-idle-left.png");
    girlidlerightanm = loadAnimation("./menina/idle/menina-idle-right.png", 
    "./menina/blink/menina-blink-right.png", "./menina/idle/menina-idle-right.png");
    girljumpleftanm = loadAnimation("./menina/jump/menina-jump1-left.png", 
    "./menina/jump/menina-jump2-left.png");//, "./menina/jump/menina-jump3-left.png");
    girljumprightanm = loadAnimation("./menina/jump/menina-jump1-right.png", 
    "./menina/jump/menina-jump2-right.png");//, "./menina/jump/menina-jump3-right.png");
    girlrasteraleftanm = loadAnimation("./menina/rastera/menina-rastera-left.png");
    girlrasterarightanm = loadAnimation("./menina/rastera/menina-rastera-right.png");
    girlpousoleftanm = loadAnimation("./menina/jump/menina-jump3-left.png");
    girlpousorightanm = loadAnimation("./menina/jump/menina-jump3-right.png");
    girlrunningleftanm = loadAnimation("./menina/running/menina-running1-left.png", 
    "./menina/running/menina-running6-left.png");
    girlrunningrightanm = loadAnimation("./menina/running/menina-running1-right.png", 
    "./menina/running/menina-running6-right.png");

    //borboleta
    borboletaimgright = loadImage("./borboletas/azul/borboleta-azul-right.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    girlidleleftanm.frameDelay = 20;
    girlidlerightanm.frameDelay = 20;
    girljumpleftanm.frameDelay = 15;
    girljumprightanm.frameDelay = 15;
    girlrunningleftanm.frameDelay = 8;
    girlrunningrightanm.frameDelay = 8;
    
    borboleta = createSprite(width / 2, height / 2 + 50, 25, 25);
    borboleta.addImage("left", borboletaimgright);
    borboleta.visible = false;
    //borboleta.debug = true;
    borboleta.setCollider("rectangle", 0, 0, 105, 550)

    girl = createSprite(width / 2 + 75, height / 2 + 300, 25, 25);
    girl.addAnimation("idleleft", girlidleleftanm);
    girl.addAnimation("idleright", girlidlerightanm);
    girl.addAnimation("jumpleft", girljumpleftanm);
    girl.addAnimation("jumpright", girljumprightanm);
    girl.addAnimation("rasteraleft", girlrasteraleftanm);
    girl.addAnimation("rasteraright", girlrasterarightanm);
    girl.addAnimation("pousoleft", girlpousoleftanm);
    girl.addAnimation("pousoright", girlpousorightanm);
    girl.addAnimation("runningleft", girlrunningleftanm);
    girl.addAnimation("runningright", girlrunningrightanm);
    girl.changeAnimation("idleleft", girlidleleftanm);

    //girl.debug = true;

    girl.setCollider("rectangle", -5, -5, 115, 140);

    invisibleGround = createSprite(width / 2, height - 35, width, 25);
    invisibleGround.visible = false;
    
    tree = createSprite(64, height / 2, 280, height);//**, **, **, 800
    tree.visible = false;

    rockG = new Group();

    rock = createSprite(width - 180, height - 55, 390, 120);
    rock2 = createSprite(width - 600, height - 35, 450, 70);
    rock3 = createSprite(width - 500, height - 65, 300, 80);
    rock4 = createSprite(width - 700, height - 65, 150, 50);
    rock4.shapeColor = "orange";
    rock3.shapeColor = "red";
    rock2.shapeColor = "green";
    rock.shapeColor = "yellow";
    rock.visible = false;
    rock2.visible = false;
    rock3.visible = false;
    rock4.visible = false;
    rockG.add(rock);
    rockG.add(rock2);
    rockG.add(rock3);
    rockG.add(rock4);
    
    edges = createEdgeSprites();

}

function draw(){
    if(level == -5){
        background(foresthousebgImg);
        image(houseImg, 0 + 550, 0 + 400 - 230, width- 550, height -200);
    }
    if(level == -4){
        background(treeandrockbgImg);
        girl.collide(rockG);
        //girl.collide(borboleta);
        ///if(borboleta.visible == false){
        ///    borboleta.visible = true;
        ///}
        
    }
    //if(level !== -5 && !keyDown(UP_ARROW) && !keyDown("W") && !keyDown("space")){
    //    girl.velocityY = girl.velocityY+0.8;
    //}
    ///if(girl.isTouching(borboleta) && keyWentDown("E") && dialogo == 0){// && level == -4){
        
    ///    dialogo = 1;
        
    ///}
    /*///if(girl.isTouching(borboleta) && dialogo == 0){// && level == -4){
        textAlign("center");
        textSize(55);
        fill("white");
        stroke("black");
        text("Pressione E para conversar", width / 2, 45);
        
    }
    if(dialogo !== 0){
        textAlign("center");
        textSize(55);
        fill("#4169E1");//blue
        stroke("lightblue")
        if(dialogo == 1){
            //textSize(55);
            //fill("lightblue");
            text("Olá! Preciso da sua ajuda!", width / 2, 45);
            if(keyWentDown("1")){
                dialogo = 2;
            }
        }
        
        if(dialogo == 2){
            
            text("Minhas amigas desapareceram! Você pode me ajudar?", width / 2, 45);
            if(keyWentDown("2")){
                dialogo = 3;
            }
        }
        fill("pink");
        if(dialogo == 3){
            text("Sim, Vou te ajudar!", width / 2, 45);
            if(keyWentDown("esc")){
                dialogo = 0;
            }
        }
    }
    *////

    if(keyDown(UP_ARROW) && girl.velocityY == 0 && dialogo == 0 && girlIsRastera == false
    ||keyDown("w") && girl.velocityY == 0 && dialogo == 0 && girlIsRastera == false
    ||keyDown("space") && girl.velocityY == 0 && dialogo == 0 && girlIsRastera == false){
        girl.velocityY = -10;
        girlIsJumping = true;
        if(left == true){
            girl.changeAnimation("jumpleft", girljumpleftanm);
        }
        if(right == true){
            girl.changeAnimation("jumpright", girljumprightanm);
        }
        setColliders("jump");
    }
    if(girlIsJumping == true && girl.velocityY == 0){
        girlIsJumping = false;
        if(left == true){
            girl.changeAnimation("pousoleft", girlpousoleftanm);
            setColliders("pouso");
            setTimeout(() => {
                if(girlIsRastera == false){
                    girl.changeAnimation("idleleft", girlidleleftanm);
                    setColliders("idle");
                }
            }, 400);
        }
        if(right == true){
            girl.changeAnimation("pousoright", girlpousorightanm);
            setColliders("pouso");
            setTimeout(() => {
                if(girlIsRastera == false){
                    girl.changeAnimation("idleright", girlidlerightanm);
                    setColliders("idle");
                }
            }, 400);
        }
    }
    if(girlIsJumping == true && !girl.velocityY == 0){
        if(left == true){
            girl.changeAnimation("jumpleft", girljumpleftanm);
        }
        if(right == true){
            girl.changeAnimation("jumpright", girljumprightanm);
        }
        setColliders("jump");
    }
    if(girlIsRunning == false && girlanmrunning == true 
        && girlIsJumping == false && girlIsRastera == false){
        if(left == true){
            girl.changeAnimation("idleleft", girlidleleftanm);
        }
        if(right == true){
            girl.changeAnimation("idleright", girlidlerightanm);
        }
        setColliders("idle");
    }
    //if(keyDown(DOWN_ARROW)||keyDown("S")){
    //    girl.y = girl.y +3;
    //}
    if(keyDown(RIGHT_ARROW) && girlIsRastera == false
    ||keyDown("D") && girlIsRastera == false){
        girlanmrunning = true;
        girl.x = girl.x +4.5;
        left = false;
        right = true;
        if(girlIsJumping == false){
            girl.changeAnimation("runningright", girlrunningrightanm);
            setColliders("running");
            //girl.changeAnimation("idleright", girlidlerightanm);
        }
        if(keyWentDown("s") && girlIsJumping == false
        ||keyWentDown(DOWN_ARROW) && girlIsJumping == false){
            girlanmrunning = false;
            girlIsRastera = true;
            girl.velocityX = +9;
            girl.changeAnimation("rasteraright", girlrasterarightanm);
            setColliders("rastera");
            setTimeout(() => {
                girl.velocityX = 0;
                if(left == true){
                    girl.changeAnimation("idleleft", girlidleleftanm);
                }
                if(right == true){
                    girl.changeAnimation("idleright", girlidlerightanm);
                }
                setColliders("idle");
                girlIsRastera = false;
              }, 650);
        }
        
    }
    if(keyDown(LEFT_ARROW) && girlIsRastera == false
    ||keyDown("A") && girlIsRastera == false){
        girl.x = girl.x -4.5;
        left = true;
        right = false;
        if(girlIsJumping == false){
            girl.changeAnimation("runningleft", girlrunningleftanm);
            setColliders("running");
            //girl.changeAnimation("idleleft", girlidleleftanm);
        }
        if(keyWentDown("s") && girlIsJumping == false
        ||keyWentDown(DOWN_ARROW) && girlIsJumping == false){
            girlIsRastera = true;
            girl.velocityX = -9;
            girl.changeAnimation("rasteraleft", girlrasteraleftanm);
            setColliders("rastera");
            setTimeout(() => {
                girl.velocityX = 0;
                if(left == true){
                    girl.changeAnimation("idleleft", girlidleleftanm);
                }
                if(right == true){
                    girl.changeAnimation("idleright", girlidlerightanm);
                }
                setColliders("idle");
                girlIsRastera = false;
              }, 650);
        }
    }
    if(keyWentUp("A") && !keyDown("D") && girlIsRastera == false 
    || keyWentUp("D") && !keyDown("A") && girlIsRastera == false){
        girlIsRunning = false;
    }

    girl.collide(invisibleGround);
    girl.collide(edges);

    if(girl.velocityY !== 0){// && level == -5){
        girl.velocityY = girl.velocityY+0.8;
    }
    
    if(girl.isTouching(tree) && level == -5){
        girl.visible = false;
        setTimeout(() => {
            if(level == -5){
                level = -4;
                girl.visible = true;
                girl.x = width - 10;
                //clear();
            }
            
          }, 1500);
    }

    


    drawSprites();
}

function setColliders(anim){
    if(anim == "running" || anim == "idle" || anim == "rastera" 
    || anim == "jump" || anim == "falling"){
        if(left == true){
            girl.setCollider("rectangle", -5, -5, 115, 140);  
        }
        if(right == true){
            girl.setCollider("rectangle", +5, -5, 115, 140);  
        }
    }
    if(anim == "pouso"){
        if(left == true){
            girl.setCollider("rectangle", 0, -5, 115, 140);
        }
        if(right == true){
            girl.setCollider("rectangle", 0, -5, 115, 140);
        }
    }
    if(anim == "jump"){

    }
    if(anim == "idle"){

    }
    if(anim == "running"){
        
    }
    if(anim == "rastera"){

    }
    if(anim == "falling"){

    }
    
}

