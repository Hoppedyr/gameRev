import fetch from 'node-fetch';
import xmlParser from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';
import { IXml } from './interfaces/IXml';

// if (process.argv.length <= 2) {
//   console.log('please pass a review after the file name');
//   console.log('hint - The bad word is "shit"');
// }

const file = fs.readFileSync(path.join(__dirname, '..', 'gameRev.bpmn'), 'utf-8');

const xml: IXml = xmlParser.parse(file, {
  ignoreAttributes: false,
});

// Check for flows inside the
const flows = xml['bpmn:definitions']['bpmn:process']['bpmn:sequenceFlow'];
for (const flow of flows) {
  console.log(flow);
}
