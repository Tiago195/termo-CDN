import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import { getStorage } from '../utils'

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        _checked={{
          borderColor: 'teal.600',
          borderBottomWidth: '2px'
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

type Props = {
  onChange: (str: string) => void
}

export const OptionsDificult = ({ onChange }: Props) => {
  const options = ['Solo', 'Dueto', 'Quarteto']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: getStorage('config').dificult,
    onChange
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
