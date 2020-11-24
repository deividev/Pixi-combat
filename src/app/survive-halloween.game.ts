import {gsap} from "gsap";
import * as PIXI from "pixi.js";
import {InteractionEvent, Sprite, Texture, TilingSprite, Container} from "pixi.js";
import {BehaviorSubject} from "rxjs";
import {Button, Actor, Asset, TitleScreen} from './shared/pixi-framework';
import {PixiGame} from './shared/pixi.game';

export class SurviveHalloweenGame extends PixiGame {

  protected readonly assets: Asset[] = [
    {
      name: 'bg-snow',
      src: 'survive-halloween/bg-snow.png'
    },
    {
      name: 'bg-map-ship',
      src: 'survive-halloween/bg-map-ship.png'
    },
    {
      name: 'bg_house',
      src: 'survive-halloween/bg_house.png'
    },
    {
      name: 'combatIcon',
      src: 'survive-halloween/combatIcon.png'
    },
    {
      name: 'player',
      src: 'survive-halloween/duende.png'
    },
    {
      name: 'button',
      src: 'survive-halloween/btn-scene.png'
    },
    {
      name: 'pumpkin',
      src: 'survive-halloween/noel.png'
    },
    {
      name: 'ghost',
      src: 'survive-halloween/ghost.png'
    },
    {
      name: 'death',
      src: 'survive-halloween/death.png'
    },
    {
      name: 'scarecrow',
      src: 'survive-halloween/scarecrow.png'
    },
    {
      name: 'skull',
      src: 'survive-halloween/skull.png'
    },
    {
      name: 'eye',
      src: 'survive-halloween/eye.png'
    },
    {
      name: 'coin',
      src: 'survive-halloween/coin.png'
    },
    {
      name: 'xplosion',
      src: 'survive-halloween/xplosion.png'
    },
    {
      name: 'xplosion2',
      src: 'survive-halloween/xplosion2.png'
    }
  ];
  player: Player;
  combatIcon: ChangeScene;
  lifes$: BehaviorSubject<number>;
  private counter: number;
  private enemyCount: number;
  private nextItemTime: number;
  private readonly enemyList = [Pumpkin, Eye, Ghost, Skull, Death, ScareCrow];
  private gameBg: TilingSprite;



  constructor(protected element: Element) {
    super(element);
    this.loadAssets();
  }


  protected startGame() {
    this.titleScreen = new TitleScreen([
      this.loader.resources['bg-map-ship'].texture,
      // this.loader.resources['bg-layer-1'].texture,
    ]);
    super.startGame();
  }

  protected update(delta) {
    this.manageTime(delta);
    // this.moveBg(delta);
    super.update(delta);
  }

  // private moveBg(delta) {
  //   this.gameBg.tilePosition.x += delta * 0.5;
  // }

  protected resetGame() {
    this.counter = 0;
    this.enemyCount = 0;
    this.player = new Player(this, 'player');
    this.combatIcon = new ChangeScene(this, 'combatIcon');
    this.lifes$ = new BehaviorSubject<number>(3);
    this.nextItemTime = 60;
    super.resetGame();
  }

  changeScene (scene) {
    super.setGameScreen();
    this.resetGame();
    if (scene === 'map') {
      // this.gameBg = new TilingSprite(this.loader.resources['bg-layer-1'].texture, 1280, 1280);
      const bg = Sprite.from(this.loader.resources['bg-snow'].texture,);
      debugger
      this.mapScreen.addChild(bg);
      this.mapScreen.addChild(this.player);
      this.gameScreen.visible= false;
      this.mapScreen.visible=true;
      this.spawnEnemy();
      setTimeout(() => {
        //TO-DO
        //Agragar contender con message de Start Combar
        //Borrarlo 30s
      }, 1000);
    }
  }


  setGameScreen() {
    super.setGameScreen();
    this.resetGame();
    // this.gameBg = new TilingSprite(this.loader.resources['bg-layer-1'].texture, 1280, 1280);
    const bg = Sprite.from(this.loader.resources['bg-map-ship'].texture);
    // this.gameScreen.addChild(this.gameBg);
    this.spawnCombatIcon();
    this.gameScreen.addChild(bg);
  }

  private manageTime(delta) {
    this.counter += delta;
    if (this.counter > this.nextItemTime) {
      this.counter = 0;
      // this.spawnEnemy();
      this.nextItemTime = 30 + Math.random() * 80;
    }
  }

  spawnCombatIcon() {
    let combatButtons = [];
    let column = 0;
    let row = 0;
    for (let index = 0; index < 4; index++) {
      debugger
      const element = combatButtons[index];
      column = column + 20;
      row = row + 21.5;
      const combatIcon: ChangeScene = new ChangeScene(this, 'combatIcon', this.height - (this.height*row)/100, this.width - (this.width *50)/100);
      combatButtons.push(combatIcon);
      this.mapScreen.addChild(combatIcon);
    }
    // combatButtons.forEach(e => {
    //   const combatIcon: ChangeScene = new e(this);
    //   this.mapScreen.addChild(combatIcon);
    // })
  }

  private spawnEnemy() {
    this.enemyCount++;
    let enemyClass = [];
    if (this.enemyCount > 150) {
      enemyClass[0] = this.enemyList[Math.floor(Math.random() * 6)];
      enemyClass[1] = this.enemyList[Math.floor(Math.random() * 4)];
    } else if (this.enemyCount > 100) {
      enemyClass[0] = this.enemyList[Math.floor(Math.random() * 6)];
      enemyClass[1] = this.enemyList[Math.floor(Math.random() * 3)];
    } else if (this.enemyCount > 75) {
      enemyClass[0] = this.enemyList[Math.floor(Math.random() * 6)];
      enemyClass[1] = this.enemyList[Math.floor(Math.random() * 2)];
    } else if (this.enemyCount > 50) {
      enemyClass[0] = this.enemyList[Math.floor(Math.random() * 6)];
    } else if (this.enemyCount > 25) {
      enemyClass[0] = this.enemyList[Math.floor(Math.random() * 5)];
    } else if (this.enemyCount > 20) {
      enemyClass[0] = this.enemyList[Math.floor(Math.random() * 4)];
    } else if (this.enemyCount > 10) {
      enemyClass[0] = this.enemyList[Math.floor(Math.random() * 3)];
    } else if (this.enemyCount > 5) {
      enemyClass[0] = this.enemyList[Math.floor(Math.random() * 2)];
    } else {
      enemyClass[0] = this.enemyList[0];
    }
    enemyClass.forEach(e => {
      const enemy: Enemy = new e(this);
      this.gameScreen.addChild(enemy);
      this.mapScreen.addChild(enemy);
    })
  }

}


class ChangeScene extends Button {

  private inmune: boolean;

  constructor(app: SurviveHalloweenGame, spriteSrc: string, height = app.height, width = app.width) {
    super(app, spriteSrc);
    this.x = app.width / 2;
    this.width = 120;
    this.height = this.width * this.aspectRatio;
    this.anchor.set(1, 1);
    this.y = height;
    this.x = width;
    gsap.to(this, {
      pixi: {
        width: this.width + 5,
        height: this.height + 5,
      },
      duration: 0.5,
      repeat: -1,
      yoyo: true
    });
    // this.on('pointerdown', onButtonDown)
    // this.on('pointerup', onButtonUp)
    // this.on('pointerupoutside', onButtonUp)
    // this.on('pointerover', onButtonOver)
    // this.on('pointerout', onButtonOut);
    this.on('pointerdown', (e: InteractionEvent) => {
      const scene = 'map';
      debugger
      this.app.changeScene(scene);
    })

  }

}

class Scout {
  //Ojeador se encargar de evaluar quien atacara primero
  constructor (app: SurviveHalloweenGame){}

  selectTourn(player: Player, enemy: Enemy) {
    if(player.vAtack > enemy.vAtack) {
      player.tourn = true;
      enemy.tourn = false
    } else {
      enemy.tourn = true;
      player.tourn = false;
    }
  }
}

class Rules  {
  //Determinara cuales son las reglas del juego y comprobara que se cumplen
}
class Player extends Actor {

  private inmune: boolean;
  atack: number;
  vAtack: number;
  health: number;
  tourn: Boolean;

  constructor(app: SurviveHalloweenGame, spriteSrc: string) {
    super(app, spriteSrc);
    this.x = app.width - (app.width *90)/100;
    this.width = 180;
    this.height = this.width * this.aspectRatio;
    this.anchor.set(0.5, 1);
    this.y = app.height - app.height/2;
    gsap.to(this, {
      pixi: {
        height: this.height + 10
      },
      duration: 0.5,
      repeat: -1,
      yoyo: true
    });
  }

  hit() {
    if (this.inmune){
      return;
    }
    const app = this.app as SurviveHalloweenGame;
    app.lifes$.next(app.lifes$.getValue() - 1);
    // TODO create a gspap sequence
    this.inmune = true;
    setTimeout(() => {
      this.inmune = false;
      this.alpha = 1;
    }, 1250);
    // Tint effect
    const tween = gsap.to(this, {
      pixi: {
        tint: 'rgb(255,0,0)'
      },
      duration: 0.2,
      repeat: 1,
      yoyo: true
    });
    tween.eventCallback('onComplete', () => {
      this.alpha = 0.5;
    })
    if (app.lifes$.getValue() <= 0) {
      this.die();
    } else {
      this.app.sound$.next('player-hit');
      this.app.vibrate$.next();
    }
  }

  die() {
    this.app.finishGame();
  }
}

interface EnemyProperties {
  spriteSrc: string;
  size?: number;
  score?: number;
  life?: number;
  speedMin?: number;
  speedVariation?: number;
  rewardThreshold?: number;
  rotation?: boolean;
  position?: 'ROUND' | 'FLOOR';
}

class Enemy extends Actor {

  life;
  score;
  atack: number;
  vAtack: number;
  health: number;
  tourn: Boolean;

  constructor(app: SurviveHalloweenGame,
              properties: Partial<EnemyProperties>) {
    super(app, properties.spriteSrc);
    const {life = 1, size = 120, speedMin = 5, speedVariation = 1, rewardThreshold = 8, position = 'ROUND', rotation = false, score = 5} = properties;
    this.life = life;
    this.score = score;
    this.width = size;
    this.height = this.width * this.aspectRatio;
    switch (position) {
      case "ROUND": {
        this.anchor.set(0.5);
        const radius = this.app.width / 2 + 50;
        const angle = -20 - (Math.random() * 140);
        const angleInRad = angle * Math.PI / 180;
        this.x = this.app.width / 2;
        this.y = this.app.height / 2;
        this.x += radius * Math.cos(angleInRad);
        this.y += radius * Math.sin(angleInRad);
        break;
      }
      case "FLOOR": {
        this.anchor.set(0.5, 1);
        this.x = Math.random() > 0.5 ? this.app.width : 0;
        this.y = app.height - 120;
        break;
      }
    }
    this.interactive = true;
    if (this.x > app.width / 2) {
      this.scale.x *= -1;
    }
    // Go towards player
    gsap.to(this, {
      pixi: {positionX: app.player.position.x, positionY: app.player.position.y},
      duration: speedMin + (Math.random() * speedVariation),
      ease: 'none'
    });
    if (rotation) {
      // Rotation animation
      gsap.to(this, {
        pixi: {rotation: 360},
        duration: 2,
        repeat: -1,
        ease: 'none'
      });
    }
    this.on('pointerdown', (e: InteractionEvent) => {
      const scene = 'map';
      this.app.changeScene(scene);
      this.life--;
      this.hit();
      if (this.life <= 0) {
        this.app.gameScreen.addChild(new Xplosion(this.app, ['xplosion', 'xplosion2', 'xplosion'],
          e.target.position.x, e.target.position.y))
        this.die();
        this.app.addScore(this.score);
        this.app.vibrate$.next();
        this.app.sound$.next('monster');
        if (Math.random() * 10 > rewardThreshold) {
          this.app.gameScreen.addChild(new Coin(this.app as SurviveHalloweenGame, 'coin', e.target.position.x, e.target.position.y))
        }
      }
    })
  }

  private hit() {
    // Tint effect
    gsap.to(this, {
      pixi: {
        tint: 'rgb(255,0,0)'
      },
      duration: 0.1,
      repeat: 1,
      yoyo: true
    });
  }

  die() {
    super.die();
  }

  update(delta) {
    this.checkCollision();
    super.update(delta);
  }

  private checkCollision() {
    const player = (this.app as SurviveHalloweenGame).player;
    const a = player.position.x - this?.position.x;
    const b = player.position.y - this?.position.y;
    if (Math.sqrt(a * a + b * b) < player.height) {
      this.die();
      player.hit();
    }
  }

}

class Coin extends Actor {

  constructor(app: SurviveHalloweenGame, spriteSrc: string, x: number, y: number) {
    super(app, spriteSrc);
    this.interactive = true;
    this.setTransform(x, y);
    const size = 80;
    this.width = size;
    this.height = this.width * this.aspectRatio;
    this.anchor.set(0.5);
    this.on('pointerover', this.pick);
    this.on('pointerdown', this.pick);

    gsap.to(this, {
      pixi: {alpha: 0},
      delay: 2,
      duration: 0.5,
      onComplete: this.die
    })
  }

  private pick() {
    this.app.addScore(25);
    this.app.sound$.next('tile');
    this.die();
  }

  die() {
    super.die();
  }

  update(delta) {
    this.y = this.y - delta * 0.5;
    super.update(delta);
  }

}

class Pumpkin extends Enemy {

  constructor(app: SurviveHalloweenGame) {
    const properties: EnemyProperties = {
      spriteSrc: 'pumpkin',
      size: 160,
      rotation: true
    }
    super(app, properties);
  }
}

class Eye extends Enemy {
  constructor(app: SurviveHalloweenGame) {
    const properties: EnemyProperties = {
      spriteSrc: 'eye',
      size: 100,
      speedMin: 2,
      rotation: true
    }
    super(app, properties);
  }
}

class Skull extends Enemy {
  constructor(app: SurviveHalloweenGame) {
    const properties: EnemyProperties = {
      spriteSrc: 'skull',
      size: 140,
      score: 10,
      rotation: true,
      life: 3
    }
    super(app, properties);
  }
}

class Ghost extends Enemy {
  constructor(app: SurviveHalloweenGame) {
    const properties: EnemyProperties = {
      spriteSrc: 'ghost',
      size: 200,
      life: 2,
      score: 25,
    }
    super(app, properties);
    gsap.to(this, {
      pixi: {
        width: this.width * 0.95
      },
      duration: 0.5,
      repeat: -1,
      yoyo: true
    });
  }
}

class Death extends Enemy {
  constructor(app: SurviveHalloweenGame) {
    const properties: EnemyProperties = {
      spriteSrc: 'death',
      size: 200,
      life: 5,
      speedMin: 6,
      score: 50,
      position: 'FLOOR'
    }
    super(app, properties);
    gsap.to(this, {
      pixi: {
        rotation: -15
      },
      duration: 0.5,
      repeat: -1,
      yoyo: true
    });
  }
}

class ScareCrow extends Enemy {
  constructor(app: SurviveHalloweenGame) {
    const properties: EnemyProperties = {
      spriteSrc: 'scarecrow',
      size: 250,
      life: 8,
      speedMin: 10,
      score: 50,
      position: 'FLOOR'
    }
    super(app, properties);
    gsap.to(this, {
      pixi: {
        height: this.height - 20
      },
      duration: 0.5,
      repeat: -1,
      yoyo: true
    });
  }
}

class Xplosion extends PIXI.AnimatedSprite {

  constructor(app, textures: string[], x: number, y: number) {
    const texturesArray = textures.map(texture => new Texture(app.loader.resources[texture].texture));
    super(texturesArray);
    this.setTransform(x, y);
    const size = 120;
    const aspectRatio = this.height / this.width;
    this.width = size;
    this.height = this.width * aspectRatio;
    this.anchor.set(0.5);
    this.animationSpeed = 0.2;
    this.loop = false;
    this.play();
    this.onComplete = this.die;
  }

  die() {
    this.parent.removeChild(this);
  }

}
