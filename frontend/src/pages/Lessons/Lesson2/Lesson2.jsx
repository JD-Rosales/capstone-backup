import React from "react";
import "./Lesson2.css";
import vocab1 from "../../../assets/lesson2_vocab_1.jpg";
import Sidebar from "../../../components/Sidebar/Sidebar";
import learnASL_illustration from "../../../assets/learnASL_illustration.png";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { reset, updateProgress } from "../../../features/auth/authSlice";
import { useEffect } from "react";

const Lesson2 = () => {
  const dispatch = useDispatch();
  const { user, token, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast("Congrats! you have completed Lesson 2");
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isError, isSuccess, message]);

  const lesson = 2;

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      if (user.lesson.progress < 2) {
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
    <div className="lesson-2">
      <header>
        <h1>
          LESSON <span>2 </span> : FACIAL EXPRESSION AND SENTENCE STRUCTURE
        </h1>

        <img src={learnASL_illustration} alt="Learn ASL Illustration" />
      </header>

      <hr />

      <main onScroll={handleScroll}>
        <h2>Objectives:</h2>
        <br />
        <ul>
          <li>
            To be able to recognize the different <i>facial expression</i>
          </li>
          <li>To be able to know the sentence structuring in ASL</li>
          <li>To recognize and sign the vocabulary for this lesson</li>
          <li>To be able to answer the assessment</li>
        </ul>
        <hr />
        <br />
        <h2>
          I. Facial <span> Expression </span>
        </h2>
        <p>
          Facial Expression is <strong>important</strong>
        </p>
        <br />
        <p>
          Most beginner students of ASL have a straight face when signing or
          talking to a deaf person. It has to be kept in mind that using a
          facial grammar is needed when talking to a deaf or hard-of-hearing
          person, like for instance when asking a question that is answerable by
          a yes or no, you have to <strong>raise your eyebrows.</strong> On the
          other hand, when asking a question that involves{" "}
          <i> who, what, when, where, why, or how,</i> you have to{" "}
          <strong>lower your eyebrows.</strong>{" "}
        </p>
        <br />
        <ul>
          <li>
            <i>No be-verbs, Head nodding, and Head shaking </i>
          </li>
        </ul>
        <br />
        <p>
          You do not use state of being verbs when signing a sentence in ASL:
          is, am, was, were, are, be, being, been, and etc
        </p>
        <p>Example: </p>
        <br />
        <ul>
          <li>
            “I am happy” is signed as “I happy” while nodding the head and
            smiling
          </li>
        </ul>
        <br />
        <p>
          “I am NOT happy” is signed as “I happy” while shaking the head and
          frowning a bit or pursing the lips.
        </p>
        <br />
        <p>
          <i>Note: </i>
        </p>
        <br />
        <p>
          <i>Nod your head to affirm that a thing or state exists in ASL.</i>
        </p>
        <p>
          <i>
            Shake your head to affirm that a thing or state does not exist in
            ASL.
          </i>
        </p>
        <br />
        <h2>
          II. Sentence <span> Structure</span>
        </h2>
        <br />
        <p>
          ASL tends to use a “subject + predicate” type of structure or a “topic
          + comment” sentence structure. It was believed that ASL does not use a
          Subject-Verb-Object (SVO) sentence structure. Where in fact, ASL uses
          a variety of sentence types and does indeed make use of SVO sentence
          structure.
        </p>
        <br />
        <p>Example:</p>
        <br />
        <ul>
          <li>I GO STORE</li>
        </ul>
        <br />
        <p>
          Don’t be confused by the gloss. Just because the sentence does not
          contain “am” and “to”, it does not mean that the function of “am” and
          “to” are not being taken care of. The functions of these words are
          replaced by affirmation. The function of “am” in a sentence such as “I
          am going to the store” is replaced in ASL by a slight nod of the head;
          and “to” is incorporated in the movement and direction of the sign f
          or GO. The sign GO actually means, “go to”.
        </p>
        <ul className="ul">
          <li>
            <small>
              <i>Predicate</i> is a word that means “say something about”.
            </small>
          </li>
          <li>
            <small>
              <i>Gloss</i> is a word you use when you write one language in
              another language.
            </small>
          </li>
        </ul>
        <br />
        <ul>
          <li>YOU and YOUR</li>
        </ul>
        <br />
        <p>
          You and Your are two distinct signs, but depending on the structure of
          the sentence or the context of the conversation, it is often
          irrelevant which sign you use (either you or your).
        </p>
        <br />
        <p>Example:</p>
        <ul>
          <li>You name what?</li>
        </ul>
        <br />
        <p>
          It can be interpreted as “What is your name?” because it is the
          equivalent of “You are named what?” In other sentences, however, you
          may want to firmly establish ownership; in those cases, use YOUR.
        </p>
        <br />
        <ul>
          <li>
            <strong>
              <i>Topicalize/Topicalization</i>
            </strong>
          </li>
        </ul>
        <br />
        <p>
          It is common to "topicalize" the sign for the topic when the
          conversation partners have pre-existing information and/or are
          introducing a new topic to the conversation. To topicalize a sign,
          place it at the beginning of a sentence, raise your eyebrows, and tilt
          your head forward slightly.
        </p>
        <br />
        <p>
          <i>Topicalization </i>is not new since it is also used in English
          language, you can see it in phrases such as: “Do you remember Ben?
          Well, yesterday, I saw him in the…”, “That friend of mine who has a
          curly hair? She has now…”, “About yesterday, I just want…”, and the
          likes.
        </p>
        <br />
        <h3>
          <strong>Vocabulary of the Day</strong>
        </h3>
        <p>Day 2 W-Questions</p>
        <br />
        <img src={vocab1} alt="vocabulary illustration" />
      </main>
      <Sidebar />
    </div>
  );
};

export default Lesson2;
