import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const h = new GestureDescription("H");

//Thumb
h.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
h.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9); 

//Index
h.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
h.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
h.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
h.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);

//Ring
h.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
h.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);

//Pinky
h.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
h.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);