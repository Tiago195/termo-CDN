import { Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton, Button, Flex } from '@chakra-ui/react'
import React from 'react'

type Props = {
  isVisible: boolean
  onClose: () => void
}

export const Info = ({ isVisible, onClose }: Props) => {

  return isVisible ? (
    <Alert borderRadius="10px" status='success' w="50%" _dark={{ bgColor: "black" }} _light={{ bgColor: "white" }} display='block' position='absolute' zIndex="2">
      <AlertIcon />
      <Box>
        <AlertTitle>Deu sorte!</AlertTitle>
        <Flex flexDirection="column" gap="20px">
          <AlertDescription>
            Você acertou uma palavra sem ver
          </AlertDescription>
          <Button _light={{ color: 'white' }} bgColor="green.500" _hover={{ bgColor: "green.800" }} onClick={onClose}>Ir para próxima palavra!!</Button>
        </Flex>
      </Box>
    </Alert>
  ) : null
}
