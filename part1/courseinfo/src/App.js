const Header = ({course}) => <h1>{course}</h1>

const Part = ({part, exercises}) => (
  <p>
    {part} {exercises}
  </p>
)

const Content = ({parts}) => (
  <>
    <Part part={parts.part1} exercises={parts.exercises1} />
    <Part part={parts.part2} exercises={parts.exercises2} />
    <Part part={parts.part3} exercises={parts.exercises3} />
  </>
)

const Total = ({parts}) => <p>Number of exercises {parts.exercises1 + parts.exercises2 + parts.exercises3}</p>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App