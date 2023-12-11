import { CourseKind, CoursePart } from "../types"

interface ContentProps {
  courseParts: CoursePart[]
}
const Content = ({courseParts}: ContentProps) => {
  const viewPart = (part: CoursePart) => {
    switch(part.kind) {
      case CourseKind.basic:
        return <i>{part.description}</i>
      case CourseKind.group:
        return <p>Project exercises {part.groupProjectCount}</p>
      case CourseKind.background:
        return (
          <>
            <i>{part.description}</i>
            <p>Submit to {part.backgroundMaterial}</p>
          </>
        )
      case CourseKind.special:
        return (
          <>
            <i>{part.description}</i>
            <p>Required skills: {part.requirements.join(', ')}</p>
          </>
        )
      default:
        return null;
    }
  }
  return (
    <>
      {courseParts.map(part => (
        <div key={part.name}>
          <h3>{part.name} {part.exerciseCount}</h3>
          {viewPart(part)}
        </div>
        )
      )}
    </>
  )
}

export default Content