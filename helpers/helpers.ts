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

const metadataFolderCID0 = 'QmPujPjJj57E4d6xVAogAHJdZvdqeJ96wrkKB4MbJvmCpu'; // metadata0 base folder cid
const metadataBaseURI0 = `ipfs://${metadataFolderCID0}/`; // to be put as baseURI in ERC721

const metadataFolderCID1 = 'QmaW3ZxNtmaNvbZfkpGo1Fqij3jfYSDXjVdR3EmqTnrk76'; // metadata1 base folder cid
const metadataBaseURI1 = `ipfs://${metadataFolderCID1}/`; // to be put as baseURI in ERC721

const collectionName = 'Web3 Academy 2023 Certificates';
const collectionSymbol = 'W3A23';
let w3aCertificatesPolygon = '0x4a8BF35ea19DdDea4881662Ce1fD59A2e443F5eC';
const writeBool = true;

export {
    Role,
    Track,
    writeBool,
    Candidate,
    artBaseURI,
    Attendance,
    artFolderCID,
    collectionName,
    metadataBaseURI0,
    metadataBaseURI1,
    collectionSymbol,
    metadataFolderCID0,
    w3aCertificatesPolygon
}