import  {Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

export const j = new GestureDescription("J");

//Thumb
j.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
j.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0); 

//Index
j.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
j.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

//Middle
j.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
j.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

//Ring
j.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
j.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);

//Pinky
j.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
j.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);