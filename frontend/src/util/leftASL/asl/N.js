import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const n = new GestureDescription("N");

//Thumb
n.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);

n.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 1.0); 
//Index
n.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);

n.addDirection(Finger.Index, FingerDirection.VerticalDown, 1.0);
//Middle
n.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

n.addDirection(Finger.Middle, FingerDirection.VerticalDown, 1.0);
//Ring
n.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
n.addDirection(Finger.Ring, FingerDirection.VerticalDown, 1.0);
//Pinky
n.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
n.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 1.0);