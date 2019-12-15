import React from "react";
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Images from "../../constants/Images";

// Internationalization
import i18n from '../../locales/i18n';

const { height, width } = Dimensions.get("screen");

class Onboarding extends React.Component {

  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text style={styles.titleText}>
                    {i18n.t('onboarding.title')}
                  </Text>
                </Block>
                <Block>
                  <Text style={styles.titleText}>
                    {i18n.t('onboarding.subtitle')}
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text style={styles.subtitleText}>
                    {i18n.t('onboarding.loading')}
                  </Text>
                </Block>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    color:"white",
    fontSize: 50,
  },
  subtitleText: {
    color:"white",
    fontSize: 16,
  },
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;