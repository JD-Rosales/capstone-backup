import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const i = new GestureDescription("I");

//Thumb
i.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
i.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0); 

//Index
i.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
i.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//Middle
i.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
i.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//Ring
i.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
i.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

//Pinky
i.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
i.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);