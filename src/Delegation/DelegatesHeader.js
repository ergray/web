import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import BackIcon from 'react-icons/lib/md/chevron-left'
import logo from '../logo.png'

function DelegatesHeader(props) {
  const { delegates, delegatesEditMode, dispatch } = props
  const showEditButton = delegates && delegates.length > 0

  return (
    <View style={{
      backgroundColor: '#000',
      borderBottomWidth: 1,
      borderColor: '#222',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
    >
      <TouchableOpacity
        style={{ flex: 1, height: 53, justifyContent: 'center', minWidth: 50, paddingLeft: 15 }}
        onPress={() => { props.history.goBack() }}
      >
        <BackIcon color="white" size={30} />
      </TouchableOpacity>

      <View
        style={{ alignItems: 'center', flex: 10, flexDirection: 'row', justifyContent: 'center' }}
      >
        <Image
          source={logo}
          style={{
            height: 24,
            marginRight: 7,
            width: 24,
          }}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 19,
            fontWeight: '700',
          }}
        >DELEGATES</Text>
        <View style={{ width: 31 }} />
      </View>

      <View style={{ justifyContent: 'center' }}>
        { !showEditButton ? (
          <View style={{ width: 60 }} />
        ) : (
          <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_DELEGATES_EDIT_MODE' })}>
            <Text style={{
              color: '#05A5D1',
              fontSize: 16,
              fontWeight: '200',
              paddingRight: 20,
              textAlign: 'right',
              width: 50,
            }}
            >
              { !delegatesEditMode ? 'Edit' : 'Done' }
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

DelegatesHeader.propTypes = {
  delegates: React.PropTypes.arrayOf(React.PropTypes.shape()),
  delegatesEditMode: React.PropTypes.bool,
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({ // eslint-disable-line
    goBack: React.PropTypes.func.isRequired,
  }),
}

const mapStateToProps = state => ({
  delegates: state.delegates,
  delegatesEditMode: state.delegatesEditMode,
})

export default connect(mapStateToProps)(DelegatesHeader)
