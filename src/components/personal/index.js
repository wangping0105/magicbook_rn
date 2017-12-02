import React, {Component} from 'react'
import {View, Alert, Text, FlatList, TouchableOpacity, Button, TouchableHighlight, StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import {UsersMyBooksApi} from '../../config/api';
import {logout} from '../../actions/login';

class PersonalIndex extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '个人中心',
            headerRight: (
                <Button  title={'更多'} onPress={() => {
                    Toast.show("敬请期待")
                }}
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

        this._onPressButton = this._onPressButton.bind(this)
        this._toBookShow = this._toBookShow.bind(this)
        this.renderRow = this.renderRow.bind(this)

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

    _onPressButton(id, title, book){
        const { navigate } = this.props.navigation;
        navigate("books/chapters/show", {id: id, title: title, book: book})
    }

    _toBookShow(id, title){
        const { navigate } = this.props.navigation;
        navigate("books/show", {id: id, title: title});
    }

    render () {
        return (
            <View>
                <Text>欢迎你：{this.state.user.name}</Text>
                <Text>我的书籍</Text>

                <FlatList
                    keyExtractor={this.keyExtractor}
                    ref={(flatList)=>this._flatList = flatList}
                    renderItem={this.renderRow}
                    data={this.state.books}
                />
                <Button  title={'退出登录'} onPress={() => {
                    Alert.alert('登出确认', '确定要退出当前账号吗？',[
                        {text: '取消', onPress: () => {}},
                        {text: '确定', onPress: () => {this.props.dispatch(logout())}}
                    ])
                }}
                />
            </View>
        )
    }

    renderRow(data){
        var book_chapter = data.item.book_chapter;
        var newest_chapter = data.item.newest_chapter;
        return (
                <View style={{padding: 10}}>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={()=> { this._toBookShow(data.item.book.id, data.item.book.title)} }>
                        <Text style={styles.book_title}>
                            {data.item.book.title}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5}
                        onPress={()=> { this._onPressButton(book_chapter.id, book_chapter.title, data.item.book)} }>
                        <Text style={styles.chapter}>
                            我的书签：{book_chapter.title}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5}
                        onPress={()=> { this._onPressButton(newest_chapter.id, newest_chapter.title, data.item.book)} }>
                        <Text style={styles.chapter}>
                            最新章节：{newest_chapter.title}
                        </Text>
                    </TouchableOpacity>
                </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        current_user: state.current_user
    }
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'center',
        backgroundColor: '#e9f7fd',
        borderStyle: 'solid',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
    },
    book_title:{
        fontWeight: 'bold'
    },
    chapter: {
        padding: 5
    }

})


export default connect(mapStateToProps)(PersonalIndex);