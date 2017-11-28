import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Text, ListView} from 'react-native'
import {PullList} from 'react-native-pullview'
import Utils from '../../helpers/utils'

class BookShow extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params;

        return { title: params.title }
    };

    constructor(props) {
        super(props);
        const params = this.props.navigation.state.params;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            id: params.id,
            title: params.title,
            chapters: ds.cloneWithRows([]),
            token: "",
            page: 1,
            per_page: 10,
            total_page: 1
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        // this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
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



    render () {
        return (
            <View>
                <PullList
                    style={{}}
                    onPullRelease={this.onPullRelease}
                    topIndicatorRender={this.topIndicatorRender}
                    topIndicatorHeight={60}
                    renderHeader={this.renderHeader}
                    pageSize={5}
                    initialListSize={5}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={60}
                    // renderFooter={this.renderFooter}
                    dataSource={this.state.chapters}
                    renderRow={this.renderRow}
                    enableEmptySections={true}/>

            </View>
        )
    }

    onPullRelease(resolve) {
        //do something
        setTimeout(() => {
            resolve();
        }, 3000);
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: -10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => {this.txtPulling = c;}}>当前PullList状态: pulling...</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>当前PullList状态: pullok......</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>当前PullList状态: pullrelease......</Text>
            </View>
        );
    }

    renderHeader() {
        return (
            <View style={{height: 50, backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>This is header</Text>
            </View>
        );
    }

    renderRow(rowData){
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{this._onPressButton(rowData.id, rowData.title)}} >

                <View style={styles.row} id={rowData.id}>
                    <Text style={styles.chapter_title} >
                        {" " + rowData.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    // renderFooter() {
    //     if(this.state.nomore) {
    //         return null;
    //     }
    //     return (
    //         <View style={{height: 100}}>
    //             <ActivityIndicator />
    //         </View>
    //     );
    // }

    loadMore() {
        var page = this.state.page;
        var total_page = this.state.total_page;
        if(page == total_page){
            page = page + 1;
            var query = {
                page: page,
                per_page: this.state.per_page
            }
            this.fetch_chapter(query)
        }
    }

    fetch_chapter(query){
        Utils.parse_params(query);
        console.log("http://47.91.157.26/api/v1/books/"+ this.state.id + Utils.parse_params(query))
        fetch("http://47.91.157.26/api/v1/books/"+ this.state.id + Utils.parse_params(query))
            .then((response) => response.json())
            .then((responseJson) => {
                var total_page = (responseJson.data.total_count / responseJson.data.perpage) + 1;
                this.setState({
                    book: responseJson.data.book,
                    chapters : this.state.chapters.cloneWithRows(responseJson.data.book_chapters),
                    total_page: total_page,
                    page: responseJson.data.page
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
        marginTop: 10,
        backgroundColor: '#e9f7fd'
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