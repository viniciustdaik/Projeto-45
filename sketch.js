//Definindo Variáveis Globais

var girl, 
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

    
}

function setup(){
    //Criando o Canvas
    createCanvas(windowWidth, windowHeight);

    //Criando o Sprite da Girl(Garota)
    girl = createSprite(width / 2 + 75, height / 2 + 300, 25, 25);
    
    //Criando o Sprite do invisibleGround(Chão Invisível) e definindo a visibilidade para false
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
    if(keyDown(UP_ARROW) && girl.velocityY == 0
    ||keyDown("w") && girl.velocityY == 0
    ||keyDown("space") && girl.velocityY == 0){
        //Velocidade da garota em Y é -10
        girl.velocityY = -10;

        //Essa Variável é true
        girlIsJumping = true;
    }
    
    //Se segurar uma dessas teclas, E essa Variável for false
    if(keyDown(RIGHT_ARROW) && girlIsRastera == false
    ||keyDown("D") && girlIsRastera == false){
        //O x da garota é "x da garota + 4.5"
        girl.x = girl.x +4.5;

        //Essa Variável é false
        left = false;

        //Essa Variável é true
        right = true;
    }

    //Se segurar uma dessas teclas, E essa Variável for false
    if(keyDown(LEFT_ARROW) && girlIsRastera == false
    ||keyDown("A") && girlIsRastera == false){
        //O x da garota é "x da garota - 4.5"
        girl.x = girl.x -4.5;

        //Essa Variável é true
        left = true;

        //Essa Variável é false
        right = false;
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

                //o x da garota é "width - 10"
                girl.x = width - 10;
                //clear();
            }
            
          }, 1500);
    }

    

    //drawSprites, pra desenhar os Sprites
    drawSprites();
}

