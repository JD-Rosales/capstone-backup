import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const seven = new GestureDescription("7");

//Thumb
seven.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
seven.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
seven.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
seven.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
seven.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
seven.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
seven.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
// seven.addDirection(Finger.Ring, FingerDirection.VerticalDown, 1.0);


//Pinky
seven.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
seven.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);

export default seven