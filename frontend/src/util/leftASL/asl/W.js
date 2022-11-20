import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const w = new GestureDescription("W");

//Thumb
w.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
w.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0); 

//Index
w.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
w.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

//Middle
w.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
w.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.4);

//Ring
w.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
w.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.4);

//Pinky
w.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
w.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);