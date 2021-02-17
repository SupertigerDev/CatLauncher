import { GameEngine } from './GameEngine.js';
import { Player } from './Player.js';
import { Terrain } from './Terrain.js'
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

let gameEngine;

window.gameEngine = gameEngine = new GameEngine(context, canvas);
