import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

//Has Similarities to Gesture A and S
export const e = new GestureDescription("E");

//Thumb
e.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
e.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);     

//Index
e.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
e.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

//Middle
e.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
e.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
e.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
e.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

//Pinky
e.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
e.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
