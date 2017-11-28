import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Text, ListView, Alert} from 'react-native'
import {StackNavigator, TabNavigator} from 'react-navigation';


class HomeIndex extends Component {
    static login_url = "http://magicbooks.cn" + "/api/v1/auth/login";
    static navigationOptions = ({ navigation }) => {
        return {
            title: '首页'
        }
       
    }

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            id: "home_index",
            books: ds.cloneWithRows([]),
            token: "",
        };
    }

    componentWillMount(){

    }

    componentDidMount() {
        // fetch(login_url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: 'phone=15921076830&password=111111'
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.state.token = responseJson.data.user_token;
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        console.log(11111111);
        fetch("http://47.91.157.26/api/v1/home")
        // fetch("http://magicbooks.cn/api/v1/home")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                books : this.state.books.cloneWithRows(responseJson.data.books)
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    _onPressButton(id, title){
        const { navigate } = this.props.navigation;
        navigate("books/show", {id: id, title: title})
    }

    _renderRow(rowData){
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{this._onPressButton(rowData.id, rowData.title)}} >

                <View style={styles.row} id={rowData.id}>
                    <Text style={styles.book_title} >
                        {"【" + rowData.title + "】"}
                    </Text>

                    <Text style={styles.book_introduction}>{rowData.introduction}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render () {
        return (
            <View>
                <ListView
                    dataSource={this.state.books}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}/>
            </View>
        )
    }

}

const styles =StyleSheet.create({
    row: {
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#e9f7fd'

    },
    book_title: {
        padding: 5
    },

    book_introduction: {
        padding: 5,
        fontSize: 11
    },

    thumb: {
        width: 50,
        height: 50,
    },
});


export default HomeIndex