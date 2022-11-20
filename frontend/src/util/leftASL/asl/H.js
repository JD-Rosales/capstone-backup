import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const h = new GestureDescription("H");

//Thumb
h.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
h.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0); 

//Index
h.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
h.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

//Middle
h.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
h.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

//Ring
h.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
h.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 0.9);

//Pinky
h.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
h.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.9);


