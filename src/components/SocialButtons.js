import React from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Block, Button, theme, Text } from 'galio-framework';
import { Images, argonTheme } from "../constants";

class SocialButtons extends React.Component {
  render() {
    const { name, dark, onPress } = this.props;
    return (
      <Block style={[styles.content, { marginTop: theme.SIZES.BASE }]}>
        <TouchableOpacity onPress={() => onPress()} flex style={[styles.contentButton, styles.socialButtons, (dark)?styles.dark:styles.light]}>
          <Block row>
              <Block style={styles.imageSquare}>
                <Image style={styles.inputIcon} source={Images.GoogleLogo}/>
              </Block>                  
              <Block style={styles.contentText}>
                <Text style={[styles.textButton, (dark)?styles.textButtonDark:styles.textButtonLight]}>{name}</Text>
              </Block>
          </Block>
        </TouchableOpacity>
      </Block> 
    );
  }
}

SocialButtons.propTypes = {
  name: PropTypes.string.isRequired,
  dark: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  content:{
    alignContent: 'space-between',
    alignItems: 'flex-start'
  },
  contentButton:{
    alignContent: 'space-between',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  imageSquare:{
    width: 35, 
    height: 35,
    backgroundColor: "#fff",
    marginLeft: 3,
    justifyContent: 'center',
    alignItems: "center"
  },
  contentText:{
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: "center"
  },
  textButton:{
    backgroundColor: 'transparent',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textButtonLight: {
    color: '#96989b',
  },
  textButtonDark: {   
    color: '#fff',    
  },
  inputIcon:{
    width:18,
    height:18,
    backgroundColor: "#fff",
  },
  socialButtons: {
    width: 200,
    height: 40,    
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },    
  light:{
    backgroundColor: "#fff",
  },
  dark:{
    backgroundColor: "#4285F4"
  }
});

export default SocialButtons;