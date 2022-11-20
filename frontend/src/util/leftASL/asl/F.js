import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const f = new GestureDescription("F");

//Thumb
f.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
f.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
f.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
f.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);

//Index
f.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
f.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
f.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
f.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

//Ring
f.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
f.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);

//Pinky
f.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
f.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
f.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);