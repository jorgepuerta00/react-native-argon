import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../../components";
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";

// Internationalization
import i18n from '../../locales/i18n';

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
        <Block flex style={styles.profile}>
          <ImageBackground source={Images.RegisterBackground} style={styles.profileContainer} >
            <ScrollView showsVerticalScrollIndicator={false} style={{ width, marginTop: '25%' }}>
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image source={{ uri: navigation.getParam('photoUrl', 'NO-photoUrl') }} style={styles.avatar} />
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {navigation.getParam('name', 'NO-name')}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      
                    </Text>
                  </Block>                  
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,    
    zIndex: 1
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
