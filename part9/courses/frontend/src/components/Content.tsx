import { Course } from "../types"

interface ContentProps {
  courses: Course[]
}
const Content = ({courses}: ContentProps) => {
  return (
    <>
      <p>
        {courses[0].name} {courses[0].exerciseCount}
      </p>
      <p>
        {courses[1].name} {courses[1].exerciseCount}
      </p>
      <p>
        {courses[2].name} {courses[2].exerciseCount}
      </p>
    </>
  )
}

export default Content