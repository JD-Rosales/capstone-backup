import React from "react";
import "./Lesson4.css";
import vocab1 from "../../../assets/lesson4_vocab_1.jpg";
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
      toast("Congrats! you have completed Lesson 4");
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isError, isSuccess, message]);

  const lesson = 4;

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      if (user.lesson.progress < 4) {
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
          LESSON <span>4</span> : NON-MANUAL MARKERS (NMM)
        </h1>
        <img src={learnASL_illustration} alt="Learn ASL Illustration" />
      </header>

      <hr />

      <main onScroll={handleScroll}>
        <h2>Objectives:</h2>
        <br />
        <ul>
          <li>To be able to determine non-manual markers</li>
          <li>
            To know the difference between non-manual markers and non-manual
            signals
          </li>
          <li>To recognize and sign the vocabulary for this lesson</li>
          <li>To be able to answer the assessment</li>
        </ul>
        <hr />
        <br />
        <h2>
          I. Introduction to <span>ASL</span>
        </h2>
        <br />
        <p>
          <strong>Non-manual</strong> markers are the many expressions on our
          faces, head tilts, shoulder raises, lip movements, and other similar
          signals that we add to "signs" (such those used in American Sign
          Language) to produce or influence meaning. English speakers frequently
          use voice inflection to imply that they are posing a question. ASL
          signers employ non-manual signals rather than vocal inflection to
          inflect their questions.
        </p>
        <br />
        <p>Example: </p>
        <br />
        <ul>
          <li>
            Tighten the muscles in your cheek and bring it closer to your
            shoulder (as if you were smiling with half your face). This
            non-manual marker is used with signs like RECENT and THERE to imply,
            quite recent and right there (close). It is frequently abbreviated
            as c-s, which stands for cheek to shoulder.
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
          A non-manual signal (one that you express without using your hands)
          that affects (marks) the meaning of another sign that you are making
          is referred to as a <strong>non-manual marker.</strong>
        </p>
        <small>
          <i>
            Note: A non-manual marker is always a non-manual signal, but a
            non-manual signal is not always a nonmanual marker.
          </i>
        </small>
        <br />
        <br />
        <p>
          If we employed a non-manual signal as a standalone sign, we wouldn't
          call it a marker
        </p>

        <br />
        <p>Example: </p>
        <br />
        <ul>
          <li>
            If you ask me a question and I shake my head <strong>no</strong>{" "}
            then I'm not marking some other sign, I'm simply signaling (signing)
            to you the meaning of <strong>no.</strong> In that case, the
            non-manual signal is not a marker, it is a non-manual <i>sign.</i>
          </li>
          <li>
            Consider the sentence <strong> He arrived very recently. </strong>{" "}
            If we sign that sentence in a somewhat English manner:{" "}
            <strong> HE ARRIVE VERY RECEN </strong> using the initialized form
            of VERY that looks like BIG done with V hands then we are not{" "}
            <strong> marking </strong> the sign RECENT with the sign VERY. We
            are simply using two different signs to create meaning. However, if
            we sign in an ASL style, <strong> HE ARRIVE RECENT-(CS) </strong>{" "}
            wherein the <strong> CS </strong> means move your cheek and shoulder
            together then we can say that the <strong> CS </strong> (cheek to
            shoulder movement) is being used to mark the sign RECENT. By{" "}
            <strong>mark</strong> we mean{" "}
            <i> change or influence the meaning of. </i> We changed the meaning
            from recent to instead be very recent. Thus, the CS movement is a
            non-manual signal that was used as a non-manual marker.
          </li>
        </ul>
        <br />
        <h3>
          <strong>Vocabulary of the Day</strong>
        </h3>
        <p>DAY 4 Days of the Week</p>
        <br />
        <img src={vocab1} alt="vocabulary illustration" />
      </main>
      <Sidebar />
    </div>
  );
};

export default Lesson3;
