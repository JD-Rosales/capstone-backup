import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

//Has Similarities to Gesture A and E
export const s = new GestureDescription("S");

//Thumb
s.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
s.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.8); 

//Index
s.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
s.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
s.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
s.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
s.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
s.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

//Pinky
s.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
s.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);