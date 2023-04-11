import * as xlsx from 'xlsx';

import {Attendance, Candidate, Role, Track} from './helpers';
import {ethers} from 'hardhat';
import fs from 'fs';

function generateArtpieceString(a: string, t: Track, role: Role) {
    let s: string = '';

    if (role === Role.Lecturer) {
        s = s.concat('lecturer')
    } else if (role === Role.Organizer) {
        s = s.concat('organizer')
    } else if (role === Role.Candidate) {
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

    s = s.concat('.png')
    return s;
}



function getCandidateList() {

    let real = true;
    const workbook = xlsx.readFile(`${real ? './poat.xlsx' : './eth_addr.xlsx'}`);
    const worksheet = workbook.Sheets['testW3A'];
    const rows = xlsx.utils.sheet_to_json(worksheet);

    // clear logs file
    fs.writeFileSync(`./logs/generator.txt`, '');
    let skipped= 0;

    let candidates: Candidate[] = [];

    for (let i = 0; i < rows.length; i++) {

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
        const address = rows[i].eth_addr;
        // @ts-ignore
        if (role === Role.Candidate && rows[i].Passed === 'No') {
            console.log("Skipping candidate: ", address);
            skipped++;
            continue;
        }

        // @ts-ignore
        const track = role === Role.Candidate ? rows[i].Track : Track.None;

        // copy-paste lecturers & organizors: eth addr | track: '' | type: '' | Role

        let attendance: Attendance;
        // @ts-ignore
        attendance = rows[i].Type === 'On-site' ? Attendance.On_site : Attendance.Online;

        // @ts-ignore
        let art = generateArtpieceString(rows[i].Type, rows[i].Track, role)

        if (!ethers.utils.isAddress(address)) {
            console.log('Found invalid address, writing it to generator log file.');
            fs.appendFileSync(`./logs/generator.txt`, address);
            continue;
        }

        candidates.push({
            address: address,
            track: track,
            attendance: attendance,
            art: art,
            role: role
        });

    }
    console.log("Skipped: ", skipped);
    return candidates;
}

export {
    getCandidateList,
    generateArtpieceString
};
