import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const b = new GestureDescription("B");

//Thumb
b.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
b.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
b.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
b.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
b.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
b.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0); 

//Ring
b.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
b.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

//Pinky
b.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
b.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);