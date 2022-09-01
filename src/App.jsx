import React from 'react';
import db from './db.json'
import Quiz from './Quiz';

function App() {

  return (
    <div className="quiz">
      <div className='quiz-container'>
        <Quiz quiz={db.questions} />
      </div>
    </div>
  );
}

export default App;
