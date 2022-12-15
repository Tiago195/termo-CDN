import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IColor } from '../interfaces/IColor'
import { IMatch } from '../interfaces/IMatch'
import { defaultMatch, setStorage } from '../utils'
import { DrawerDificult } from './DrawerDificult'
import { Instruction } from './Instruction'
import { OptionsDificult } from './OptionsDificult'
import { Settings } from './Settings'

type Props = {
  onChange: React.Dispatch<React.SetStateAction<string>>
  changeMode: React.Dispatch<React.SetStateAction<boolean>>
  mode: boolean
  changeColor: React.Dispatch<React.SetStateAction<IColor>>
  setCurrentLetter: React.Dispatch<React.SetStateAction<string[]>>
  setMatch: (value: React.SetStateAction<IMatch>) => void
  colors: IColor
  endGame: boolean
}

export const Header = ({ setMatch, onChange, changeMode, changeColor, mode, colors, setCurrentLetter, endGame }: Props) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const ChangeDificult = (str: string) => {
    // setCurrentLetter('')
    setMatch(defaultMatch(str as 'Solo' | 'Dueto' | 'Quarteto'))
    setStorage('config', 'dificult', str)
    onChange(str)
    setCurrentLetter(['', '', '', '', ''])
    onClose()
    // window.location.reload()
  }

  return (
    <Flex flexDirection="column" marginTop="10px">
      <Flex h={isOpen ? '50px' : "0px"} transition={'all .4s'} justifyContent="space-between" overflow="hidden" alignItems="center" p="0 10px">
        <Flex gap="10px" fontWeight="medium" letterSpacing="1px">
          <OptionsDificult onChange={ChangeDificult} />
        </Flex>
        <Box>
          <AiOutlineInfoCircle />
        </Box>
      </Flex>

      <Flex justifyContent="space-evenly">
        <Flex gap="5px">
          <DrawerDificult isOpen={isOpen} onToggle={onToggle} />
          <Instruction />
        </Flex>
        <Box>
          <Text >Coisa de nerde</Text>
        </Box>
        <Box>
          <Settings changeMode={changeMode} mode={mode} changeColor={changeColor} colors={colors} />
        </Box>
      </Flex>
    </Flex>
  )
}
