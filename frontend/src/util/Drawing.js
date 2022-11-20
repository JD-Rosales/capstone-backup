const fingerJoints = {
  thumb:[0,1,2,3,4],
  index:[0,5,6,7,8],
  mid:[0,9,10,11,12],
  ring:[0,13,14,15,16],
  pinky:[0,17,18,19,20]
};

export const drawHand = (hand, canvas) => {
  if(hand.length >  0) {
    hand.forEach(element => {
      const landmarks = element.landmarks;

      for(let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];

        for(let k = 0; k < fingerJoints[finger].length-1; k++) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k+1];

          canvas.beginPath();
          canvas.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
            );
          canvas.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          )
          canvas.strokeStyle = "#182142";
          canvas.lineWidth = 1;
          canvas.stroke();
        }
      }

      for(let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];

        canvas.beginPath();
        canvas.arc(x, y, 3, 0, 3 * Math.PI);

        canvas.fillStyle = "#42C9A3";
        canvas.fill();
      }
    });
  }
}