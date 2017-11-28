import React, {Component} from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'; 
import HomeIndex from '../components/home/index'
import BookShow  from '../components/books/show'
import PersonalIndex from '../components/personal/index'
import BookChapterShow from '../components/books/chapters/show'

const MainPage = TabNavigator({
	    home: {
	        screen: HomeIndex,
	        navigationOptions: {
	            tabBarLabel: '首页',
	            tabBarIcon: ({focused}) => {
	                return(<Icon name={focused ? 'ios-home' : 'ios-home-outline'} />)
	            }
	        }
	    },
	    personal: {
	        screen: PersonalIndex,
	        navigationOptions: {
	            tabBarLabel: '我的',
	            tabBarIcon: ({focused}) => {
	                return(<Icon name={focused ? 'ios-contact' : 'ios-contact-outline'} />)
	            }
	        }
	    }
	}, {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#642100',
            showIcon: true,
            labelStyle: {
                fontSize: 12,
                marginTop: 0,
                marginBottom: 2,
                //paddingTop: 10
            },
            style: {
                marginBottom: 0,
                height: 50
            },
            tabStyle: {
                marginTop: 0
            },
            indicatorStyle: {
                height: 0
            }
        }
    }
)

const Navigation = StackNavigator({
    main_page: {
        screen: MainPage,
    },
    'books/show': {
        screen: BookShow
    },
    'books/chapters/show': {
        screen: BookChapterShow
    }
})

export default Navigation