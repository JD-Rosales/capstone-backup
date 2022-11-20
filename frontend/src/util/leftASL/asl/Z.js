import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const z = new GestureDescription("Z");

z.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
z.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);

//Index
z.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
z.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
z.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
z.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);

//Ring
z.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
z.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);

//Pinky
z.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
z.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);


