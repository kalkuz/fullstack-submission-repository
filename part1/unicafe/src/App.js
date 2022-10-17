import { useState } from 'react';

function Header({ title }) {
  return <h1>{title}</h1>;
}

function Part({ title, value }) {
  return (
    <p>
      {title}
      {' '}
      {value}
    </p>
  );
}

function Button({ title, onClick }) {
  return (
    <input type="button" value={title} onClick={onClick} />
  );
}

function StatisticsLine({ definition, value }) {
  return (
    <p>
      {definition}
      {' '}
      {value}
    </p>
  );
}

function Statistics({ parts }) {
  return parts.every((p) => p.value === 0) ? (
    <p>No feedback given</p>
  ) : (
    <>
      <StatisticsLine definition="Good" value={parts.find((p) => p.title === 'good').value} />
      <StatisticsLine definition="Neutral" value={parts.find((p) => p.title === 'neutral').value} />
      <StatisticsLine definition="Bad" value={parts.find((p) => p.title === 'bad').value} />
      <StatisticsLine definition="All" value={parts.map((p) => p.value).reduce((p, c) => p + c)} />
      <StatisticsLine definition="Average" value={parts.find((p) => p.title === 'good').value - parts.find((p) => p.title === 'bad').value} />
      <StatisticsLine definition="Positive" value={`${100 * (parts.find((p) => p.title === 'good').value / parts.map((p) => p.value).reduce((p, c) => p + c))} %`} />
    </>
  );
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const GetParts = () => [
    {
      title: 'good',
      value: good,
    },
    {
      title: 'neutral',
      value: neutral,
    },
    {
      title: 'bad',
      value: bad,
    },
  ];

  return (
    <div>
      <Header title="give feedback" />
      <div>
        <Button title="good" onClick={() => setGood(good + 1)} />
        <Button title="neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button title="bad" onClick={() => setBad(bad + 1)} />
      </div>

      <Header title="statistics" />
      <Statistics parts={GetParts()} />
    </div>
  );
}

export default App;
