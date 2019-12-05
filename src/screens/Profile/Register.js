import React from "react";
import { StyleSheet, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView } from "react-native";
import { Block, Checkbox, Text, Input } from "galio-framework";

import { Button } from "../../components";
import { Images, argonTheme } from "../../constants";

import SocialButtons from '../../components/SocialButtons';

// Internationalization
import i18n from '../../locales/i18n';

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground source={Images.RegisterBackground} style={{ width, height, zIndex: 1 }} >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <SocialButtons dark={true} name={i18n.t('register.signInGoogle')}/>
              </Block>
              <Block flex>
                <Block flex={0.1} middle>
                  <Text style={styles.textSignIn}>
                  {i18n.t('register.signInSubtitle')}
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} >
                      <Input
                        borderless
                        placeholder={i18n.t('register.name')}
                      />
                    </Block>
                    <Block width={width * 0.8} >
                      <Input
                        borderless
                        placeholder={i18n.t('register.email')}
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder={i18n.t('register.password')}
                      />
                      <Input
                        password
                        borderless
                        placeholder={i18n.t('Resetpassword.confirmPassword')}
                      />
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                        {i18n.t('register.passwordStrength')}
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          {i18n.t('register.passwordStrong')}
                        </Text>
                      </Block>
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label={i18n.t('register.agreementText')}
                      />
                      <Button
                        style={{ width: 140 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        {i18n.t('register.privacyPolicy')}
                      </Button>
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={() => navigation.navigate("Profile")}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        {i18n.t('register.createAccount')}
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  textSignIn: {
    backgroundColor: 'transparent',
    color:"#8898AA",
    fontSize: 12,
  },
  inputIcon:{
    width:20,
    height:20,
    marginRight: 12
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: "#F4F5F7",
    borderRadius: 10,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
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

export default Register;
