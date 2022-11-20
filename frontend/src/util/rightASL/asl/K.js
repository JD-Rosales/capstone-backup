import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

//Has Similarities to Gesture R
export const k = new GestureDescription("K");

//Thumb
k.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
k.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
k.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
k.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
k.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
k.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
k.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

//Pinky
k.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);