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
      {parts.map(({ id, name, exercises }) => (
        <Part key={`Part ${id}`} part={name} exercises={exercises} />
      ))}
    </>
  );
}

function Total({ parts }) {
  return (
    <p>
      <b>
        total of
        {' '}
        {parts.map((p) => p.exercises).reduce((p, c) => p + c)}
        {' '}
        exercises

      </b>
    </p>
  );
}

function Course({ course }) {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  );
}

export default Course;
