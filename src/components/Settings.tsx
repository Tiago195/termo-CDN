import { Box, Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Switch, Text, useDisclosure } from '@chakra-ui/react'
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import React, { createRef, useEffect, useRef, useState } from 'react'
import { AiFillSetting, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { RiAlarmWarningLine } from 'react-icons/ri'
import { Color } from './Color'
import { IColor } from '../interfaces/IColor'
import { defaultColor, defaultConfig, getStorage, setStorage } from '../utils'
import { IConfig } from '../interfaces/IConfig'

type Props = {
  changeMode: (bool: boolean) => void
  setFocus: (index?: number) => void
  changeColor: React.Dispatch<React.SetStateAction<IColor>>
  mode: boolean
  colors: IColor
  setNotFoundLetters: React.Dispatch<React.SetStateAction<string>>
}

export const Settings = ({ setNotFoundLetters, changeMode, changeColor, setFocus }: Props) => {
  // const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<IConfig>(getStorage('config'));
  const { isOpen, onOpen, onClose } = useDisclosure()

  const nilceMode = ({ target }: any) => {
    setConfig((oldConfig) => ({ ...oldConfig, nilceMode: target.checked }))
  }

  const saveConfigs = () => {
    changeColor(config.colors)
    changeMode(config.nilceMode)
    setStorage('config', 'colors', { ...config.colors })
    setStorage('config', 'nilceMode', config.nilceMode)
    setNotFoundLetters('')
    onClose()
  }

  const resetColor = () => {
    setConfig((oldConfig) => ({ ...oldConfig, colors: defaultColor }))
  }

  const setColor = ({ target }: any) => {
    setConfig((oldConfig) => ({ ...oldConfig, colors: { ...oldConfig.colors, [target.id]: target.value } }))
  }

  const cancel = () => {
    setConfig(getStorage('config'))
    onClose()
  }

  return (
    <>
      <Flex onClick={onOpen} border="2px" p={0} w="25px" h="25px" borderRadius="5px" justifyContent="center" alignItems="center" cursor="pointer">
        <AiFillSetting fontSize="16px" />
      </Flex>

      <Modal isOpen={isOpen} onClose={cancel}>
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
                  <Color changeColor={setColor} Icon={AiOutlineCheck} id='success' bgColor={config.colors.success} />
                  <Color changeColor={setColor} Icon={RiAlarmWarningLine} id='warning' bgColor={config.colors.warning} />
                  <Color changeColor={setColor} Icon={AiOutlineClose} id='default' bgColor={config.colors.default} />
                  <Button variant="outline" colorScheme="blue" onClick={resetColor} h="30px" p="0 5px">Resetar Cores</Button>
                </Flex>
              </Flex>

              <FormControl display='flex' alignItems='center' justifyContent="space-between" >
                <FormLabel htmlFor='mode' mb='0'>
                  Ligar modo Nilce?
                </FormLabel>
                <Switch id='mode' size='lg' isChecked={config.nilceMode} onChange={nilceMode} />
              </FormControl>

              <Button variant="outline" colorScheme="green" onClick={saveConfigs}>Salvar</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
