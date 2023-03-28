import * as xlsx from 'xlsx';

import {Attendance, Candidate, Role, Track} from './helpers';
import {ethers} from 'hardhat';
import fs from 'fs';

function generateArtpieceString(a: string, t: Track, role: Role) {
    let s: string = '';

    if (role === Role.Candidate) {
        if (t !== Track.MKT) {
            s = t.toLowerCase().split(' ').join('_');
        } else {
            s = t.toLowerCase().split(' ').join('');
        }
        s = s.concat('_');

        if (a === 'On-site') {
            s = s.concat(Attendance.On_site.toLowerCase())
        } else if (a === 'Online') {
            s = s.concat(Attendance.Online.toLowerCase())
        }
    }

    if (role === Role.Lecturer) {
        // lecturer
        s = s.concat('lecturer');
    } else if (role === Role.Organizer) {
        // organizer
        s = s.concat('organizer');
    }

    s = s.concat('.png')
    return s;
}

function getCandidateList() {
    const workbook = xlsx.readFile('./eth_addr.xlsx');
    const worksheet = workbook.Sheets['W3A Adrese'];
    const rows = xlsx.utils.sheet_to_json(worksheet);

    let candidates: Candidate[] = [];

    let num = 0;
    for (let i = 0; i < rows.length; i++) {

        // @ts-ignore
        const address = rows[i].eth_addr;
        // @ts-ignore
        const track = rows[i].Track;
        // @ts-ignore
        const attendance = rows[i].Type === 'On-site' ? Attendance.On_site : Attendance.Online;
        // @ts-ignore
        const role: Role = (() => {
            // @ts-ignore
            switch (rows[i].Role) {
                case 'Lecturer':
                    return Role.Lecturer;
                case 'Organizer':
                    return Role.Organizer;
                case 'Candidate':
                    return Role.Candidate;
                default:
                    break;
            }
        })();

        // @ts-ignore
        let art = generateArtpieceString(rows[i].Type, rows[i].Track, role)

        if (!ethers.utils.isAddress(address)) {
            console.log('Found invalid address, writing it to generator log file.');
            fs.writeFileSync(`./logs/generator.txt`, address);
            num--;
            continue;
        }

        candidates.push({
            address: address,
            track: track,
            attendance: attendance,
            art: art,
            role: role
        })
        num++;
    }
    console.log(`Generating ${num + 1} metadata file${num + 1 === 1 ? '' : 's'}.`)
    return candidates;
}

export {
    getCandidateList,
    generateArtpieceString
};
