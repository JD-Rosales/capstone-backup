import React from "react";
import "./Lesson5.css";
import vocab1 from "../../../assets/lesson5_vocab_1.jpg";
import vocab2 from "../../../assets/lesson5_vocab_2.jpg";
import vocab3 from "../../../assets/lesson5_vocab_3.jpg";
import vocab4 from "../../../assets/lesson5_vocab_4.jpg";
import vocab5 from "../../../assets/lesson5_vocab_5.jpg";
import vocab6 from "../../../assets/lesson5_vocab_6.jpg";
import vocab7 from "../../../assets/lesson5_vocab_7.jpg";
import Sidebar from "../../../components/Sidebar/Sidebar";
import learnASL_illustration from "../../../assets/learnASL_illustration.png";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { reset, updateProgress } from "../../../features/auth/authSlice";
import { useEffect } from "react";

const Lesson3 = () => {
  const dispatch = useDispatch();
  const { user, token, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast("Congrats! you have completed Lesson 5");
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isError, isSuccess, message]);

  const lesson = 5;

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      if (user.lesson.progress < 5) {
        const params = {
          id: user._id,
          token: token,
          lesson: lesson,
        };
        dispatch(updateProgress(params));
      }
    }
  };

  return (
    <div className="lesson-3">
      <header>
        <h1>
          LESSON <span>5</span> : EYE GAZE
        </h1>
        <img src={learnASL_illustration} alt="Learn ASL Illustration" />
      </header>

      <hr />

      <main onScroll={handleScroll}>
        <h2>Objectives:</h2>
        <br />
        <ul>
          <li>To be able to know what is eye gaze</li>
          <li>To know the importance of eye gaze</li>
          <li>To recognize and sign the vocabulary for this lesson</li>
          <li>To be able to answer the assessment</li>
        </ul>
        <hr />
        <br />
        <h2>
          I. EYE <span>GAZE</span>
        </h2>
        <br />
        <p>
          When learning ASL for the first time, beginners frequently wonder
          whether they should concentrate on watching the face or the hands.
          It's clear from the term try that they feel they miss a lot of
          information if they don't pay attention to the signer's face and
          hands. Beginners who concentrate on watching the hands can
          occasionally appear to be keeping their eyes on a fly that is flitting
          about in front of them.
        </p>
        <br />
        <p>
          In private, one-on-one interactions, it is best to pay attention to
          the signer's face rather than their hands. You will get better at
          catching the indicators with your peripheral vision with enough
          practice.
        </p>
        <br />
        <p>
          If you are signing with a Deaf person and one of your hearing friends
          yells out your name or approaches you while you are signing, instead
          of glancing away in the middle of a conversation with a Deaf person,
          focus on the signer while simultaneously making the{" "}
          <strong> wait a minute </strong> signal with your index finger to your
          friend who is interfering. Once the Deaf person has completed
          speaking, proceed to determine what your friend needs. Be mindful that
          it is impolite to talk loudly (voice) in front of a person who is Deaf
          without signing as if they are not there. If you need to speak to your
          hearing friend for a longer period of time, kindly finish your ASL
          chat so that the Deaf person won't be left hanging.
        </p>
        <br />
        <p>
          You maintain eye contact with the signer while conversing in ASL as
          the receiver. However, if you are signing, you will be using your gaze
          to support and add meaning to your signing.
        </p>
        <br />
        <p>Example: </p>
        <br />
        <ul>
          <li>
            When establishing a pronoun or an absent referent, you will cast
            your eyes toward a location in the room that you will associate with
            the referent for the duration of the conversation.
          </li>
        </ul>
        <br />
        <h2>
          II. Difference between Non-Manual Markers <span>(NMM) </span>and
          Non-Manual Signals <span>(NMS) </span>
        </h2>
        <br />
        <p>
          The term <strong>non-manual</strong> signal refers to a gesture or
          movement that is used to convey information. Examples include altering
          your facial expression, tilting, shaking, or nodding your head, and/or
          hunching one or both shoulders. These movements are{" "}
          <strong>not signals</strong> if they are not intended to send
          information; instead, we would refer to them as <i>twitches.</i>
        </p>
        <br />
        <p>
          A Deaf person will frequently start signing to and looking at an
          imaginary person, which often confuses new signers. You might be
          tempted to check behind you to make sure the person is actually there.
          Attempt to resist the impulse. Instead of utilizing the English way of
          saying "he said" and "she said" before quoting, we frequently use the
          ASL principle of role-taking when we turn our bodies and sign to a
          location in midair as if we were having a "real-time" conversation. A
          Deaf person may occasionally turn aside briefly as he considers his
          next sign. That prevents you from thinking that it is your turn to
          talk.
        </p>
        <br />
        <p>
          Good ASL storytellers use eye gaze to model the characters in their
          story as the characters communicate with each other (short person
          looking up, tall person looking down).
        </p>
        <br />
        <h3>
          <strong>Vocabulary of the Day</strong>
        </h3>
        <p>DAY 5 Days Polite Expressions</p>
        <br />
        <img src={vocab1} alt="vocabulary illustration" />
        <img src={vocab2} alt="vocabulary illustration" />
        <img src={vocab3} alt="vocabulary illustration" />
        <img src={vocab4} alt="vocabulary illustration" />
        <img src={vocab5} alt="vocabulary illustration" />
        <img src={vocab6} alt="vocabulary illustration" />
        <img src={vocab7} alt="vocabulary illustration" />
      </main>
      <Sidebar />
    </div>
  );
};

export default Lesson3;
