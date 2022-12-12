import { Box, Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Switch, Text, useDisclosure } from '@chakra-ui/react'
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import React from 'react'
import { AiFillSetting, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { RiAlarmWarningLine } from 'react-icons/ri'
import { Color } from './Color'
import { IColor } from '../interfaces/IColor'
import { defaultColor, setStorage } from '../utils'
import { IConfig } from '../interfaces/IConfig'

type Props = {
  changeMode: React.Dispatch<React.SetStateAction<boolean>>
  changeColor: React.Dispatch<React.SetStateAction<IColor>>
  mode: boolean
  colors: IColor
}

export const Settings = ({ changeMode, changeColor, mode, colors }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const setColor = ({ target }: any) => {
    changeColor((old) => ({ ...old, [target.id]: target.value }))
    setStorage('config', 'colors', { ...colors, [target.id]: target.value })
  }

  const nilceMode = ({ target }: any) => {
    setStorage('config', 'nilceMode', target.checked)
    changeMode(target.checked)
  }

  return (
    <>
      <Flex onClick={onOpen} border="2px" p={0} w="25px" h="25px" borderRadius="5px" justifyContent="center" alignItems="center" cursor="pointer">
        <AiFillSetting fontSize="16px" />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configuração</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap="20px">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>
                  Modo
                </Text>
                <ColorModeSwitcher />
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Text>Cores</Text>
                </Box>

                <Flex gap="10px" >
                  <Color changeColor={setColor} Icon={AiOutlineCheck} id='success' bgColor={colors.success} />
                  <Color changeColor={setColor} Icon={RiAlarmWarningLine} id='warning' bgColor={colors.warning} />
                  <Color changeColor={setColor} Icon={AiOutlineClose} id='default' bgColor={colors.default} />
                  <Button onClick={() => { changeColor(defaultColor); setStorage('config', 'colors', defaultColor) }} h="30px" p="0 5px">Resetar Cores</Button>
                </Flex>
              </Flex>

              <FormControl display='flex' alignItems='center' justifyContent="space-between" >
                <FormLabel htmlFor='mode' mb='0'>
                  Ligar modo nilce?
                </FormLabel>
                <Switch id='mode' size='lg' isChecked={mode} onChange={nilceMode} />
              </FormControl>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
