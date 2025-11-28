import React, { useRef, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Fonts } from '../constants/Fonts'

const numberToNice = [...Array(10).keys()]
const STAGGER_DELAY = 50 // ms delay per digit

function DigitColumn({ number, fontSize, index, color }) {
  const listRef = useRef(null)
  const lineHeight = fontSize * 1.25

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToOffset({
          offset: number * lineHeight,
          animated: true,
        })
      }
    }, index * STAGGER_DELAY)

    return () => clearTimeout(timeout)
  }, [number])

  return (
    <View
      style={{
        height: lineHeight,
        overflow: 'hidden',
        justifyContent: 'center',
      }}
    >
      <FlatList
        ref={listRef}
        data={numberToNice}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              height: lineHeight,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize,
                lineHeight,
                fontFamily: Fonts.medium,
                textAlign: 'center',
                fontVariant: ['tabular-nums'],
                color, // pakai props color
              }}
            >
              {item}
            </Text>
          </View>
        )}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: lineHeight,
          offset: lineHeight * index,
          index,
        })}
      />
    </View>
  )
}

export default function NumberAnimation({ value = 0, fontSize = 0, prefix = '', color = '#000' }) {
  const strValue = typeof value === 'number' ? value.toLocaleString('id') : value.toString()
  const chars = (prefix + strValue).split('')

  return (
    <View style={{ flexDirection: 'row' }}>
      {chars.map((char, idx) => {
        if (/\d/.test(char)) {
          return (
            <DigitColumn
              key={idx}
              number={parseInt(char)}
              fontSize={fontSize}
              index={idx}
              color={color}
            />
          )
        } else {
          return (
            <Text
              key={idx}
              style={{
                fontSize,
                lineHeight: fontSize * 1.25,
                fontFamily: Fonts.medium,
                color, // pakai props color juga
              }}
            >
              {char}
            </Text>
          )
        }
      })}
    </View>
  )
}
