'use client'
import React, { useEffect, useState } from 'react';
import Questions from './Questions';
import Result from './Result';
import { questions } from '@/utils';


function getRandomElements(array: Object[], count : number) {
  const result = [];
  
  count = Math.min(count, array.length);
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    result.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  
  return result;
}


const Quiz = () => {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [qs, setQs] = useState<Object>([])

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 5);
    }
    // setStep(step + 1);
  };

  const handleStep = () => {
    setStep(step + 1);
  }

  useEffect(() => {
    let tempQuestion = getRandomElements(questions, 10)
    setQs(tempQuestion)
  }, [questions])

  return (
    <div className='h-[80vh] w-[100%] flex items-center justify-center'>
      {step <= 10 ? (
        <Questions step={step} handleAnswer={handleAnswer} qs={qs} handleStep={handleStep} />
      ) : (
        <Result score={score} />
      )}
    </div>
  );
};

export default Quiz;