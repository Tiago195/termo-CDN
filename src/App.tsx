import React, { useEffect, useState } from "react"
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
import { defaultColor, defaultCurrentAttempt, defaultMatch, findInDb, getStorage, validLetter } from "./utils";
import { Clipboard } from "./components/Clipboard";
import { ICurrentAttempt } from "./interfaces/ICurrentAttempt";
import { IAttempt } from "./interfaces/IAttempt";
import { Header } from "./components/Header";
import './index.css'
import { IColor } from "./interfaces/IColor";
import { EndGame } from "./components/EndGame";

export const App = () => {
  const storage = getStorage('config')
  const [dificult, setDificult] = React.useState<string>(storage.dificult)
  const [match, setMatch] = useState<IMatch>(defaultMatch(dificult as 'Solo'));
  const [mode, setMode] = useState(storage.nilceMode || false);
  const [colors, setColors] = useState<IColor>(storage.colors || defaultColor);
  const [isWin, setIsWin] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(match.letters);


  const [currentLetter, setCurrentLetter] = useState<string>('');
  const toast = useToast();

  const nextClipboard = () => {
    setMatch((old) => ({ ...old, currentClipboard: old.currentClipboard + 1 }))
  }

  const sendTry = () => {
    if (!findInDb(currentLetter)) {
      toast({
        status: "info",
        duration: 2000,
        title: "Palavra invalida 😒"
      })
      return
    }

    const t = match.letters.map((e, i) => validLetter(e.split(''), currentLetter.split('')))

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
      historyLetters: [...match.historyLetters, currentLetter],
      historyAttempts: hAttempts,
      isCorrect
    }))

    if (!mode && t[match.currentClipboard]?.every(e => e.position)) {
      nextClipboard()
    }

    if (isCorrect.every(e => e) || match.chance + 1 === match.maxChance) setIsWin(match.chance + 1 !== match.maxChance)
  }

  useEffect(() => {
    setMatch(defaultMatch(dificult as 'Solo' | 'Dueto' | 'Quarteto'))
  }, [dificult])

  useEffect(() => {
    setMatch(defaultMatch(dificult as 'Solo' | 'Dueto' | 'Quarteto'))
  }, [mode])

  useEffect(() => {
    if (isWin || match.chance === match.maxChance) {
      onOpen()
      console.log("vc ganhou");
    }

  }, [match.chance])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Header onChange={setDificult} changeMode={setMode} mode={mode} changeColor={setColors} colors={colors} />
        <EndGame isOpen={isOpen} onOpen={onOpen} onClose={onClose} isWin={isWin} match={match} />
        <Flex justifyContent={mode ? 'center' : 'space-evenly'} alignItems="center" marginTop="40px" w="100vw">
          {match.letters.map((letter, i) => (
            <Flex flexDirection="column" key={i} gap="10px">
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
              />
            </Flex>
          ))}
        </Flex>
        <Button onClick={sendTry}>Tentar</Button>
      </Box>
    </ChakraProvider>
  )
}
