import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Text, ListView, FlatList, ActivityIndicator} from 'react-native'
import {PullList} from 'react-native-pullview'
import {BooksShowApi} from '../../config/api'

class BookShow extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params;

        return { title: params.title }
    };

    constructor(props) {
        super(props);
        const params = this.props.navigation.state.params;

        this.state = {
            id: params.id,
            title: params.title,
            book: {
                introduction: ""
            },
            chapters: [],
            loading: false,
            token: "",
            page: 1,
            per_page: 10,
            total_page: 0
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
    };

    componentDidMount() {
        this.fetch_chapter({})
    };

    _onPressButton(id, title){
        const { navigate } = this.props.navigation;
        navigate("books/chapters/show", {id: id, title: title, book: {
            id: this.state.id,
            title: this.state.title
        }})
    }

    keyExtractor = (item: any, index: number) => {
        return index
    };

    render () {
        var data = this.state.chapters
        return (
            <View>
                <FlatList
                    data={data}
                    keyExtractor={this.keyExtractor}
                    ref={(flatList)=>this._flatList = flatList}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderRow}
                    onEndReachedThreshold={0.1}
                    onEndReached={(info)=>{
                        this.loadMore();
                        // console.warn(info.distanceFromEnd);
                    }}
                />
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={{height: 50}}>
                <Text style={{padding: 5, fontSize: 12}} numberOfLines={3}>{"简介：" + this.state.book.introduction.replace("\n", "")}</Text>
            </View>
        );
    }

    renderRow(item){
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{this._onPressButton(item.item.id, item.item.title)}} >

                <View style={styles.row} id={item.item.id}>
                    <Text style={styles.chapter_title} >
                        {" " + item.item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderFooter() {
        if(this.state.loading) {
            return null;
        }
        return (
            <View style={{height: 100}}>
                <ActivityIndicator />
            </View>
        );
    }

    loadMore() {
        if(this.state.total_page == 0) {
            return null;
        }

        var page = parseInt(this.state.page);
        var total_page = this.state.total_page;
        console.log("total_page " + total_page + ' page'+ page)
        if(page <= total_page){
            page = page + 1;
            var query = {
                page: page,
                per_page: this.state.per_page
            }
            if(!this.state.loading){
                this.fetch_chapter(query)
                this.setState({loading: true})
            }
        }else{
            console.log("no more!!!")
        }
    }

    fetch_chapter(query){
        var _that = this;
        BooksShowApi(this.state.id, query).then((responseJson) => {
            var total_page = Math.floor(responseJson.data.total_count / responseJson.data.per_page) + 1;

            _that.setState({
                book: responseJson.data.book,
                chapters : _that.state.chapters.concat(responseJson.data.book_chapters),
                total_page: total_page,
                per_page: responseJson.data.per_page,
                page: responseJson.data.page,
                loading: false
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

}

const styles =StyleSheet.create({
    row: {
        justifyContent: 'center',
        backgroundColor: '#e9f7fd',
        borderStyle: 'solid',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
    },
    book_title: {
        padding: 5,
        fontSize: 18
    },
    chapter_title: {
        padding: 5
    }
});

export default BookShow