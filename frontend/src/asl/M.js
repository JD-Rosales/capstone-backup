import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const m = new GestureDescription("M");

//Thumb
m.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.8);
m.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 0.8); 

//Index
m.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
m.addDirection(Finger.Index, FingerDirection.VerticalDown, 1.0);

//Middle
m.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
m.addDirection(Finger.Middle, FingerDirection.VerticalDown, 1.0);

//Ring
m.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
m.addDirection(Finger.Ring, FingerDirection.VerticalDown, 1.0);

//Pinky
m.addCurl(Finger.Pinky, FingerCurl.NoCurl, 0.8);
m.addDirection(Finger.Ring, FingerDirection.VerticalDown, 1.0);