import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const r = new GestureDescription("R");

//Thumb
r.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
r.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
r.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
r.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
r.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
r.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
r.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
r.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

//Pinky
r.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
r.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);