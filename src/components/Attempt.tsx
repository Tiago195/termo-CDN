import { chakra, HStack, PinInput, PinInputField } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { IAttempt } from '../interfaces/IAttempt'
import { IColor } from '../interfaces/IColor'
import { ICurrentAttempt } from '../interfaces/ICurrentAttempt'
import { IMatch } from '../interfaces/IMatch'
import { findInDb, validLetter } from '../utils'

type Props = {
  match: IMatch
  setMatch: React.Dispatch<React.SetStateAction<IMatch>>
  historyLetter: string
  index: number
  historyAttempts: IAttempt[]
  setCurrentLetter: React.Dispatch<React.SetStateAction<string[]>>
  currentLetter: string[]
  isCorrect: boolean
  colors: IColor
  sendTry: () => void
  mode: boolean
  ClipboardIndex: number
  focus: number
  setFocus: React.Dispatch<React.SetStateAction<number>>
}

export const Attempt = ({ ClipboardIndex, setFocus, mode, focus, match, isCorrect, currentLetter, setMatch, sendTry, colors, historyLetter, historyAttempts, index, setCurrentLetter }: Props) => {
  const currentValue = match.chance === index ? currentLetter.reduce((a, b) => a += b === '' ? ' ' : b, '') : '';
  const inMode = mode ? ClipboardIndex === match.currentClipboard ? '100%' : '0' : '100%';

  const sendIfEnter = ({ target, key }: any) => {
    if (key === "ArrowRight") {
      setFocus((old) => old < 4 ? old + 1 : old)
      target.nextElementSibling?.focus();
    }
    if (key === "ArrowLeft") {
      target.previousElementSibling?.focus();
      setFocus((old) => old > 0 ? old - 1 : old)
    }

    const index = Number(target.getAttribute("data-index"))
    if (key.length === 1) {
      setCurrentLetter((oldLetter) => oldLetter.map((e, i) => i === index ? key.toLowerCase() : e))
      setFocus((old) => old < 4 ? old + 1 : old)
      target.nextElementSibling?.focus();
    }
    if (key === "Backspace") {
      if (currentLetter[index] === '') {
        setCurrentLetter((oldLetter) => oldLetter.map((e, i) => i === index - 1 ? '' : e))
        setFocus((old) => old > 0 ? old - 1 : old)
        target.previousElementSibling?.focus()
      }
      setCurrentLetter((oldLetter) => oldLetter.map((e, i) => i === index ? '' : e))
    }

    if (key === "Enter") {
      sendTry()
    }
  }

  const getColor = (attempt: IAttempt | undefined) => {
    if (!attempt) return
    // console.log(attempt);

    if (attempt.position && attempt.include) return colors.success
    if (attempt.include) return colors.warning

    return colors.default
  }

  return (
    <HStack maxW={[`100px`, '200px']} transition={'all .5s'} height={inMode} opacity={inMode}>
      {historyAttempts || isCorrect ? (
        <PinInput
          type='alphanumeric'
          value={historyAttempts ? findInDb(historyLetter) : ''}
          placeholder="🥳"
        >
          {Array.from({ length: 5 }).map((e, i) => (
            <PinInputField marginInlineStart='0px !important' maxH={['20px', '40px']} margin='0' key={i} bgColor={historyAttempts ? getColor(historyAttempts[i]) : undefined} readOnly />
          ))}
        </PinInput>
      ) : (
        <PinInput
          type='alphanumeric'
          placeholder="_"
          value={currentValue}
          manageFocus={false}
          isDisabled={match.chance !== index}
          focusBorderColor='rgba(255, 255, 255, 0.16)'
        >
          {Array.from({ length: 5 }).map((e, i) => (
            <PinInputField
              _disabled={{ cursor: '' }}
              _light={{ border: '1px solid black', borderBottom: match.chance === index && i === focus ? "5px solid #38A169" : "0px" }}
              borderBottom={match.chance === index && i === focus ? "5px solid #38A169" : "0px"}
              _focus={{ borderBottom: '5px solid #38A169' }}
              key={i}
              onClick={() => setFocus(i)}
              marginInlineStart='0px !important'
              maxH={['20px', '40px']}
              onKeyDown={sendIfEnter}
            />
          ))}
        </PinInput>
      )}
    </HStack>
  )
}
