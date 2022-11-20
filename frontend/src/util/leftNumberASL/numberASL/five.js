import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const five = new GestureDescription("5");

//Thumb
five.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
five.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
five.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
five.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
five.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
five.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
five.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
five.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);


//Pinky
five.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
// five.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);

export default five