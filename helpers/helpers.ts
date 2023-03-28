interface Candidate {
    address: string,
    track: Track,
    attendance: Attendance
    art: string,
    // possible combinations of art names
    // software_development_on_site.png
    // software_development_online.png
    // marketing&growth_online.png
    // lecturer.png
    // organizer.png
    role: Role
}

enum Attendance {
    On_site = 'On_site',
    Online = 'Online'
}

enum Track {
    SD = 'Software Development',
    PM = 'Product Management',
    PD = 'Product Design',
    MKT = 'Marketing & Growth'
}

enum Role {
    Candidate = 'Candidate',
    Lecturer = 'Lecturer',
    Organizer = 'Organizer'
}

const exampleBaseCID = 'QmXWodfUX1Rw6NcESmuMbDwSNspoE9eBTpbj89Rtd5Rugc' // example base folder cid
const baseURI = `ipfs://${exampleBaseCID}/`;
const collectionName = 'W3A 2023 Certificates';
const collectionSymbol = 'W3A23C';
const w3aGoerli = '0xdfbB6F40d48f1510E86230C4Ac67d536277C72d8';
const w3aMumbai = '0xDD6F3160dA3aB0F110d25465417BACFF457099Ee';

export {
    Role,
    Track,
    baseURI,
    w3aGoerli,
    w3aMumbai,
    Candidate,
    Attendance,
    exampleBaseCID,
    collectionName,
    collectionSymbol,
}