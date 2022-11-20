import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const three = new GestureDescription("3");

//Thumb
three.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
three.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0); 

//Index
three.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
three.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
three.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
three.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
three.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
three.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);


//Pinky
three.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
three.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);

export default three