import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const six= new GestureDescription("6");

//Thumb
six.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
six.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0); 

//Index
six.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
six.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
six.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
six.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
six.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
six.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);


//Pinky
six.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
//  six.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);

export default six