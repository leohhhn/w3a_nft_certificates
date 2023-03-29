import * as fs from 'fs';
import {baseURI, Candidate, Role, Track} from '../helpers/helpers';
import {getCandidateList} from '../helpers/xlsx_reader';
import {candidateDescription, lecturerDescription, organizerDescription} from '../helpers/descriptions';

function generateMetadata(candidates: Candidate[]) {

    for (let i = 0; i < candidates.length; i++) {
        const metadata = {
            name: `Web3 Academy 2023 Certificate #${i}`,
            description: fetchDescription(candidates[i]),
            image: `${baseURI}art/${candidates[i].art as string}`,
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

        fs.writeFileSync(`./metadata/metadata_${i}.json`, JSON.stringify(metadata));
    }
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