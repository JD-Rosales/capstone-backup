import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const four = new GestureDescription("4");

//Thumb
four.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1);
//  four.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0); 

//Index
four.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
four.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
four.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
four.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

//Ring
four.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
four.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);


//Pinky
four.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
four.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);

export default four