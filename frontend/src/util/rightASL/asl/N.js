import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const n = new GestureDescription("N");

//Thumb
n.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9);
n.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.8); 

//Index
n.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
n.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 1.0);

//Middle
n.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
n.addDirection(Finger.Middle, FingerDirection.DiagonalDownLeft, 1.0);

//Ring
n.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
n.addDirection(Finger.Ring, FingerDirection.DiagonalDownLeft, 1.0);

//Pinky
n.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
n.addDirection(Finger.Ring, FingerDirection.DiagonalDownLeft, 1.0);