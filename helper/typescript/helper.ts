import { readFileSync } from 'fs';

// read list from file
export function ReadFile(fullFilePath: string) {
    const file = readFileSync(fullFilePath, 'utf-8');
    return file;
}