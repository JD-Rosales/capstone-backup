import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const eight = new GestureDescription("8");

//Thumb
eight.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
eight.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
eight.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
eight.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

//Middle
eight.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
// eight.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
eight.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
eight.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);


//Pinky
eight.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
eight.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);

export default eight