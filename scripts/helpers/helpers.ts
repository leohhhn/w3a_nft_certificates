interface Candidate {
    address: string,
    track: Track,
    attendance: Attendance
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

export {
    Candidate,
    Attendance,
    Track
}