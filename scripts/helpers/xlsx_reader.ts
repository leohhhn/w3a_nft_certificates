import * as xlsx from 'xlsx';

import {Candidate} from './helpers';

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
        candidateList[i] = {
            // @ts-ignore
            address: stringCells[i].eth_addr,
            // @ts-ignore
            track: stringCells[i].Track,
            // @ts-ignore
            attendance: stringCells[i].Type === 'On-site' ? 'On_site' : 'Online',
        }
    }

    return candidateList;
}

export default getCandidateList;