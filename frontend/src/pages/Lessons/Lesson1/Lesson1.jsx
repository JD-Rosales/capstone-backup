import "./Lesson1.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import learnASL_illustration from "../../../assets/learnASL_illustration.png";
import vocab1 from "../../../assets/vocabulary1.jpg";
import vocab2 from "../../../assets/vocabulary2.jpg";
import vocab3 from "../../../assets/vocabulary3.jpg";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { reset, updateProgress } from "../../../features/auth/authSlice";
import { useEffect } from "react";

const Lesson1 = () => {
  const dispatch = useDispatch();
  const { user, token, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast("Congrats! you have completed Lesson 1");
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isError, isSuccess, message]);

  const lesson = 1;

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      if (user.lesson.progress < 1) {
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
    <div className="lesson-1">
      <Sidebar />

      <header>
        <h1>
          LESSON <span>1 </span> : INTRODUCTION TO <span>ASL</span>
        </h1>

        <img src={learnASL_illustration} alt="Learn ASL Illustration" />
      </header>

      <hr />

      <main onScroll={handleScroll}>
        <h2>Objectives:</h2>
        <br />

        <ul>
          <li>To be able to define ASL</li>
          <li>
            To have a basic knowledge about the <i>finger-spelling</i>
          </li>
          <li>To recognize and sign the vocabulary for this lesson</li>
          <li>To be able to answer the assessment</li>
        </ul>
        <hr />
        <br />
        <h2>
          I. Introduction to <span>ASL</span>
        </h2>

        <p style={{ marginTop: "10px" }}>
          <strong>American Sign Language</strong> or most commonly known as{" "}
          <strong>ASL</strong> is the primary visual-gesture language used by
          Deaf people in United States and Canada.
        </p>

        <br />

        <p>
          <strong>ASL</strong> is a visual-gesture language that is expressed
          through facial expression and hand gestures, and is perceived through
          the eyes. It is not just about <i>waving your hand</i> in the air. You
          are adding or changing the meaning in ASL just by{" "}
          <i>
            furrowing your eyebrows, tilting your head, glancing in a certain
            direction, twisting your body in a certain way, puffing your cheek,
          </i>{" "}
          and a variety of other "inflections". A "visual gestural" language
          conveys the same amount of information as an oral/aural (mouth/ear)
          language.
        </p>

        <br />

        <p>
          According to the old static from the 1980’s, there are at least
          500,000 people who use ASL. In addition, according to Dr. Bill’s
          estimation, there are 2 million people who are using ASL on a daily
          basis, and at least 500,000 people who are using ASL as their primary
          means of communication.
        </p>

        <br />

        <p>
          <i>Is ASL limited to just the United States and Canada?</i>
        </p>

        <br />

        <p>
          The answer is no. The Philippines, Ghana, Nigeria, Chad, Burkina Faso,
          Gabon, Zaire, Cote d'Ivoire, Mauritania, Kenya, Madagascar, Benin,
          Togo, Zimbabwe, Singapore, Hong Kong, and many other places also use
          ASL to varying degrees.
        </p>

        <br />

        <h2>
          II. History of <span>ASL</span>
        </h2>

        <br />

        <p>
          Early in the <strong>1800’s</strong> century, Alice, a young Deaf
          girl, and <strong>Thomas Hopkins Gallaudet</strong>, a Yale University
          graduate and hearing minister, met and grew close. Gallaudet showed
          interest in instructing the young woman and was successful in getting
          her to learn a few words. Gallaudet was encouraged to get involved in
          the establishment of a school for the Deaf by the girl's father, Dr.
          Mason Cogswell.
        </p>

        <br />

        <p>
          Early in the <strong>1800’s</strong> century, Alice, a young Deaf
          girl, and <strong>Thomas Hopkins Gallaudet</strong>, a Yale University
          graduate and hearing minister, met and grew close. Gallaudet showed
          interest in instructing the young woman and was successful in getting
          her to learn a few words. Gallaudet was encouraged to get involved in
          the establishment of a school for the Deaf by the girl's father, Dr.
          Mason Cogswell.
        </p>

        <br />

        <p>
          In <strong>1815</strong>, Gallaudet set out for Europe in search of
          Deaf education techniques. The Braidwood schools, the London Asylum,
          and other program directors were all contacted by him, but none of
          them were eager to share their methods with Gallaudet.
        </p>

        <br />

        <p>
          Fortunately, Gallaudet met Sicard, the head of a Paris school for the
          Deaf, while he was in England. Two of Sicard's Deaf students who were
          also teachers at the school in Paris, Jean Massieu and Laurent Clerc,
          were present. They were in England demonstrating sign language
          instruction for the Deaf. The Paris school was using French Sign
          Language along with a set of signs that had been methodically
          developed. The school had been established by the Abbe Charles Michel
          de L'Epee in <strong>1771.</strong>
        </p>

        <br />

        <p>
          In <strong>1817</strong>, in the city of Hartford, Connecticut, the
          first American school for the Deaf was founded when Clerc was
          persuaded by Gallaudet to travel to the United States with him. What
          is now known as American Sign Language was developed over time from
          the signs used at that school and those already being used by Deaf
          people in America. It is significant to note that sign language was in
          use in America prior to the founding of the school by Gallaudet and
          Clerc. One instance which happened on Martha's Vineyard. There used to
          be a large population of Deaf residents, and whether or not they were
          Deaf, every single person in the town knew how to sign.
        </p>

        <br />

        <h2>
          III. Finger-<span>spelling</span>
        </h2>
        <i>
          This lesson will help you become proficient at American Sign Language
          (ASL) finger-spelling.
        </i>

        <br />
        <br />

        <h3>
          <strong>What is finger-spelling?</strong>
        </h3>

        <br />

        <p>
          Finger-spelling is the process of writing words by forming your hands
          into the shapes of the word's letters. Worldwide, there are numerous
          distinct manual alphabets. The term "manual alphabet" refers to a set
          of hand gestures used to spell words, and is used in American Sign
          Language. The{" "}
          <i>
            <strong>American Sign Language Fingerspelled Alphabet </strong>
          </i>{" "}
          is another name for the{" "}
          <i>
            <strong>ASL Manual Alphabet.</strong>
          </i>
          The American Fingerspelled Alphabet is made up of 22 hand-shapes that
          when produced with specific gestures or while being held in specific
          ways, correspond to the 26 letters of the American alphabet.
        </p>

        <br />

        <h3>
          <strong>When should a finger-spelling be used?</strong>
        </h3>

        <br />

        <p>
          <i>Finger-spelling</i>Finger-spelling is used when stating people’s
          name, places, titles, organizations, and brands. But it only scratches
          the surface of the variety of finger-spelling going on. For example,
          food, there are thousands of types of foods that have no established
          sign. But the above-mentioned list is broad since there are existing
          signs for numerous places, titles, organizations, brands, and even
          people.
        </p>

        <br />

        <p>
          Several decades ago, in Salem, the Oregon School for the Deaf
          published a sign language dictionary with roughly 10,000 distinct
          signs. It was probably the biggest printed dictionary of sign language
          at the time. But contrast that with the roughly 180,000 words in a
          common college-level English dictionary.
        </p>

        <br />

        <p>
          Run the numbers. 10,000 signs out of 180,000 words equal approximately
          170,000 words that are unaccounted for. There are a ton of concepts
          without specific "signs".
        </p>

        <br />

        <h3>
          <strong>Should we spell all of those concepts?</strong>
        </h3>

        <br />

        <p>
          There is a good chance that an ASL/English bilingual person will
          fingerspell it if they want to express a concept for which they are
          familiar with the English word, but for which there is no existing
          sign and no practical way to combine other signs to express it, or the
          closest existing sign has multiple meanings and they want to specify a
          less common meaning of that sign.
        </p>

        <br />

        <p>
          But, a proficient ASL signer can effectively convey almost any concept
          by combining pre-existing signs and/or using depictive signing, also
          known as "classifiers." A skilled signer of ASL can easily demonstrate
          a Venn Diagram by using their hands and fingers to depict circular
          shapes and adding the sign "OVERLAP" (Note: As of this writing, the
          sign "overlap" isn't in any ASL dictionary, yet all skilled signers of
          ASL know how to sign the concept). For instance, the concept "Venn
          Diagram" doesn't appear in any ASL dictionary listings (as of this
          writing).
        </p>

        <br />

        <h3>
          <strong>Vocabulary of the Day</strong>
        </h3>
        <p>DAY 1 Be Verbs</p>
        <br />
        <img width={548} src={vocab1} alt="vocabulary illustration" />
        <img width={548} src={vocab2} alt="vocabulary illustration" />
        <img width={548} src={vocab3} alt="vocabulary illustration" />
      </main>
    </div>
  );
};

export default Lesson1;
