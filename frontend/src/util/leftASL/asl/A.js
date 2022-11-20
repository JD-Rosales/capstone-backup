import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

//Has Similarities to Gesture E and S
export const a = new GestureDescription("A");

//Thumb
a.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
a.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0); 

//Index
a.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
a.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
a.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
a.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
a.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
a.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);


//Pinky
a.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
a.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);