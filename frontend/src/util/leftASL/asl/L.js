import  { Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'

export const l = new GestureDescription("L")

//Thumb
l.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
l.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1); 

//Index
l.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
l.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Middle
l.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
l.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Ring
l.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
l.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

//Pinky
l.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
l.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);