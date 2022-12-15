import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import { IColor } from '../interfaces/IColor'
import { IMatch } from '../interfaces/IMatch'
import { findInDb } from '../utils'

type Props = {
  isOpen: boolean
  onClose: () => void
  isWin: boolean
  match: IMatch
  colors: IColor
  resetGame: () => void
}

export const EndGame = ({ resetGame, isOpen, onClose, isWin, match, colors }: Props) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{isWin ? "Ganhou 🎉" : "Perdeu 😪"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text marginBottom="10px">
            Este jogo é totalmente baseado em <a href="https://term.ooo/" style={{ borderBottom: "1px solid white" }}>TERMO</a> e foi desenvolvido apenas para desafiar a nilce.
          </Text>
          <Text>Palavras Corretas: <Text color={colors.success} as="span">{match.letters.map(e => findInDb(e)).join(' - ')}</Text></Text>
          <Text color="gray.400" fontSize="12px">Sim leon, eu não sei se o correto é usar "Este" ou "Esse" (To com você Jã1)</Text>
        </ModalBody>
        <ModalFooter gap="10px">
          <Button bgColor="green.500" _light={{ color: "white" }} _hover={{ bgColor: "green.800" }} onClick={resetGame} >Tentar denovo</Button>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
