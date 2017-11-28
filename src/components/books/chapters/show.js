import React, {Component} from 'react'
import {WebView, StyleSheet, View, Text, ListView} from 'react-native'

class BookChapterShow extends Component {
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
            content: "",
            book: {
                id: params.book.id,
                title: params.book.title
            },
            token: ""
        };
    };

    componentDidMount() {
        fetch("http://47.91.157.26/api/v1/books/"+this.state.book.id+"/chapters/"+ this.state.id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    book: responseJson.data.book,
                    content: responseJson.data.book_chapter.content
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };


    render () {
        return (
            <WebView
                source={{html: this.state.content}}/>
        )
    }
}

export default BookChapterShow