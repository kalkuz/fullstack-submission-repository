import { useState } from 'react';

function Button({ title, onClick }) {
  return (
    <input type="button" value={title} onClick={onClick} />
  );
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([]);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>
        Votes:
        {' '}
        {votes[selected] || 0}
      </div>
      <div>
        <Button
          title="Vote"
          onClick={() => {
            const prev = [...votes];
            prev[selected] ??= 0;
            prev[selected] += 1;
            setVotes(prev);
          }}
        />
        <Button title="Next anecdote" onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} />
      </div>

      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[votes.reduce((p, c, ci) => (votes[p] < c ? ci : p), 0)]}</div>
    </div>
  );
}

export default App;
