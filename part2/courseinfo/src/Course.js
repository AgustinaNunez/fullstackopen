import React from 'react'

const Course = ({courses}) => {
    return (
        <>
        {
            courses.map((course) => {
                const total = course.parts.reduce((a,b) => (a.exercises || 0) + b.exercises)
                return (
                    <div>
                        <h1>{course.name}</h1>
                        {
                            course.parts.map(({name, exercises}) => <p>{name} {exercises}</p>)
                        }
                        <b>total of {total} exercises</b>
                    </div>
                )
            })
        }
        </>
    )
}

export default Course