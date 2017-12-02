import React, {Component} from 'react'
import {View,Alert, Text, FlatList, TouchableOpacity, Button, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux';
import {UsersMyBooksApi} from '../../config/api';
import {logout} from '../../actions/login';

class PersonalIndex extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '个人中心',
            headerRight: (
                <Button  title={'hello'} onPress={()=>{ }}
                />
            )
        }
       
    }


    constructor(props) {
        super(props);

        console.log(222)
        console.log(this.props.current_user)
        this.state= {
            user: this.props.current_user.attrs,
            books: []
        }

    }

    componentDidMount(){
        UsersMyBooksApi().then((data)=>{
            console.log(data)
            this.setState({
                books: data.data
            })
        })
    }

    keyExtractor = (item: any, index: number) => {
        return index
    };

    render () {
        return (
            <View>
                <Text>欢迎你：{this.state.user.name}</Text>

                <FlatList
                    keyExtractor={this.keyExtractor}
                    ref={(flatList)=>this._flatList = flatList}
                    renderItem={this.renderRow}
                    data={this.state.books}
                />
                <TouchableHighlight
                    style={{ backgroundColor: 'blue' }}
                    onPress={() => {
                        Alert.alert('登出确认', '确定要退出当前账号吗？',[
                            {text: '取消', onPress: () => {}},
                            {text: '确定', onPress: () => {this.props.dispatch(logout())}}
                        ])
                    }
                    }
                >
                    <Text>退出登录</Text>
                </TouchableHighlight>
            </View>
        )
    }
    renderRow(item){
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{this._onPressButton(item.item.id, item.item.title)}} >

                <View id={item.item.id}>
                    <Text >
                        {" " + item.item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onPressButton(){

    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        current_user: state.current_user
    }
}


export default connect(mapStateToProps)(PersonalIndex);