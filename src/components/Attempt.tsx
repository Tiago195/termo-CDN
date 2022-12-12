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
  setCurrentLetter: React.Dispatch<React.SetStateAction<string>>
  isCorrect: boolean
  colors: IColor
  sendTry: () => void
}

export const Attempt = ({ match, isCorrect, setMatch, sendTry, colors, historyLetter, historyAttempts, index, setCurrentLetter }: Props) => {
  // lembrar de voltar aqui depois
  const refInput = useRef<HTMLInputElement>(null);

  const handleChange = (str: string) => {
    setCurrentLetter(str)
  }

  const sendIfEnter = ({ key }: any) => {
    if (key === "Enter") {
      sendTry()
      // refInput.current?.focus()
    }
  }

  const getColor = (attempt: IAttempt | undefined) => {
    if (!attempt) return
    // console.log(attempt);

    if (attempt.position && attempt.include) return colors.success
    if (attempt.include) return colors.warning

    return colors.default
  }
  // console.log(historyLetter);

  return (
    <HStack>
      {historyAttempts || isCorrect ? (
        <PinInput
          type='alphanumeric'
          value={historyAttempts ? findInDb(historyLetter) : ''}
          placeholder="🥳"
        >
          {Array.from({ length: 5 }).map((e, i) => (
            <PinInputField key={i} bgColor={historyAttempts ? getColor(historyAttempts[i]) : undefined} readOnly />
          ))}
        </PinInput>
      ) : (
        <PinInput
          type='alphanumeric'
          placeholder="_"
          defaultValue=''
          onChange={handleChange}
          isDisabled={match.chance !== index}
          autoFocus
        >
          <PinInputField onKeyUp={sendIfEnter} ref={refInput} />
          <PinInputField onKeyUp={sendIfEnter} />
          <PinInputField onKeyUp={sendIfEnter} />
          <PinInputField onKeyUp={sendIfEnter} />
          <PinInputField onKeyUp={sendIfEnter} />
        </PinInput>
      )}
    </HStack>
  )
}
