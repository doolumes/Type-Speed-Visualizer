import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { paragraphArray } from "./randomParagraphArray";
const root = ReactDOM.createRoot(document.getElementById("root"));

let id;
function Header() {
	return (
		<header>
			<div className="logo">
				<a className="logo-link" href="../public/index.html">
					<i className="fa-solid fa-keyboard"></i>
					<h1 className="title">this.type</h1>
				</a>
			</div>
		</header>
	);
}
function Main() {
	return (
		<div className="container" id="container">
			<div className="text-area" id="text-area"></div>
			<div className="metrics">
				<h1 className="time" id="time">
					Time left: 60
				</h1>
				<h1 className="mistakes" id="mistakes">
					Mistakes: 60
				</h1>
				<h1 className="wpm" id="wpm">
					WPM: 60
				</h1>
				<h1 className="cpm" id="cpm">
					CPM: 60
				</h1>
			</div>
		</div>
	);
}

function Word(props) {
	const { text, active, correct } = props;

	if (correct === true) {
		return <span className="correct">{text} </span>;
	}

	if (correct === false) {
		return <span className="incorrect">{text} </span>;
	}

	if (active === true) {
		return <span className="active">{text} </span>;
	}
	return <span>{text} </span>;
}

//less rerenders
Word = React.memo(Word);

function Timer(props) {
	const [timeElapsed, setTimeElapsed] = React.useState(0);
	const { startCounting, correctWordsCount } = props;
	React.useEffect(() => {
		if (startCounting) {
			id = setInterval(() => {
				setTimeElapsed((time) => time + 1);
			}, 1000);
		}
		return () => {
			clearInterval(id);
		};
	}, [startCounting]);
	const minutes = timeElapsed / 60;
	return (
		<div>
			<p className="time">Time: {timeElapsed}</p>
			<p className="speed">
				Speed: {(correctWordsCount / minutes || 0).toFixed(2)}WPM
			</p>
			<p className="Correct Words">Words Correct: {correctWordsCount || 0}</p>
		</div>
	);
}

function Speed(props) {
	const [time, setTime] = React.useState(0);

	const { correctWordsCount } = props;
	setInterval(() => {
		setTime((time) => time + 1);
	}, 1000);
	let seconds = time / 60;
	return (
		<div
			className="speed-meter"
			id="speed-meter"
			style={{ width: `${(correctWordsCount / seconds) * 300}px` }}
		></div>
	);
}
function App() {
	const paragraph =
		paragraphArray[Math.floor(Math.random() * paragraphArray.length)].split(
			" "
		);
	const cloud = React.useRef(paragraph);
	const inputRef = React.useRef(null);

	const [userInput, setUserInput] = React.useState("");
	const [startCounting, setStartCounting] = React.useState(false);
	const [activeWordIndex, setActiveWordIndex] = React.useState(0);
	const [correctWordArray, setCorrectWordArray] = React.useState([]);

	function processInput(value) {
		if (activeWordIndex === cloud.current.length) {
			return;
		}

		if (!startCounting) {
			setStartCounting(true);
		}

		if (value.endsWith(" ")) {
			//overflow
			if (activeWordIndex === cloud.current.length - 1) {
				setStartCounting(false);
				setUserInput("Completed");
			} else {
				setUserInput("");
			}
			//user has finished the word (on key up on change is fired)
			setActiveWordIndex((index) => index + 1);
			//correct word

			setCorrectWordArray((data) => {
				const word = value.trim();
				const newResult = [...data];
				newResult[activeWordIndex] = true;
				newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
				return newResult;
			});
		} else {
			setUserInput(value);
		}
	}
	return (
		<div className="container">
			<Header />
			<p className="paragraph">
				{cloud.current.map((word, index) => {
					return (
						<Word
							text={word}
							active={index === activeWordIndex}
							correct={correctWordArray[index]}
						/>
					);
				})}
			</p>

			<Timer
				correctWordsCount={correctWordArray.filter(Boolean).length}
				startCounting={startCounting}
			/>

			<input
				type="text"
				value={userInput}
				onChange={(e) => processInput(e.target.value)}
			/>
			{/* <Main /> */}

			<button>Type to Start</button>
			<Speed correctWordsCount={correctWordArray.filter(Boolean).length} />
			<div className="nums">
				<p>2</p>
				<p>1</p>
				<p>(WPS)</p>
				<p>1</p>
				<p>2</p>
			</div>
			<div className="keyboard">
				<div className="top-row">
					<span id="key-cap">
						<i>q</i>
					</span>
					<span id="key-cap">
						<i>w</i>
					</span>
					<span id="key-cap">
						<i>e</i>
					</span>
					<span id="key-cap">
						<i>r</i>
					</span>
					<span id="key-cap">
						<i>t</i>
					</span>
					<span id="key-cap">
						<i>y</i>
					</span>
					<span id="key-cap">
						<i>u</i>
					</span>
					<span id="key-cap">
						<i>i</i>
					</span>
					<span id="key-cap">
						<i>o</i>
					</span>
					<span id="key-cap">
						<i>p</i>
					</span>
				</div>

				<div className="mid-row">
					<span id="key-cap">
						<i>A</i>
					</span>
					<span id="key-cap">
						<i>s</i>
					</span>
					<span id="key-cap">
						<i>d</i>
					</span>
					<span id="key-cap">
						<i>f</i>
					</span>
					<span id="key-cap">
						<i>g</i>
					</span>
					<span id="key-cap">
						<i>h</i>
					</span>
					<span id="key-cap">
						<i>j</i>
					</span>
					<span id="key-cap">
						<i>k</i>
					</span>
					<span id="key-cap">
						<i>l</i>
					</span>
				</div>

				<div className="bot-row">
					<span id="key-cap">
						<i>z</i>
					</span>
					<span id="key-cap">
						<i>x</i>
					</span>
					<span id="key-cap">
						<i>c</i>
					</span>
					<span id="key-cap">
						<i>v</i>
					</span>
					<span id="key-cap">
						<i>b</i>
					</span>
					<span id="key-cap">
						<i>n</i>
					</span>
					<span id="key-cap">
						<i>m</i>
					</span>
				</div>
				<div className="space-row">
					<span className="space" id="key-cap">
						<i> </i>
					</span>
				</div>
			</div>
		</div>
	);
}
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
reportWebVitals();
