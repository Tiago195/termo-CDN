import { Box, Button, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PinInput, PinInputField, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineQuestionCircle, AiOutlineQuestion } from 'react-icons/ai'

export const Instruction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex onClick={onOpen} border="2px" p={0} w="25px" h="25px" borderRadius="5px" justifyContent="center" alignItems="center" cursor="pointer">
        <AiOutlineQuestion fontSize="16px" />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Instruções</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" gap="20px" flexDirection="column" overflow="auto" maxH="70vh" >

            <Text >
              Descubra as palavras certas. Depois de cada
              tentativa, as peças mostram o quão perto você está da solução.
            </Text>
            <Text >
              Descubra a palavra certa em 6 tentativas.
              Depois de cada tentativa, as peças mostram o quão perto você está da solução.
            </Text>
            <HStack>
              <PinInput value='TURMA' >
                <PinInputField readOnly bgColor="green.500" />
                <PinInputField readOnly />
                <PinInputField readOnly />
                <PinInputField readOnly />
                <PinInputField readOnly />
              </PinInput>
            </HStack>

            <Text>
              A letra <PinInput value='T'><PinInputField w='30px' h='30px' readOnly bgColor="green.500" /></PinInput> faz parte da palavra e está na
              posição correta.
            </Text>

            <HStack>
              <PinInput value='VIOLA' >
                <PinInputField readOnly />
                <PinInputField readOnly />
                <PinInputField readOnly bgColor="yellow.500" />
                <PinInputField readOnly />
                <PinInputField readOnly />
              </PinInput>
            </HStack>

            <p>A letra <PinInput value='O'><PinInputField w='30px' h='30px' readOnly bgColor="yellow.500" /></PinInput> faz parte da palavra mas em outra posição.</p>

            <p>As letras que não mudam de cor não fazem parte da palavra.</p>

            <p>Os acentos são preenchidos automaticamente, e não são considerados nas dicas.</p>

            <p>As palavras podem possuir letras repetidas.</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
