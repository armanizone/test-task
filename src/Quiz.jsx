import React from 'react'

function Quiz({quiz}) {

  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState([])
  const [message, setMessage] = React.useState({
    visible: false,
    value: false
  })

  const answer = (ques, e) => {
    e.preventDefault()
    if (answers.some(a => ques.answer.indexOf(a) >= 0))
      setMessage({ visible: true, value: true })
    else
      setMessage({ visible: true, value: false })

  }
  const nextQuestion = e => {
    if (step < 6)
      setStep(q => q + 1)
    else
      setStep(0)
    setMessage({})
    setAnswers([])
  }

  const handleAnswers = (ans) => {
    if (answers.indexOf(ans) === -1) {
      if (isNaN(ans))
        setAnswers([...answers, ans])
      else
        setAnswers([...answers, parseInt(ans)])
    } else
      setAnswers(answers.filter(e => { return e !== ans }))
  }

  return (
    quiz.map((ques, i) => {
      return (
        <form onSubmit={e => answer(ques, e)} className='quiz-inner' key={i}>
          <h3 className='quiz-question'>{ques.question} <span>Вопрос содержит два или более вариантов ответа</span></h3>
          <ul className='quiz-answers'>
            {ques.options.map((o, i) => {
              return <li key={i}>
                <input
                  type="checkbox"
                  name={o}
                  id={i}
                  onChange={e => handleAnswers(e.target.name)}
                />
                <label htmlFor={i}>{o}</label>
              </li>
            })}

          </ul>
          {message.visible && (
            <div className='quiz-alert'>
              {message.value ?
                <span>Правильно!</span>
                :
                <span>Не правильно(</span>
              }
            </div>
          )
          }
          <button className='quiz-btn' type='submit'>
            Ответить
          </button>
          {message.visible && (
            <button onClick={nextQuestion} className='quiz-btn' type='button'>
              Следуйщий вопрос
            </button>
          )}
        </form>
      )
    }).slice(step, step + 1)
  )
}

export default Quiz