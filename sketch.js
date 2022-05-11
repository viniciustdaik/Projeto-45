//Definindo Variáveis Globais

var girl, 
girlidleleftanm, girlidlerightanm, 
girljumpleftanm, girljumprightanm, 
girlrasteraleftanm, girlrasterarightanm, 
girlpousoleftanm, girlpousorightanm, 
girlrunningleftanm, girlrunningrightanm, 
girlIsJumping = false, girlIsRastera = false, girlIsRunning = false, girlanmrunning = false;

var edges, invisibleGround, tree, rock, rockG;

var left = true, right = false;

var houseImg, foresthousebgImg, butterfliesbgImg, treeandrockbgImg;

var level = -5;


function preload(){
    //Carregando background(fundo)
    houseImg = loadImage("house.png");
    foresthousebgImg = loadImage("forestbghouse.png");
    butterfliesbgImg = loadImage("butterfliesbg.png");
    treeandrockbgImg = loadImage("treeandrockbg.png");

    //Carregando animações da girl(garota)
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

}

function setup(){
    //Criando o Canvas
    createCanvas(windowWidth, windowHeight);

    //Adicionando frameDelay nas animações da girl(garota)
    girlidleleftanm.frameDelay = 20;
    girlidlerightanm.frameDelay = 20;
    girljumpleftanm.frameDelay = 15;
    girljumprightanm.frameDelay = 15;
    girlrunningleftanm.frameDelay = 8;
    girlrunningrightanm.frameDelay = 8;

    //Criando o Sprite da girl(garota) e adicionando animações
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

    //Definindo o Collider da girl(garota)
    girl.setCollider("rectangle", -5, -5, 115, 140);

    //Criando o Sprite do invisibleGround(chão Invisível) e definindo a visibilidade para false
    invisibleGround = createSprite(width / 2, height - 35, width, 25);
    invisibleGround.visible = false;

    //Criando o Sprite da tree(árvore) e definindo a visibilidade para false
    tree = createSprite(64, height / 2, 280, height);//**, **, **, 800
    tree.visible = false;
    
    //Criando o Group(Grupo) rockG(Grupo de Pedras)
    rockG = new Group();

    //Criando os Sprites de várias Pedras, definindo Cor e visibilidade para false, e adicionando no Group
    //(Gropo) rockG(Grupo de Pedras)
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
    
    //Criando o Sprite das Edges(Bordas)
    edges = createEdgeSprites();

}

function draw(){
    //Se level for -5
    if(level == -5){
        //Fundo do level -5
        background(foresthousebgImg);

        //Imagem da casa do level -5
        image(houseImg, 0 + 550, 0 + 400 - 230, width- 550, height -200);
    }
    if(level == -4){
        //Fundo do level -4
        background(treeandrockbgImg);

        //Girl(Garota) colide com o Grupo rockG
        girl.collide(rockG);
        
        
    }

    //Se segurar uma dessas teclas, E a velocidade Y da garota for 0
    if(keyDown(UP_ARROW) && girl.velocityY == 0 && girlIsRastera == false
    ||keyDown("w") && girl.velocityY == 0 && girlIsRastera == false
    ||keyDown("space") && girl.velocityY == 0 && girlIsRastera == false){
        //Velocidade da garota em Y é -10
        girl.velocityY = -10;

        //Essa Variável é true
        girlIsJumping = true;

        //Se left for true
        if(left == true){
            //Mudando a animação da girl
            girl.changeAnimation("jumpleft", girljumpleftanm);
        }

        //Se right for true
        if(right == true){
            //Mudando a animação da girl
            girl.changeAnimation("jumpright", girljumprightanm);
        }
        //Chamando a função setColliders e dando o parâmetro "jump"
        setColliders("jump");
    }

    //Código para fazer definidir o girlIsJumping para false, fazer a animação de pouso, 
    //e voltar para a animação de idle. O lado da animação muda dependendo no right e left.
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

    //Quando estiver pulando / no ar e mudar a animação para o outro lado dependendo no left e right
    if(girlIsJumping == true && !girl.velocityY == 0){
        if(left == true){
            girl.changeAnimation("jumpleft", girljumpleftanm);
        }
        if(right == true){
            girl.changeAnimation("jumpright", girljumprightanm);
        }
        setColliders("jump");
    }

    //Mudar animação para idle depois da Rastera ser concluída
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

    //Se segurar uma dessas teclas, E essa Variável for false
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
        //Rastera
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

    //Se segurar uma dessas teclas, E essa Variável for false
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
        //Rastera
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

    //if(keyWentUp("A") && !keyDown("D") && girlIsRastera == false 
    //|| keyWentUp("D") && !keyDown("A") && girlIsRastera == false){
    //    girlIsRunning = false;
    //}

    //A garota colide com invisibleGround, A garota colide com edges
    girl.collide(invisibleGround);
    girl.collide(edges);

    //Se a velocidade da garota em Y NÃO for 0
    if(girl.velocityY !== 0){// && level == -5){
        //A velocidade da garota em Y é "velocidade da garota em Y + 0.8"
        girl.velocityY = girl.velocityY+0.8;
    }

    //Se a garota estiver tocando na tree, E o level for -5
    if(girl.isTouching(tree) && level == -5){
        //A visibilidade da garota é false
        girl.visible = false;

        //Tempo
        setTimeout(() => {
            //Se o level for -5
            if(level == -5){
                //level é -4
                level = -4;

                //A visibilidade da garota é true
                girl.visible = true;

                //O x da garota é "width - 10"
                girl.x = width - 10;
                //clear();
            }
            
          }, 1500);
    }

    

    //drawSprites, pra desenhar os Sprites
    drawSprites();
}

//função setColliders com parâmetro anim
function setColliders(anim){
    //Se anim for uma dessas
    if(anim == "running" || anim == "idle" || anim == "rastera" 
    || anim == "jump" || anim == "falling"){
        //Se left for true
        if(left == true){
            //Definindo(Mudando) o Collider da girl
            girl.setCollider("rectangle", -5, -5, 115, 140);  
        }

        //Se right for true
        if(right == true){
            //Definindo(Mudando) o Collider da girl
            girl.setCollider("rectangle", +5, -5, 115, 140);  
        }
    }

    //Se anim for "pouso"
    if(anim == "pouso"){
        //Se left for true
        if(left == true){
            //Definindo(Mudando) o Collider da girl
            girl.setCollider("rectangle", 0, -5, 115, 140);
        }

        //Se right for true
        if(right == true){
            //Definindo(Mudando) o Collider da girl
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

