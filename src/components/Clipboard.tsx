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
  focus: number
  setFocus: React.Dispatch<React.SetStateAction<number>>
  changeFocus: (index?: number) => void
}

export const Clipboard = ({ changeFocus, focus, setFocus, isCorrect, letter, currentLetter, sendTry, mode, nextClipboard, colors, setCurrentLetter, historyAttempts, index, match, setMatch }: Props) => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure()

  const next = () => {
    if (match.currentClipboard === 3) {
      onClose()
    } else {
      nextClipboard()
      onClose()
    }
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
        Array.from({ length: match.maxChance }).map((e, i) => (
          <Attempt
            changeFocus={changeFocus}
            focus={focus}
            setFocus={setFocus}
            key={i}
            ClipboardIndex={index}
            index={i}
            match={match}
            historyLetter={match.historyLetters[i]}
            historyAttempts={historyAttempts[i]}
            setMatch={setMatch}
            setCurrentLetter={setCurrentLetter}
            mode={mode}
            currentLetter={currentLetter}
            colors={colors}
            isCorrect={isCorrect}
            sendTry={sendTry}
          />
        ))
      }
    </>
  )
}
