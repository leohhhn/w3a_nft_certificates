import * as fs from 'fs';
import {Candidate} from '../helpers/helpers';
import {getCandidateList} from '../helpers/xlsx_reader';

const ipfsBaseUrl = 'ipfs://QmXsHdYZsX...eW8yT/';

function generateMetadata(candidates: Candidate[]) {
    for (let i = 0; i < candidates.length; i++) {
        const metadata = {
            name: `Web3 Academy 2023 Certificate #${i}`,
            description: `Proof that the owner of this NFT has successfully attended the Web3 Academy by XXX XXX XXX 2023 in Belgrade, Serbia.`,
            image: `${ipfsBaseUrl}art/${candidates[i].art as string}`,
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
        fs.writeFileSync(`./metadata/metadata_${i}.json`, JSON.stringify(metadata));
    }
}

function main() {
    let candidates: Candidate[] = getCandidateList();
    generateMetadata(candidates);
}

main();