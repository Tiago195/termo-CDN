import React, { useEffect, useRef, useState } from "react"
import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"
import { IMatch } from "./interfaces/IMatch";
import { defaultColor, defaultCurrentAttempt, defaultMatch, findInDb, getNotFoundLetters, getStorage, validLetter } from "./utils";
import { Clipboard } from "./components/Clipboard";
import { ICurrentAttempt } from "./interfaces/ICurrentAttempt";
import { IAttempt } from "./interfaces/IAttempt";
import { Header } from "./components/Header";
import './index.css'
import { IColor } from "./interfaces/IColor";
import { EndGame } from "./components/EndGame";
import KeyboardWrapper from "./components/KeyboardWrapper";

export const App = () => {
  const storage = getStorage('config')
  const [dificult, setDificult] = React.useState<string>(storage.dificult)
  const [match, setMatch] = useState<IMatch>(defaultMatch(dificult as 'Solo'));
  const [mode, setMode] = useState(storage.nilceMode || false);
  const [colors, setColors] = useState<IColor>(storage.colors || defaultColor);
  const [isWin, setIsWin] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const main = useRef<HTMLDivElement>(null)
  const [currentLetter, setCurrentLetter] = useState<string[]>(['', '', '', '', '']);
  const [notFoundLetters, setNotFoundLetters] = useState('');

  const toast = useToast();

  const nextClipboard = () => {
    setMatch((old) => ({ ...old, currentClipboard: old.currentClipboard + 1 }))
  }

  const resetGame = () => {
    window.location.reload()
    // onClose()
    // setCurrentLetter(['', '', '', '', ''])
    // setMatch(defaultMatch(dificult as 'Solo'))
  }

  const setFocus = (index = 0) => {
    (main.current?.firstElementChild?.children[match.chance + 1].children[index] as HTMLInputElement)?.focus()
  }

  const sendTry = () => {
    if (currentLetter.every(e => e)) setFocus(4)
    else setFocus()

    if (!findInDb(currentLetter.join(''))) {
      toast({
        status: "info",
        duration: 2000,
        title: "Palavra invalida 😒",
        position: 'top'
      })
      return
    }

    const t = match.letters.map((e, i) => validLetter(e.split(''), currentLetter))

    const hAttempts = match.letters
      .map((e, i) => {
        const isCorrect = match.historyAttempts[i]?.some(e => e.every(e => e.position));

        if (isCorrect) return match.historyAttempts[i]

        if (match.historyAttempts[i]) return [...match.historyAttempts[i], t[i]]

        return [t[i]]
      })
    const isCorrect = hAttempts.map(e => e.some(e => e.every(e => e.position)))
    setMatch((match) => ({
      ...match,
      chance: match.chance + 1,
      historyLetters: [...match.historyLetters, currentLetter.join('')],
      historyAttempts: hAttempts,
      isCorrect
    }))

    if (!mode && t[match.currentClipboard]?.every(e => e.position)) {
      nextClipboard()
    }

    if (isCorrect.every(e => e) || match.chance + 1 === match.maxChance) setIsWin(match.chance + 1 !== match.maxChance)

    setCurrentLetter(['', '', '', '', '']);
    setNotFoundLetters(getNotFoundLetters(hAttempts))
  }

  // useEffect(() => {
  //   setMatch(defaultMatch(dificult as 'Solo' | 'Dueto' | 'Quarteto'))
  // }, [dificult])

  useEffect(() => {
    setMatch(defaultMatch(dificult as 'Solo' | 'Dueto' | 'Quarteto'))
  }, [mode])

  useEffect(() => {
    if (isWin || match.chance === match.maxChance) {
      onOpen()
    } else {
      setFocus()
    }

  }, [match.chance])

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" overflowX="hidden" textAlign="center" fontSize="xl">
        <Header setMatch={setMatch} endGame={isOpen} onChange={setDificult} changeMode={setMode} mode={mode} changeColor={setColors} colors={colors} setCurrentLetter={setCurrentLetter} />
        <EndGame resetGame={resetGame} colors={colors} isOpen={isOpen} onOpen={onOpen} onClose={onClose} isWin={isWin} match={match} />
        {/* <input type="text" /> */}
        <Flex justifyContent={mode ? 'center' : 'space-evenly'} wrap="wrap" ref={main} alignItems="center" gap="20px" margin="0 auto" marginTop={['25px', '40px']} w="100vw" maxW="1440px">
          {match.letters.map((letter, i) => (
            <Flex flexDirection="column" key={i} >
              <Clipboard
                index={i}
                letter={letter}
                mode={mode}
                historyAttempts={match.historyAttempts[i] ? match.historyAttempts[i] : []}
                isCorrect={match.isCorrect[i]}
                match={match}
                setMatch={setMatch}
                setCurrentLetter={setCurrentLetter}
                nextClipboard={nextClipboard}
                colors={colors}
                sendTry={sendTry}
                currentLetter={currentLetter}
              />
            </Flex>
          ))}
        </Flex>
        <KeyboardWrapper notFoundLetters={notFoundLetters} historyAttempts={match.historyAttempts} sendTry={sendTry} setCurrentLetter={setCurrentLetter} />
      </Box>
    </ChakraProvider>
  )
}
