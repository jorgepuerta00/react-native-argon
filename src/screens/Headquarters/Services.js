import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";

//galio
import { Block, theme } from "galio-framework";

//argon
import { Card } from "../../components/";

// Internationalization
import i18n from '../../locales/i18n';

const { width } = Dimensions.get("screen");
const cardWidth = width - theme.SIZES.BASE * 2;

const ITEMS = [
  {
    data: [{
            title: i18n.t('services.serviceOne'),
            image: "http://www.lasplash.com/uploads//369f/4f5053c92d15e-spring-forward-with-glowing-skin-thanks-to-dr.-murad-murad-spa-all-inclusive-health-canter-medical-group-shows-you-how-to-become-healthy-happy-and-gorgeous-and-stay-that-way-1.jpg",
            cta: i18n.t('services.available'), 
            horizontal: true,
          },
          {
            title: i18n.t('services.serviceTwo'),
            image: "http://www.norbertopeluqueria.com/img/0240/083.jpg",
            cta: i18n.t('services.available'),
            horizontal: true,
          }]
  },
  {
    data: [{    
      title: i18n.t('services.serviceThree'),
            image: "https://culturaempleo.com/wp-content/uploads/2018/09/consultorio-odontologico.jpg",
            cta: i18n.t('services.available'),
            horizontal: true, 
          },
          {
            title: i18n.t('services.serviceFour'),
            image: "https://www.naturalhealers.com/wp-content/uploads/2016/10/massage-therapy-tuition.jpg",
            cta: i18n.t('services.available'),
            horizontal: true,      
          }]
  },
  {
    data: [{
            title: i18n.t('services.serviceFive'),
            image: "http://riamichelle.com/wp-content/uploads/Miami-Fashion-Blogger-Inkkas-Laundromat.jpg",
            cta: i18n.t('services.available'),
            horizontal: true,      
          },
          {
            title: i18n.t('services.serviceSix'),
            image: "https://www.hthproject.com//upload/DI/LG/6/DIListing-15286-Photo1.jpg",
            cta: i18n.t('services.available'),
            horizontal: true,      
          }]
  }
];

class Services extends React.Component {
  renderService = (item, index) => {
    return (
      <Block flex row key={`service-${index}`}>
        <Card strong={false} item={item.data[0]} style={{ marginRight: theme.SIZES.BASE }}/>
        <Card strong={false} item={item.data[1]} />
      </Block> 
    );
  };

  renderCards = () => {
    return (
      <Block flex style={styles.group}>        
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            { ITEMS && ITEMS.map((item, index) => this.renderService(item, index) )}
          </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView style={styles.screenSize} showsVerticalScrollIndicator={false}>                              
            {this.renderCards()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    paddingTop: theme.SIZES.BASE
  },
  screenSize: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3
  },
});

export default Services;
