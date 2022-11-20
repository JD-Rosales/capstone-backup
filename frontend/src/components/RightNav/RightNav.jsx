import "./RighNav.css";

const RightNav = (props) => {
  return (
    <div className="right-nav">
      <div className="header-container">
        <h1>
          {props.header} <br />
          <span>{props.coloredText}</span>
        </h1>
      </div>

      <div className="text">
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default RightNav;
