interface Candidate {
    address: string,
    track: Track,
    attendance: Attendance
    art: string,
    // possible combinations of art names
    // software_development_on_site.png
    // software_development_online.png
    // marketing&growth_online.png
    role: string
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
    Candidate='Candidate',
    Lecturer = 'Lecturer',
    Organizer = 'Organizer'
}

export {
    Track,
    Candidate,
    Attendance
}

export const baseCID = 'QmXWodfUX1Rw6NcESmuMbDwSNspoE9eBTpbj89Rtd5Rugc' // example base folder cid
export const baseURI = `ipfs://${baseCID}/`;
export const collectionName = 'W3A 2023 Certificates';
export const collectionSymbol = 'W3A23C';

export const w3acSCGoerli = '';