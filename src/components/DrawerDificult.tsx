import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlineInfoCircle } from 'react-icons/ai'

type Props = {
  isOpen: boolean
  onToggle: () => void
}

export const DrawerDificult = ({ isOpen, onToggle }: Props) => {

  return (
    <Flex onClick={onToggle} border="2px" p={0} w="25px" h="25px" borderRadius="5px" justifyContent="center" alignItems="center" cursor="pointer">
      <Box transform={isOpen ? 'rotate(180deg)' : ''} transition={'all .4s'} fontSize="16px">
        <IoIosArrowDown />
      </Box>
    </Flex>
  )
}
