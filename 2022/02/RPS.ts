import { ReadFile } from '../../helper/typescript/helper';

function Main() {
    let strategyGuide: StrategyGuide = new StrategyGuide();
    let parsedSG = strategyGuide.ParseStrategyGuide();

    let battle: Battle = new Battle();
    
    for (let i = 0; i < parsedSG.length; i++) {
        battle.BattleRound(parsedSG[i][1], parsedSG[i][0]);
    }
    console.log(`total score player1: ${battle.player1.totalScore}`);
    console.log(`total score player2: ${battle.player2.totalScore}`);
}

// possible shapes with points
enum Shapes {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}

// possible battle states with points
enum BattleState {    
    Lose = 0,
    Draw = 3,
    Win = 6
}

class Player {
    shape: Shapes | undefined;
    shapeMap: ShapeMap;
    totalScore: number;
    
    constructor(rock: string, paper: string, scissors: string) {
        // init total score
        this.totalScore = 0;
        // init shade mapping
        this.shapeMap = new ShapeMap(rock, paper, scissors);
    }
}

class ShapeMap {
    rock: string;
    paper: string;
    scissors: string;
    shapeType: any = {};

    constructor(textRock: string, textPaper: string, textScissors: string) {
        this.rock = textRock;
        this.paper = textPaper;
        this.scissors = textScissors;

        this.shapeType[textRock] = Shapes.Rock;
        this.shapeType[textPaper] = Shapes.Paper;
        this.shapeType[textScissors] = Shapes.Scissors;
    }
}

class Participants {
    player1 : Player = new Player('X','Y','Z');
    player2 : Player = new Player('A','B','C');
}

class Battle extends Participants {
    // define battle system
    private Calculate() {
        let scoreP1: number = 0;
        let scoreP2: number = 0;

        // draw
        if (this.player1.shape === this.player2.shape) {
            scoreP1 += BattleState.Draw as number;
            scoreP2 += BattleState.Draw as number;
        }
        // p1 win
        else if (this.player1.shape === Shapes.Rock && this.player2.shape === Shapes.Scissors
            || this.player1.shape === Shapes.Paper && this.player2.shape === Shapes.Rock
            || this.player1.shape === Shapes.Scissors && this.player2.shape === Shapes.Paper) {
                scoreP1 += BattleState.Win;
        }
        // p2 win
        else {
            scoreP2 += BattleState.Win;
        }

        scoreP1 += this.player1.shape as number;
        scoreP2 += this.player2.shape as number;

        this.player1.totalScore += scoreP1;
        this.player2.totalScore += scoreP2;
    }

    BattleRound(shapeP1: Shapes, shapeP2: Shapes) {
        this.player1.shape = shapeP1;
        this.player2.shape = shapeP2;
        this.Calculate();
    }
}

class StrategyGuide extends Participants {
    // read file
    strategyGuide: string = ReadFile('./strategyGuide.txt');
    // parse file to battle rounds
    ParseStrategyGuide() {
        let rounds: any = this.strategyGuide.split("\r\n"); // split string to rounds

        for(let i = 0; i < rounds.length; i++) {
            let round = rounds[i].split(" "); // split rounds to playershapes per round
            let players = [this.player2, this.player1];
            if (round.length == 2) {
                for (let j = 0; j < round.length; j++) {
                    round[j] = players[j].shapeMap.shapeType[round[j]];
                }
            }
            else {
                // todo: invalid syntax. do some error handling.
            }
            rounds[i] = round;
        }
        return rounds;
    }

}

Main();