import { ReadFile, SplitMultiLineString } from '../../helper/typescript/helper';

class Game {
    id : number;
    sets : CubeSet[];

    constructor(id: number) {
        this.id = id;

        // init
        this.sets = [];
    }

    // determine if game is possible based on total amount of cubes in bag
    IsPossible(totalCubesInBag : CubeSet) {
        let isPossible = true;

        for (const set of this.sets) {
            isPossible =
                totalCubesInBag.red >= set.red
            &&  totalCubesInBag.green >= set.green
            &&  totalCubesInBag.blue >= set.blue;

            if (!isPossible) return isPossible; // return as soon as a set is not possible
        }

        return isPossible;
    }
}

class CubeSet {
    red : number;
    green: number;
    blue: number;

    constructor() {
        // init
        this.red = 0;
        this.green = 0;
        this.blue = 0;
    }

    Fill(red : number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    // map the amount of cubes matching the color
    MapColor(color: RegExpMatchArray | null) {
        if (color === null) return;
    
        switch(color[2]) {
            case "red": {
                this.red = +color[1];
                break;
            }
            case "blue": {
                this.blue = +color[1];
                break;
            }
            case "green": {
                this.green = +color[1];
                break;
            }
        }
    }
}

Main();

function Main() {
    // read games record
    let file = ReadFile('./gamesRecord.txt');
    // parse games record into object
    let games = ParseGamesRecord(file);

    const totalCubesInBag = new CubeSet();

    // sample cubes
    totalCubesInBag.Fill(12,13,14);
    console.log(`Game with a total of  ${totalCubesInBag.red} red, ${totalCubesInBag.green} green and ${totalCubesInBag.blue} blue cubes.`);
    DeterminePossibleGames(games, totalCubesInBag);
}

// parse games from games record document into game objects
function ParseGamesRecord(file : string) {
    let games : Game[] = [];
    let gamesRecord : string[] = SplitMultiLineString(file);

    const generalRecordRegex = /Game\s(\d+):\s(.*)/g;    

    gamesRecord.forEach(record => {
        if (!record) return;
        
        const generalRecord = Array.from(record.matchAll(generalRecordRegex))[0];
         const id : number = generalRecord ? +generalRecord[1] : 0;
         const sets = generalRecord ? generalRecord[2] : '';

        if (generalRecord != null && generalRecord.length > 0) {
            const id : number = +generalRecord[1];
            const sets : string = generalRecord[2];

            let game = new Game(id);
            game.sets = ParseCubeSets(sets);

            games.push(game);
        }
    });

    return games;
}

// parse cube sets into CubeSet object
function ParseCubeSets(sets : string) {    
    let cubeSets : CubeSet[] = [];
    const setsRegex = /[^;\s][^;]*(?=(?:;|$))/g; // filter set from setlist
    const setsStrings = sets.match(setsRegex);

    const colorAmountRegex = /(\d+)\s([a-z]+)/g; // filter color amount and name into groups

    setsStrings?.forEach( set => {
        const colorArrays = Array.from(set.matchAll(colorAmountRegex));

        let cubeSet : CubeSet = new CubeSet();
        for (const colorArray of colorArrays) {
            cubeSet.MapColor(colorArray);            
        }
        cubeSets.push(cubeSet);
    });
    return cubeSets;
}

function DeterminePossibleGames(games : Game[], totalCubesInBag : CubeSet) {
    let idSum = 0;
    for (let game of games) {
        if (game.IsPossible(totalCubesInBag)) {
            idSum += game.id;
            console.log(`Game ${game.id} is possible.`);
        }        
    }
    console.log(`Sum from id of all possible games is: ${idSum}`);
}