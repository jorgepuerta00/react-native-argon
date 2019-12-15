import React from 'react';
import { StyleSheet } from "react-native";
import { Text } from "galio-framework";
import argonTheme from "../constants/Theme";
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

// Internationalization
import i18n from '../locales/i18n';

class PasswordStrengthMeter extends React.Component {

  createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return i18n.t('PasswordStrengthMeter.strengthWeak');
      case 1:
        return i18n.t('PasswordStrengthMeter.strengthWeak');
      case 2:
        return i18n.t('PasswordStrengthMeter.strengthFair');
      case 3:
        return i18n.t('PasswordStrengthMeter.strengthGood');
      case 4:
        return i18n.t('PasswordStrengthMeter.strengthStrong');
      default:
        return i18n.t('PasswordStrengthMeter.strengthWeak');
    }
  }

  render() {
    const { password } = this.props;
    const testedResult = zxcvbn(password);
    let customStyle;

    switch (testedResult.score) {
      case 0: customStyle = styles.strengthWeak;
              break;
      case 1: customStyle = styles.strengthWeak;
              break;
      case 2: customStyle = styles.strengthFair;
              break;      
      case 3: customStyle = styles.strengthGood;
              break;
      case 4: customStyle = styles.strengthStrong;
              break;
      default: customStyle = styles.strengthWeak;
    }

    return  <Text bold size={12} style={customStyle}> {this.createPasswordLabel(testedResult)} </Text>
  }
}

PasswordStrengthMeter.propTypes = {
  password: PropTypes.string
}

const styles = StyleSheet.create({
  strengthWeak: {
    color: argonTheme.COLORS.WEAK
  },
  strengthFair: {
    color: argonTheme.COLORS.FAIR
  },
  strengthGood: {
    color: argonTheme.COLORS.GOOD
  },
  strengthStrong: {
    color: argonTheme.COLORS.STRONG
  }
});

export default PasswordStrengthMeter;