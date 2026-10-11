import { readFile, writeFile } from 'fs/promises';

export async function readCSV(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  
  if (lines.length === 0) {
    return [];
  }
  
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const obj = {};
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j] || '';
    }
    
    data.push(obj);
  }
  
  return data;
}

export async function saveJSON(data, outputPath) {
  const jsonString = JSON.stringify(data, null, 2);
  await writeFile(outputPath, jsonString, 'utf-8');
}