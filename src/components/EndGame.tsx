import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, Thead, ModalHeader, ModalOverlay, Table, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { IMatch } from '../interfaces/IMatch'

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  isWin: boolean
  match: IMatch
}

export const EndGame = ({ isOpen, onOpen, onClose, isWin, match }: Props) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{isWin ? "Ganhou 🎉" : "Perdeu 😪"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Text> Palavras: {match.letters.join(' - ')}</Text> */}
          <Text>Tentativas</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
