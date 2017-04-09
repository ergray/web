import React from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import BlogIcon from 'react-icons/lib/fa/rss-square'

function AboutScreen() {
  const textStyle = {
    color: '#fff',
    fontSize: 22,
    fontWeight: '200',
    marginBottom: 20,
    marginHorizontal: 30,
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 1, marginTop: 10 }}>
        <Text style={textStyle}>
          Liquid democracy blends representative and direct democracy to empower our most
          trustworthy leaders.
        </Text>

        <Text style={textStyle}>
          To unlock true choice and accountability.
        </Text>

        <Text style={textStyle}>
          And to transform our politics and our society.
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          alignItems: 'center',
          borderColor: '#344184',
          borderRadius: 30,
          borderWidth: 4,
          height: 58,
          justifyContent: 'center',
          marginBottom: 20,
          marginHorizontal: 30,
        }}
        onPress={() => {
          Linking.openURL('https://blog.liquid.vote')
          .catch(() => {})
        }}
      >
        <Text style={{ color: '#fff', fontFamily: 'HelveticaNeue', fontSize: 16, fontWeight: '500' }}>
          <BlogIcon color="white" size={18} />
          &nbsp; BLOG
        </Text>
      </TouchableOpacity>
    </View>
  )
}

AboutScreen.title = 'ABOUT'

export default AboutScreen
