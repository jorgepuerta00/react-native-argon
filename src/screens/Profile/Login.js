import React, {useState} from "react";
import { KeyboardAvoidingView, ImageBackground, Image, StyleSheet, StatusBar, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Block, Text, Input } from "galio-framework";
import * as Google from 'expo-google-app-auth';
import firebase from "firebase";
import { Button } from "../../components";
import { Images, argonTheme } from "../../constants";
import SocialButtons from '../../components/SocialButtons';
import { validateEmail } from '../../utils/validation';
import UserLogged from "../Profile/Profile"

// Internationalization
import i18n from '../../locales/i18n';

const { height, width } = Dimensions.get("screen");

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }

  login = async (email, password) => {
    if(!email || !password){
      console.log("Please, you must fill in the required fields");      
    }else{
      if(!validateEmail(email)){
        console.log("fail mail");
      }
      else{
        await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(()=>{
          console.log("Logged User...");
        })
        .catch(()=>{
          console.log("Error login account, try Google sync");
        })
      }
    }
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "295615939189-fslepo9g5675kurcaqfnvbg5mec6mgdm.apps.googleusercontent.com",
        iosClientId: 
          "295615939189-fd9uckf7nvjb8v1lpeer0kekqpbjfmef.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex middle>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />          
        ) : (
          <LoginPage navigation={navigation} signIn={this.signIn} login={this.login} />
        )}        
      </Block>
    );
  }
}

const LoginPage = props => {  
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  return (
    <ImageBackground source={Images.RegisterBackground} style={{ width, height, zIndex: 1 }} >
      <StatusBar hidden />
      <Block flex middle>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />          
        </Block>
        <Block style={styles.registerContainer}>
          <Block flex={0.4} middle>
            <SocialButtons 
              dark={false} 
              name={i18n.t('login.signInGoogle')}
              onPress={() => props.signIn()}/>
          </Block>
          <Block flex>
            <Block flex={0.17} middle>
              <Text style={styles.textSignIn}>
              {i18n.t('login.signInSubtitle')}
              </Text>
            </Block>
            <Block flex center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                  <Input
                    borderless
                    placeholder={i18n.t('login.email')}
                    onChange={e => setEmail(e.nativeEvent.text)} 
                  />
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    password
                    borderless
                    placeholder={i18n.t('login.password')}
                    onChange={e => setPassword(e.nativeEvent.text)} 
                  />
                </Block>
                <Block middle>
                  <Button color="primary" style={styles.createButton} onPress={() => props.login(email, password)}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                    {i18n.t('login.login')}
                    </Text>
                  </Button>
                </Block>
                <Block style={styles.containerSignUp}>
                  <Text style={styles.text} onPress={() => props.navigation.navigate("Register")}>
                    {i18n.t('login.createAccount')}
                  </Text>
                  <Text style={styles.text} onPress={() => props.navigation.navigate("ForgotPassword")}>
                    {i18n.t('login.forgotPassword')}
                  </Text>
                </Block>
              </KeyboardAvoidingView>
            </Block>
          </Block>
        </Block>
      </Block>
    </ImageBackground>
  )
}

const LoggedInPage = props => {
  return (
    <UserLogged name={props.name} photoUrl={props.photoUrl} />
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-20%'
  },
  containerSignUp: {  
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: "white",
    fontSize: 14
  },
  textSignIn: {
    backgroundColor: 'transparent',
    color:"white",
    fontSize: 12,
  },
  inputIcon:{
    width:20,
    height:20,
    marginRight: 12
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.6,
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default withNavigation(Login);