import React, {Component} from 'react'
import {View, Text} from 'react-native'

class PersonalIndex extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '个人中心'
        }
       
    }
    render () {
        return (
            <View>
                <Text>这里是个人中心</Text>
            </View>
        )
    }
}

export default PersonalIndex