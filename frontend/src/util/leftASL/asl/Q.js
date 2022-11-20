import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const q = new GestureDescription("Q");

//Thumb
q.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
q.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 1.0); 

//Index
q.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
q.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

//Middle
q.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
q.addDirection(Finger.Middle, FingerDirection.DiagonalDownRight, 1.0);

//Ring
q.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
q.addDirection(Finger.Ring, FingerDirection.DiagonalDownRight, 1.0);

//Pinky
q.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
q.addDirection(Finger.Pinky, FingerDirection.DiagonalDownRight, 1.0);