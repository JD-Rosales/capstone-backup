import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const x = new GestureDescription("X");

//Thumb
x.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
x.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0); 

//Index
x.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
x.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

//Middle
x.addCurl(Finger.Middle, FingerCurl.FullCurl  , 1.0);
x.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

//Ring
x.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
x.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 1.0);

//Pinky
x.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
x.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0);