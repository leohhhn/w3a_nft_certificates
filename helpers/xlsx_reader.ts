import * as xlsx from 'xlsx';

import {Attendance, Candidate, Track} from './helpers';

function generateArtpieceString(a: Attendance, t: Track) {
    let s: string;
    if (t !== Track.MKT) {
        s = t.toLowerCase().split(' ').join('_');
    } else {
        s = t.toLowerCase().split(' ').join('');
    }
    s = s.concat('_').concat(a.toLowerCase()).concat('.png')
    return s;
}

function getCandidateList() {
// Load the Excel file
    const workbook = xlsx.readFile('./eth_addr.xlsx');

// Get the worksheet containing the strings
    const worksheet = workbook.Sheets['ETH_Addresses'];

// Define the range of cells containing the strings
    const stringRange = 'E2:E1000';

// Get the cell values in the string range
    const stringCells = xlsx.utils.sheet_to_json(worksheet);
    let candidateList: Candidate[] = [];

    for (let i = 0; i < stringCells.length; i++) {
        // @ts-ignore
        candidateList[i] = {
            // @ts-ignore
            address: stringCells[i].eth_addr,
            // @ts-ignore
            track: stringCells[i].Track,
            // @ts-ignore
            attendance: stringCells[i].Type === 'On-site' ? 'On_site' : 'Online',
            // @ts-ignore
            art: generateArtpieceString(stringCells[i].Type, stringCells[i].Track),
            // @ts-ignore
            role: stringCells[i].Role
        }
    }


    return candidateList;
}


export {getCandidateList, generateArtpieceString};
