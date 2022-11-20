import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const v = new GestureDescription("V");

//Thumb
v.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
v.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0); 

//Index
v.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
v.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
v.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
v.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

//Ring
v.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

//Pinky
v.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);