import { Platform, SafeAreaView as SafeAreaViewRN } from 'react-native'

export const SafeAreaView = ({ children }) => {
  return Platform.OS !== 'ios'
    ? children
    : (
        <SafeAreaViewRN style={{ flexGrow: 1 }} >
          children
        </SafeAreaViewRN>
      )
}