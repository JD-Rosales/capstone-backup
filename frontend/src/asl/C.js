import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const c = new GestureDescription("C");

//Thumb
c.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
c.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0); 

//Index
c.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
c.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
c.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
c.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.9); 

//Ring
c.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
c.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);

//Pinky
c.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
c.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);