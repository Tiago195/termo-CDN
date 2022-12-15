import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IAttempt } from '../interfaces/IAttempt'
import { IColor } from '../interfaces/IColor'
import { ICurrentAttempt } from '../interfaces/ICurrentAttempt'
import { IMatch } from '../interfaces/IMatch'
import { defaultCurrentAttempt } from '../utils'
import { Attempt } from './Attempt'
import { Info } from './Info'

type Props = {
  letter: string
  index: number
  match: IMatch
  mode: boolean
  setMatch: React.Dispatch<React.SetStateAction<IMatch>>
  setCurrentLetter: React.Dispatch<React.SetStateAction<string[]>>
  currentLetter: string[]
  nextClipboard: () => void
  historyAttempts: IAttempt[][]
  colors: IColor
  isCorrect: boolean
  sendTry: () => void
}

export const Clipboard = ({ isCorrect, letter, currentLetter, sendTry, mode, nextClipboard, colors, setCurrentLetter, historyAttempts, index, match, setMatch }: Props) => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure()

  const next = () => {
    nextClipboard()
    onClose()
  }

  useEffect(() => {
    if (mode && match.currentClipboard === index && match.historyAttempts[index]?.some(e => e.every(e => e.position))) {
      onOpen()
    }
  }, [match.currentClipboard])

  return (
    <>
      <Flex position="absolute" top="0" left="0" w="100vw" justifyContent="center">
        <Info isVisible={mode && isVisible} onClose={next} />
      </Flex>
      {
        mode ? (

          match.currentClipboard === index && (
            Array.from({ length: match.maxChance }).map((e, i) => (
              <Attempt
                key={i}
                index={i}
                match={match}
                historyLetter={match.historyLetters[i]}
                historyAttempts={historyAttempts[i]}
                setMatch={setMatch}
                setCurrentLetter={setCurrentLetter}
                currentLetter={currentLetter}
                colors={colors}
                isCorrect={isCorrect}
                sendTry={sendTry}
              />
            )))
        ) : (
          Array.from({ length: match.maxChance }).map((e, i) => (
            <Attempt
              key={i}
              index={i}
              match={match}
              historyLetter={match.historyLetters[i]}
              historyAttempts={historyAttempts[i]}
              setMatch={setMatch}
              setCurrentLetter={setCurrentLetter}
              currentLetter={currentLetter}
              colors={colors}
              isCorrect={isCorrect}
              sendTry={sendTry}
            />
          ))
        )
      }
    </>
  )
}
