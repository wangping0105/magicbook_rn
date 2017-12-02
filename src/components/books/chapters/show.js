import React, {Component} from 'react'
import {WebView, TouchableOpacity,  StyleSheet, View, Text, ListView, Button} from 'react-native'
import {BookChaptersShowApi, BookChaptersBookMaskApi} from '../../../config/api'

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

class BookChapterShow extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params;
        const { navigate } = navigation;

        return {
            title: params.book.title,
            headerRight: (
                <Button  title={'首页'} onPress={() => {navigate('main_page')}}/>
            )
        }
    };

    constructor(props) {
        super(props);
        const params = this.props.navigation.state.params;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            id: params.id,
            title: params.title,
            content: "",
            book: {
                id: params.book.id,
                title: params.book.title
            },
            next_chapter: {},
            prev_chapter: {},
            token: ""
        };
    };

    componentDidMount() {
        this.fetch_data(this.state.id)
    };

    fetch_data(chapter_id){
        BookChaptersShowApi(this.state.book.id, chapter_id, {})
            .then((responseJson) => {
                this.setState({
                    book: responseJson.data.book,
                    content: responseJson.data.book_chapter.content,
                    prev_chapter: responseJson.data.prev_chapter,
                    next_chapter: responseJson.data.next_chapter
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render () {
        return (
            <View >
                <View style={{height: (ScreenHeight - 100)}}>
                    <Text style={styles.chapter_title}>{this.state.title}</Text>
                    <WebView source={{html: this.state.content}}/>
                </View>
                <View style={{height: 50}}>
                    <TouchableOpacity style={{height: 50}} activeOpacity={0.5}>
                        <View style={styles.page_view}>
                            <Text style={styles.chapter_page} onPress={()=>{this._onPressButton(this.state.prev_chapter )}}>
                                {'上一章'}
                            </Text>
                            <Text style={styles.chapter_page} onPress={()=>{this.addBookMark(this.state.book.id, this.state.id)}}>
                                {'加书签'}
                            </Text>
                            <Text style={styles.chapter_page} onPress={()=>{this._onPressButton(this.state.next_chapter )}}>
                                {'下一章'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _onPressButton(chapter){
        console.log(chapter);
        if(chapter.id != null){
            this.fetch_data(chapter.id);
            this.setState({
                title: chapter.title
            })
        }
    }

    addBookMark(book_id, id){
        BookChaptersBookMaskApi(book_id, id).then((data) => {
            if (data.code == 0) {
                Toast.show("书签添加成功");
            }
        }).catch((err) => {
            Toast.show('网络错误');
        })
    }
}

export default BookChapterShow

const styles =StyleSheet.create({
    page_view:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    chapter_title: {
        textAlign:'center',
        fontSize: 18,
        backgroundColor: 'white',
        padding: 5,
        fontWeight: 'bold'
    },
    chapter_page: {
        padding: 5,
        textAlign:'center',
        flex: 1
    }
});