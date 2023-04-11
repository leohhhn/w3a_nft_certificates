interface Candidate {
    address: string,
    track: Track,
    attendance: Attendance
    art: string,
    // i.e.
    // software_development_on_site.png
    // software_development_online.png
    // marketing&growth_online.png
    // other track&attendance combinations
    // lecturer.png
    // organizer.png
    role: Role
}

enum Attendance {
    On_site = 'On_site',
    Online = 'Online',
    None = ''
}

enum Track {
    SD = 'Software Development',
    PM = 'Product Management',
    PD = 'Product Design',
    MKT = 'Marketing & Growth',
    None = ''
}

enum Role {
    Candidate = 'Candidate',
    Lecturer = 'Lecturer',
    Organizer = 'Organizer'
}

const artFolderCID = 'QmT8UBHaBd7BJzEPJQjxSkgzmVV8DMu4c8nR5WyPg17H3f' // art base folder cid

const artBaseURI = `ipfs://${artFolderCID}/`; // to be put in metadata files

const metadataFolderCID = ''; // metadata base folder cid
const metadataBaseURI = `ipfs://${metadataFolderCID}/`; // to be put as baseURI in ERC721

const collectionName = 'Web3 Academy 2023 Certificates';
const collectionSymbol = 'W3A23C';
let w3aGoerli = '0xdfbB6F40d48f1510E86230C4Ac67d536277C72d8';
let w3aMumbai = '0xDD6F3160dA3aB0F110d25465417BACFF457099Ee';

const writeBool = true;

export {
    Role,
    Track,
    w3aGoerli,
    w3aMumbai,
    writeBool,
    Candidate,
    artBaseURI,
    Attendance,
    artFolderCID,
    collectionName,
    metadataBaseURI,
    collectionSymbol,
    metadataFolderCID,
}