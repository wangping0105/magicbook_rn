import React, {Component} from 'react'
import {View, Text, Image, TextInput, StyleSheet, Button} from 'react-native'
import {connect} from 'react-redux'
import {login} from '../../actions/login'
import Icon from 'react-native-vector-icons/Ionicons'

class LoginView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    login () {
        this.props.dispatch(login(this.state.username, this.state.password))
    }

    render () {
        return (
            <View>
                <View style={styles.image_container}>
                    {/*<Image*/}
                        {/*source={require('../../assets/images/app-icon.png')}*/}
                        {/*style={{height: 100, width: 100}}*/}
                    {/*/>*/}
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.1}} />
                    <View style={[styles.text_input_container,{flex: 1, flexDirection: 'row'}]}>
                        <Icon size={26} style={{padding: 5}} name={'ios-contact-outline'} />
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{padding: 0, flex: 1}}
                            placeholder={'Username'}
                            onChangeText={(txt) => this.setState({username: txt})}
                        />
                    </View>
                    <View style={{flex: 0.1}} />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 20}}>
                    <View style={{flex: 0.1}} />
                    <View style={[styles.text_input_container,{flex: 1, flexDirection: 'row'}]}>
                        <Icon size={26} style={{padding: 5}} name={'ios-lock-outline'} />
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{padding: 0, flex: 1}}
                            placeholder={'Password'}
                            //密文
                            secureTextEntry={true}
                            onChangeText={(txt) => this.setState({password: txt})}
                        />
                    </View>
                    <View style={{flex: 0.1}} />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 40}}>
                    <View style={{flex: 0.1}} />
                    <View style={{flex: 0.8}}>
                        <Button
                            title={'登录'}
                            onPress={() => {this.login()}}
                            disabled={this.props.current_user.attrs.status != null}
                        />
                    </View>
                    <View style={{flex: 0.1}} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image_container: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text_input_container: {
        flex: 0.8,
        justifyContent: 'flex-end',
        borderBottomWidth: 0.5,
        paddingTop: 30
    }
});

const mapStateToProps = (state) => {
    return {
        ...state,
        current_user: state.current_user
    }
}

export default connect(mapStateToProps)(LoginView)