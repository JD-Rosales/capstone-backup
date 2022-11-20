import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const one = new GestureDescription("1");

//Thumb
one.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
one.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
one.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
one.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
one.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
// one.addDirection(Finger.Middle, FingerDirection.VerticalDown, 1.0);

//Ring
one.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
// one.addDirection(Finger.Ring, FingerDirection.VerticalDown, 1.0);

//Pinky
one.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
// one.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 1.0);

export default one