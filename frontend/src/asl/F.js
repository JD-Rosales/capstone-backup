import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const f = new GestureDescription("F");

//Thumb
f.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0); 

//Index
f.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
f.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9);

//Middle
f.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
f.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

//Pinky
f.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);