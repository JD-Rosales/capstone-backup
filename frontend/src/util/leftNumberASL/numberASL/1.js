import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const one = new GestureDescription("1");

//Thumb
one.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
one.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0); 

//Index
one.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
one.addDirection(Finger.Index, FingerDirection.VerticalDown, 1.0);
asdswas
//Middle
one.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
one.addDirection(Finger.Middle, FingerDirection.VerticalDown, 1.0);

//Ring
one.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
one.addDirection(Finger.Ring, FingerDirection.VerticalDown, 1.0);


//Pinky
one.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
one.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 1.0);