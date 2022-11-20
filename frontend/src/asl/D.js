import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const d = new GestureDescription("D");

//Thumb
d.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
d.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
d.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
d.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
d.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
d.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);

//Ring
d.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
d.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

//Pinky
d.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
d.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);