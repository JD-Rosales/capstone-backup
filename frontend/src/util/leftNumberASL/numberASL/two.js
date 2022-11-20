import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const two = new GestureDescription("2");

//Thumb
two.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
two.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
two.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
two.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
two.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
two.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
two.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
// two.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

//Pinky
two.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
// two.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);

export default two;