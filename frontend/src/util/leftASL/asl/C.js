import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const c = new GestureDescription("C");

//Thumb
c.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
c.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0); 

//Index
c.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
c.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

//Middle
c.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
c.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0); 

//Ring
c.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0);
c.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);

//Pinky
c.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
c.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);
