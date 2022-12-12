import { Flex, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  id: string
  Icon: IconType
  bgColor: string
  changeColor: (target: any) => void
}

export const Color = ({ Icon, bgColor, id, changeColor }: Props) => {
  return (
    <FormLabel w='fit-content' maxH='30px' margin='0' htmlFor={id}>
      <Flex
        bgColor={bgColor}
        border='1px'
        borderColor="gray.600"
        borderRadius="5px"
        w="30px"
        h="30px"
        justifyContent="center"
        alignItems="center"
      >
        <Icon />
      </Flex>
      <Input
        onChange={changeColor}
        top='-30px'
        w="30px"
        h="30px"
        p='0'
        opacity='0'
        id={id}
        type="color"
        position='relative' />
    </FormLabel>
  )
}
