import { readFileSync } from 'fs';

IdentifyElfCarryingMostCalories(ElfBagCalories(ElfBagsbyList(ReadList())));

// read list from file
function ReadList() {
    const file = readFileSync('./CalorieList.txt', 'utf-8');
    return file;
}

// assign every item to an elf bag, every elf bag represents an elf
function ElfBagsbyList(calorieString : string) {
    let calorieItems = calorieString.split("\r\n"); // split string to items
    let i = 0; // bag index
    let elfBags : Array<string[]> = new Array(); // each index represents one elf bag
    let calories: string[] = new Array(); // all calories inside a single bag

    calorieItems.forEach(listItem => {        
        if (listItem.length === 0 || Number.isNaN(Number(listItem))) {
            i++;
            calories = new Array();
        }
        else {
            calories.push(listItem);
            elfBags[i] = calories;
        }        
    });

    elfBags = elfBags.filter(e => e); // remove empty elements

    return elfBags;
}

// count all calories inside a bag and return an array with the total amount of calories per bag
function ElfBagCalories(elfBags : Array<string[]>) {
    let caloriesPerBag: Array<Number> = new Array<Number>;

    for (let i = 0; i < elfBags.length; i++) {
        let totalCalories = 0;
        for (let j = 0; j < elfBags[i].length; j++) {
            totalCalories += Number(elfBags[i][j]);
        }
        caloriesPerBag[i] = totalCalories;
    }

    return caloriesPerBag;
}

// identify elf with the most calories
function IdentifyElfCarryingMostCalories(caloriesPerBag: Array<Number>) {
    console.log(caloriesPerBag);
    let mostCalories = Math.max(...caloriesPerBag.map(calories => +calories));
    console.log(`Elf number ${caloriesPerBag.indexOf(mostCalories)} has the most calories with an amount of ${mostCalories}.`);
    
}