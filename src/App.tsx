import React, { useEffect, useRef, useState } from "react"
import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Button,
  useToast,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Progress,
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
  const [index, setIndex] = useState(0);

  const toast = useToast();

  const nextClipboard = () => {
    setMatch((old) => ({ ...old, currentClipboard: old.currentClipboard + 1 }))
  }

  const resetGame = () => {
    window.location.reload()
  }

  const setFocus = (index = 0) => {
    if (mode) {
      (main.current?.children[match.currentClipboard].children[match.chance + 1].children[index] as HTMLInputElement)?.focus();
    } else {
      const elements = [...(main.current?.children as any)]
      const indexElements = match.isCorrect.findIndex(e => !e);
      (elements[indexElements].children[match.chance + 1].children[index] as HTMLInputElement)?.focus();
    }
  }

  const sendTry = () => {

    if (!findInDb(currentLetter.join(''))) {
      toast({
        status: "info",
        duration: 2000,
        title: "Palavra invalida 😒",
        position: 'top'
      })
      return
    }
    setIndex(0)
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

    if (mode && t[match.currentClipboard]?.every(e => e.position) && match.currentClipboard !== 3) {
      nextClipboard()
    }

    if (isCorrect.every(e => e) || match.chance + 1 === match.maxChance) setIsWin(match.chance + 1 !== match.maxChance)

    setCurrentLetter(['', '', '', '', '']);
    setNotFoundLetters(getNotFoundLetters(hAttempts))
  }

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

  const onClick = ({ target }: any) => {
    if (target.type !== "text" && !match.isCorrect.every(e => e)) setFocus(index)
  }

  const closeModalEndGame = () => {
    setIsWin(false)
    onClose()
  }

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" overflowX="hidden" textAlign="center" fontSize="xl" onClick={onClick}>
        <Header
          setNotFoundLetters={setNotFoundLetters}
          setMatch={setMatch}
          onChange={setDificult}
          changeMode={setMode}
          mode={mode}
          changeColor={setColors}
          colors={colors}
          setCurrentLetter={setCurrentLetter}
          setFocus={setFocus}
        />
        <EndGame resetGame={resetGame} colors={colors} isOpen={isOpen} onClose={closeModalEndGame} isWin={isWin} match={match} />
        <Flex justifyContent='space-evenly' wrap="wrap" ref={main} alignItems="center" gap="20px" margin="0 auto" marginTop={['25px', '40px']} w="100vw" maxW="1440px">
          {match.letters.map((letter, i) => (
            <Flex flexDirection="column" key={i}>
              <Clipboard
                focus={index}
                setFocus={setIndex}
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
        <KeyboardWrapper focus={index} setFocus={setIndex} notFoundLetters={notFoundLetters} historyAttempts={match.historyAttempts} sendTry={sendTry} setCurrentLetter={setCurrentLetter} />
      </Box>
    </ChakraProvider>
  )
}
