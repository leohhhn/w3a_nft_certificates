import {generateArtpieceString} from '../helpers/xlsx_reader';
import {Attendance, Track} from '../helpers/helpers';

function main(){

    console.log(generateArtpieceString(Attendance.On_site, Track.SD));
}

main();