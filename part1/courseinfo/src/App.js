function Header({ title }) {
  return <h1>{title}</h1>;
}

function Part({ part, exercises }) {
  return (
    <p>
      {part}
      {' '}
      {exercises}
    </p>
  );
}

function Content({ parts }) {
  return (
    <>
      {parts.map(({ part, exercises }) => (
        <Part part={part} exercises={exercises} />
      ))}
    </>
  );
}

function Total({ parts }) {
  return (
    <p>
      Number of exercises
      {' '}
      {parts.map((p) => p.exercises).reduce((p, c) => p + c)}
    </p>
  );
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  );
}

export default App;
