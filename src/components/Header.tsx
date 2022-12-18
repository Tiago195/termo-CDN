import { Box, Button, Flex, Image, Link, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IColor } from '../interfaces/IColor'
import { IMatch } from '../interfaces/IMatch'
import { Logo } from '../Logo'
import { defaultMatch, setStorage } from '../utils'
import { DrawerDificult } from './DrawerDificult'
import { Instruction } from './Instruction'
import { OptionsDificult } from './OptionsDificult'
import { Settings } from './Settings'

type Props = {
  onChange: React.Dispatch<React.SetStateAction<string>>
  changeMode: (bool: boolean) => void
  mode: boolean
  changeColor: React.Dispatch<React.SetStateAction<IColor>>
  setCurrentLetter: React.Dispatch<React.SetStateAction<string[]>>
  setMatch: (value: React.SetStateAction<IMatch>) => void
  setNotFoundLetters: React.Dispatch<React.SetStateAction<string>>
  colors: IColor
  setFocus: (index?: number) => void
}

export const Header = ({ setNotFoundLetters, setMatch, onChange, changeMode, changeColor, mode, colors, setCurrentLetter, setFocus }: Props) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const ChangeDificult = (str: string) => {
    setMatch(defaultMatch(str as 'Solo' | 'Dueto' | 'Quarteto'))
    setStorage('config', 'dificult', str)
    onChange(str)
    setCurrentLetter(['', '', '', '', ''])
    setNotFoundLetters('')
    onClose()
  }

  return (
    <Flex flexDirection="column" marginTop="10px">
      <Flex h={isOpen ? '50px' : "0px"} transition={'all .4s'} justifyContent="space-between" overflow="hidden" alignItems="center" p="0 10px">
        <Flex gap="10px" fontWeight="medium" letterSpacing="1px">
          <OptionsDificult onChange={ChangeDificult} />
        </Flex>
        <Box w="100px">
          <Link isExternal href='https://www.youtube.com/@coisadenerd'>
            <Button p="0 10px" bg="blackAlpha.800">
              <Logo />
            </Button>
          </Link>
        </Box>
      </Flex>

      <Flex justifyContent="space-evenly">
        <Flex gap="5px">
          <DrawerDificult isOpen={isOpen} onToggle={onToggle} />
          <Instruction />
        </Flex>
        <Box>
          <Text >COISA DE NERDE</Text>
        </Box>
        <Box>
          <Settings setNotFoundLetters={setNotFoundLetters} setFocus={setFocus} changeMode={changeMode} mode={mode} changeColor={changeColor} colors={colors} />
        </Box>
      </Flex>
    </Flex>
  )
}
