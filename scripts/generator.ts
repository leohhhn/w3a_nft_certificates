import * as fs from 'fs';
import {artBaseURI, Candidate, Role, Track, writeBool} from '../helpers/helpers';
import {getCandidateList} from '../helpers/xlsx_reader';
import {candidateDescription, lecturerDescription, organizerDescription} from '../helpers/descriptions';

function generateMetadata(candidates: Candidate[]) {

    let num = -1;

    for (let i = 0; i < candidates.length; i++) {
        const metadata = {
            name: `Certificate #${i}`,
            description: fetchDescription(candidates[i]),
            image: `${artBaseURI}art/${candidates[i].art as string}`,
            attributes: [
                {
                    trait_type: 'Track',
                    value: candidates[i].track
                },
                {
                    trait_type: 'Attendance',
                    value: candidates[i].attendance,
                },
                {
                    trait_type: 'Role',
                    value: candidates[i].role
                }
            ]
        };

        if (candidates[i].role !== Role.Candidate) // remove track & attendance attributes
            metadata.attributes = metadata.attributes.splice(2, metadata.attributes.length);

        writeBool ? fs.writeFileSync(`./metadata/metadata_${i}.json`, JSON.stringify(metadata)) : null;
        num++;
    }

    console.log(`Generating ${num + 1} metadata file${num + 1 === 1 ? '' : 's'}.`)
}

function fetchDescription(c: Candidate): string {
    switch (c.role) {
        case Role.Lecturer:
            return lecturerDescription;
        case Role.Organizer:
            return organizerDescription;
        case Role.Candidate:
            return candidateDescription;
        default:
            return '';
    }
}

function main() {
    let candidates: Candidate[] = getCandidateList();
    generateMetadata(candidates);
}

main();