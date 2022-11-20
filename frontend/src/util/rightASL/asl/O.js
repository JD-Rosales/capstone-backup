import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const o = new GestureDescription("O");

//Thumb
o.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
o.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0); 

//Index
o.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
o.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
o.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
o.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.9); 

//Ring
o.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0);
o.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);

//Pinky
o.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
o.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);