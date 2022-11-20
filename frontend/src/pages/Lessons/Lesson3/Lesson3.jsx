import React from "react";
import "./Lesson3.css";
import vocab1 from "../../../assets/lesson3_vocab_1.jpg";
import vocab2 from "../../../assets/lesson3_vocab_2.jpg";
import vocab3 from "../../../assets/lesson3_vocab_3.jpg";
import vocab4 from "../../../assets/lesson3_vocab_4.jpg";
import vocab5 from "../../../assets/lesson3_vocab_5.jpg";
import vocab6 from "../../../assets/lesson3_vocab_6.jpg";
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
      toast("Congrats! you have completed Lesson 3");
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isError, isSuccess, message]);

  const lesson = 3;

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      if (user.lesson.progress < 3) {
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
          LESSON <span>3 </span> : GRAMMAR AND SYNTAX
        </h1>
        <img src={learnASL_illustration} alt="Learn ASL Illustration" />
      </header>

      <hr />

      <main onScroll={handleScroll}>
        <h2>Objectives:</h2>
        <br />
        <ul>
          <li>To know the grammar and syntax of ASL</li>
          <li>To recognize and sign the vocabulary for this lesson</li>
          <li>To be able to answer the assessment</li>
        </ul>
        <hr />
        <br />
        <h2>
          I. Grammar and <span>Syntax</span>
        </h2>
        <br />
        <p>
          The previous lesson discussed sentence structure{" "}
          <i>(Lesson 2: Facial Expressions and Sentence Structure). </i>
          Therefore, be sure to comprehend lesson 2, as it is related to lesson
          3.
        </p>
        <br />
        <p>
          American Sign Language's grammar can be conceptualized simply
          following a <strong>TOPIC + COMMENT </strong> pattern or{" "}
          <strong>SUBJECT + PREDICATE </strong>structure.
        </p>
        <br />
        <p>
          When you need to modify the tense of your sentence, it is preferable
          to declare your time frame up front:{" "}
          <strong>TIME + TOPIC + COMMENT.</strong>
          This allows you to avoid having to conjugate ASL verbs since if the
          time frame is not the present; we state it at the beginning of our
          sentence.
        </p>
        <br />
        <p>Example: </p>
        <br />
        <ul>
          <li>Week-Past Me Wash Car</li>
          <li>Week-Past, Car? I/Me Wash</li>
          <li>Week-Past, Car? I/Me Wash I-[did]</li>
        </ul>
        <br />
        <p>
          Which of those versions we sign is largely determined by two factors:
        </p>
        <br />
        <ol>
          <li>What the signer wants to emphasize.</li>
          <li>
            What information does the signer as well as the audience already
            share.
          </li>
        </ol>
        <br />
        <p>
          ASL uses <strong>SUBJECT + VERB + OBJECT </strong> quite often, what
          ASL does not use is the <strong> SUBJECT + BE-VERB + OBJECT </strong>{" "}
          (e.g., instead of signing
          <i> He is my sister, </i> you would simply sign <i> He my sister </i>{" "}
          while nodding your head instead of signing is).
        </p>
        <br />
        <p>Example: </p>
        <br />
        <ul>
          <p>I am a student, can be signed:</p>
          <li>I Student I</li>
          <li>Student I</li>
          <li>I Student</li>
          <br />
          <p>I am from Philippines, can be signed:</p>
          <li>I from Philippines I</li>
          <li>I from Philippines</li>
          <li>From Philippines I</li>
        </ul>
        <br />
        <p>
          You can sign any of the aforementioned examples and still be signing
          ASL. The version that serves the biggest number of users may be the{" "}
          <strong>correct</strong> version. (The version that is successful in
          enabling communication between two or more people.)
        </p>
        <br />
        <p>
          If you wanted to ask someone, <i>where are you from?</i> – it can be
          signed as <i> you from where? </i>
          The reason for this is when you sign <strong> WH </strong> type of
          question, you generally should furrow your eyebrows. You can shorten
          the time it takes to furrow your brows by placing the "WH" word or
          sign (<strong>WHERE, WHAT, WHEN, WHO</strong>) at the end since you
          don't have to furrow your brows throughout the entire sentence.
        </p>
        <br />
        <p>
          On the other hand, when meeting a Deaf person in real situation, you
          are likely to encounter <i> Where are you from? </i> signed as{" "}
          <i> You from? </i> with the eyebrows furrowed when you sign the word{" "}
          <i> from </i> – thus causing the sign from to mean{" "}
          <i> where from? </i>
        </p>
        <ul className="ul">
          <li>
            <small>
              <i>
                Predicate is a word, sign, or phrase that{" "}
                <strong> say something about </strong> about the subject.
              </i>
            </small>
          </li>
          <li>
            <small>
              <i>
                Conjugate is a big word for{" "}
                <strong> create a different for </strong> (e.g., wash becomes
                washed or run becomes ran.)
              </i>
            </small>
          </li>
        </ul>
        <br />
        <h3>
          <strong>Vocabulary of the Day</strong>
        </h3>
        <p>Day 3 Pronouns</p>
        <br />
        <img src={vocab1} alt="vocabulary illustration" />
        <img src={vocab2} alt="vocabulary illustration" />
        <img src={vocab3} alt="vocabulary illustration" />
        <img src={vocab4} alt="vocabulary illustration" />
        <img src={vocab5} alt="vocabulary illustration" />
        <img src={vocab6} alt="vocabulary illustration" />
      </main>
      <Sidebar />
    </div>
  );
};

export default Lesson3;
