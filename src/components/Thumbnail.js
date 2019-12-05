import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Animated, StyleSheet, Image, Easing } from 'react-native';
import { argonTheme } from "../constants";

export default class Thumbnail extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            animatedPress: new Animated.Value(0.9),
            onClicked: false
        }
        this.handlerOnClick = this.handlerOnClick.bind(this);
    }

    handlerOnClick(item){
        this.setState({
           onClicked: true
        });
        console.log('Pressed: ' + item.name);
      }
    
    animatedIn=()=> {
        Animated.timing(this.state.animatedPress,{
            toValue:1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver:true
        }).start()
    }

    animatedOut=()=> {
        Animated.timing(this.state.animatedPress,{
            toValue: 0.9,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver:true
        }).start()
    }

    renderThumbnail = (item, index) => {    
        return (
            <TouchableOpacity 
                key={index} 
                style={styles.profileImgContainer}
                onPress={()=>this.handlerOnClick(item)}>
                <Image style={styles.thumbnailPress} source={{ uri: item.image }} />
            </TouchableOpacity>
        );
    };
        
    render() {
        const { data } = this.props;
        return (
            <View style={{ height: 100 }}>
                <View style={{ flex: 3 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingStart: 5, paddingEnd: 5 }}>
                        { data && data.map((item, index) => this.renderThumbnail(item, index) )}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileImgContainer: {
        marginLeft: 10,
        height: 80,
        width: 80,
        borderRadius: 40,
        overflow: 'hidden',
    },
    thumbnailPress:  { 
        height: 80,
        width: 80,
        borderRadius: 40,
        borderColor:'#ff99ca', 
        borderWidth:4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowRadius: 8,
        shadowOpacity: 0.5,
        overflow: "hidden",
        shadowOffset: {
            width: 0,
            height: 4
        },
    },
    thumbnail:  { 
        height: 80,
        width: 80,
        borderRadius: 40,
        borderColor:'#ffffff', 
        borderWidth:4
    },
  });