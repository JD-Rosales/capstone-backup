import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const y = new GestureDescription("Y");


//Thumb
y.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
y.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0); 

//Index
y.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
y.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
y.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
y.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
y.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
y.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

//Pinky
y.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
y.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.8);