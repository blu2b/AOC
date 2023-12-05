import { readFileSync } from 'fs';

// read list from file
export function ReadFile(fullFilePath: string) {
    const file = readFileSync(fullFilePath, 'utf-8');
    return file;
}

// return string array where every element contains a line of a multiline string 
export function SplitMultiLineString(multilineString : string) {
    return multilineString.split("\r\n");
}