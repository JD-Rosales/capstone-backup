import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const ten = new GestureDescription("10");

//Thumb
ten.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
ten.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0); 

//Index
ten.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
// ten.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);

//Middle
ten.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
// ten.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);

//Ring
ten.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
// ten.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);

//Pinky
ten.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
// ten.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);

export default ten