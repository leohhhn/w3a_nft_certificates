import * as fs from 'fs';
import getCandidateList from './helpers/xlsx_reader';
import {Candidate} from './helpers/helpers';

const ipfsBaseUrl = 'ipfs://QmXsHdYZsX...eW8yT/';

function generateMetadata(candidates: Candidate[]) {
    for (let i = 0; i < candidates.length; i++) {
        const metadata = {
            name: `Web3 Academy 2023 Certificate #${i}`,
            description: `Proof that the owner of this NFT has successfully attended the Web3 Academy by XXX XXX XXX 2023 in Belgrade, Serbia.`,
            image: `${ipfsBaseUrl}art/artpiece_${i % 8}.png`,
            attributes: [
                {
                    trait_type: 'Track',
                    value: candidates[i].track
                },
                {
                    trait_type: 'Attendance',
                    value: candidates[i].attendance,
                },
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