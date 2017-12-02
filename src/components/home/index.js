import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Text, Platform, Alert} from 'react-native'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {StackNavigator, TabNavigator} from 'react-navigation';
import {parse_params} from '../../helpers/utils'


class HomeIndex extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '首页'
        }
       
    };

    constructor(props) {
        super(props);
        this.state = {
            id: "home_index",
            books: [],
            token: "",
            page: 1,
            per_page: 10,
            total_page: 0,
            refreshState: RefreshState.Idle
        };

        this._loadMore = this._loadMore.bind(this);
    }

    componentWillMount(){

    }

    componentDidMount() {
        this.fetch_data({})
    }

    _onPressButton(id, title){
        const { navigate } = this.props.navigation;
        navigate("books/show", {id: id, title: title})
    }


    onHeaderRefresh = () => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing,
            books: [],
            page: 1
        })
        this.fetch_data({})
    }


    _loadMore = () => {
        if(this.state.total_page == 0) {
            return null;
        }

        var page = parseInt(this.state.page);
        var total_page = this.state.total_page;
        console.log("total_page " + total_page + ' page'+ page);
        if(page <= total_page){
            this.setState({refreshState: RefreshState.FooterRefreshing})

            page = page + 1;
            this.fetch_data({
                page: page,
                per_page: this.state.per_page
            });
        }else{
            this.setState({refreshState: RefreshState.NoMoreData})
        }
    };

    keyExtractor = (item: any, index: number) => {
        return index
    };

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.books}
                    renderItem={this._renderRow.bind(this)}
                    keyExtractor={this.keyExtractor}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this._loadMore}
                    enableEmptySections={true}
                    onEndReachedThreshold={0.1}
                    // 可选
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />
            </View>
        )
    }

    _renderRow(rowData){
        var item = rowData.item;
        return (
            <TouchableOpacity
                id={rowData.key}
                activeOpacity={0.5}
                onPress={()=>{this._onPressButton(item.id, item.title)}} >

                <View style={styles.row} id={item.id}>
                    <Text style={styles.book_title} >
                        {"[" + item.classification_name + "] " + item.title}
                    </Text>
                    <Text style={styles.book_author} >
                        {
                            "作者：" + item.author.name +
                            " 收藏量：" + item.collection_count +
                            " 点击量：" + item.click_count
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    fetch_data(query){
        var _that = this;
        fetch("http://47.91.157.26/api/v1/home" + parse_params(query))
        // fetch("http://magicbooks.cn/api/v1/home")
            .then((response) => response.json())
            .then((responseJson) => {
                var total_page = Math.floor(responseJson.data.total_count / responseJson.data.per_page) + 1;

                this.setState({
                    books : this.state.books.concat(responseJson.data.books),
                    total_page: total_page,
                    per_page: responseJson.data.per_page,
                    page: responseJson.data.page,
                    refreshState: RefreshState.Idle
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
        // flex: 1,
        // flexDirection: 'row'
    },
    book_title: {
        padding: 5,
        fontWeight: "bold"
    },
    book_author: {
        padding: 5,
        flex: 1,
        fontSize: 12
    },
    book_introduction: {
        padding: 5,
        fontSize: 11
    },

    thumb: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        // marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
});


export default HomeIndex