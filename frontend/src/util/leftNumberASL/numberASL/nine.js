import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const nine = new GestureDescription("9");

//Thumb
nine.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
nine.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0); 

//Index
nine.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
// nine.addDirection(Finger.Index, FingerDirection.VerticalDown, 1.0);

//Middle
nine.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
nine.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
nine.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
nine.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);


//Pinky
nine.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
nine.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);

export default nine