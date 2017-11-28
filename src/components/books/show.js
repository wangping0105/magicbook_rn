import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Text, ListView} from 'react-native'

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
    };

    componentDidMount() {
        query = {
            page: this.state.page,
            per_page: this.state.per_page
        }

        fetch("http://47.91.157.26/api/v1/books/"+ this.state.id + "?" + query)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                book: responseJson.data.book,
                chapters : this.state.chapters.cloneWithRows(responseJson.data.book_chapters)
            })
        })
        .catch((error) => {
            console.error(error);
        });
    };

    _onPressButton(id, title){
        const { navigate } = this.props.navigation;
        navigate("books/chapters/show", {id: id, title: title, book: {
            id: this.state.id,
            title: this.state.title
        }})
    }

    _renderRow(rowData){
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

    render () {
        return (
            <View>
                <ListView
                    dataSource={this.state.chapters}
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
        padding: 5,
        fontSize: 18
    },
    chapter_title: {
        padding: 5
    }
});

export default BookShow