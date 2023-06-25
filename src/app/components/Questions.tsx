/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// import { qs } from '../';
import { questions } from '@/utils';

const Questions = ({ step, handleAnswer, qs, handleStep}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [animationKey, setAnimationKey] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false)
  const btn = document?.getElementById('quizBtn')

  const restartAnimation = () => {
    setAnimationKey(prevKey => prevKey + 1);
  };

  const question = qs[step - 1];
  const correctAnswer = question?.correct;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const isCorrect = selectedOption === question.correct;
    setShowAnswers(true)
    if(isCorrect){ 
      handleAnswer(isCorrect)
      btn?.classList?.add('border-green-300')
    } else {
      btn?.classList?.add('border-red-400')
    } 
    // setShowAnswers(false)
    // handleStep()

    
    
    // restartAnimation();
  };

  const handleNewStep = (e: any) => {
    e.preventDefault()
    btn?.classList?.remove('border-green-300', 'border-red-400')
    setShowAnswers(false)
    handleStep()
    setSelectedOption('');
  }

  console.log("theQuestion", question)


  return (
    <div className='p-3'>
      <motion.h2  className='text-3xl text-center mb-5'>Question {step}</motion.h2>
      <motion.h3  className='text-lg font-bold'>{question?.question}</motion.h3>
      <form onSubmit={(e) => {!showAnswers ? handleSubmit(e) : handleNewStep(e)}}>
        <AnimatePresence>
          {question?.options?.map((option: any, index: any) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // key={animationKey}
              className="form-control" key={animationKey}>
              <label className={`label cursor-pointer`}>
                <input
                  className="radio"
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}

                />
                <motion.span key={option} layout
                  // animate={{ x: -200 }}
                  transition={{
                    opacity: { ease: "linear" },
                    layout: { duration: 0.3 }
                  }} className={`label-text font-semibold text-lg ${showAnswers && ((option === correctAnswer) ? 'text-green-800' : 'text-red-800')}`}>{option}</motion.span>
                {/* {option} */}
              </label>
            </motion.div>
          ))}
          <button type="submit" id='quizBtn' className="btn btn-block mt-3 border">{!showAnswers ? 'Check Answer' : 'Next'}</button>
        </AnimatePresence>
      </form>
    </div>
  );
};

export default Questions;
