import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const p = new GestureDescription("P");

//Thumb
p.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
p.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0); 

//Index
p.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
p.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);

//Middle
p.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
p.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);

//Ring
p.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0);
p.addDirection(Finger.Ring, FingerDirection.DiagonalDownLeft, 1.0);

//Pinky
p.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
p.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);