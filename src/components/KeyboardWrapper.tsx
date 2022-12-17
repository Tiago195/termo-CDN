import { Box, Flex } from "@chakra-ui/react";
import React, { FunctionComponent, useState, MutableRefObject, ChangeEvent, useRef, useEffect } from "react";
import Keyboard, { KeyboardLayoutObject } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css"
import { IAttempt } from "../interfaces/IAttempt";

type Props = {
  sendTry: () => void
  setCurrentLetter: React.Dispatch<React.SetStateAction<string[]>>
  historyAttempts: IAttempt[][][]
  notFoundLetters: string
  focus: number
  setFocus: React.Dispatch<React.SetStateAction<number>>
}

export const KeyboardWrapper = ({ focus, setFocus, notFoundLetters, sendTry, setCurrentLetter, historyAttempts }: Props) => {

  const keyboard = useRef<any>(null);

  const layout = {
    'default': [
      'q w e r t y u i o p',
      `a s d f g h j k l {bksp}`,
      'z x c v b n m Enter',
    ]
  }

  const onKeyReleased = (key: string) => {
    if (key.length === 1) {
      setCurrentLetter((old) => {
        // const index = old.findIndex(e => e === '')
        const copy = [...old]
        // if (index === -1) copy[copy.length - 1] = key
        copy[focus] = key
        return copy
      })
      setFocus((old) => old < 4 ? old + 1 : old)
    }

    if (key === '{bksp}') {
      setCurrentLetter((old) => {
        const copy = [...old]
        copy[focus] = ''
        return copy
      })
      setFocus((old) => old > 0 ? old - 1 : old)
    }

    if (key === 'Enter') {
      sendTry()
    }
  }


  return (
    <Flex color="black" justifyContent="center" w="100vw" >
      <Box w={['100vw', '100vw', '100vw', '60vw']}>
        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          layout={layout}
          display={{ '{bksp}': '⌫' }}
          onKeyReleased={onKeyReleased}
          buttonTheme={[
            {
              class: "notFound",
              buttons: notFoundLetters
            },
          ]}
        />
      </Box>
    </Flex>
  );
};

export default KeyboardWrapper;
