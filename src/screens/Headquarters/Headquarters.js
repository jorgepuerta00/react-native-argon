import React from "react";
import { ScrollView, StyleSheet, TouchableWithoutFeedback, ImageBackground, Dimensions } from "react-native";

//galio
import { Block, Text, theme } from "galio-framework";

const { width } = Dimensions.get("screen");

const categories = [
  {
    title: "CC Nuevo Centro",
    image:
      "https://www.lovevalencia.com/wp-content/uploads/2012/01/Nuevo-centro2.jpg",
  },
  {
    title: "CC Plaza Rio",
    image:
      "http://www.grupo-sanjose.com/data/foto/med_1525964561_196553482.jpg",
  },
  {
    title: "CC Plaza de la Estación",
    image:
      "https://www.verpueblos.com/fotos_originales/0/4/1/00945041.jpg",
  },
  {
    title: "CC Viva Envigado",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/15/16/d8/a5/viva-envigado.jpg",
  },
  {
    title: "Liverpool",
    image:
      "https://realestatemarket.com.mx/images/2015/OCTUBRE/2710/2710g-liverpool-presenta-buenos-resultados-en-3t2015.jpg",
  }
];

class Headquarters extends React.Component {
  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => navigation.navigate("Services", { product: item })}>
        <Block flex card shadow style={styles.category}>
          <ImageBackground
            source={{ uri: item.image }}
            style={[styles.imageBlock, { width: width - theme.SIZES.BASE * 2, height: 252 } ]}
            imageStyle={{ width: width - theme.SIZES.BASE * 2, height: 252 }}>
            <Block style={styles.categoryTitle}>
              <Text size={18} bold color={theme.COLORS.WHITE}>{item.title}</Text>
            </Block>
          </ImageBackground>
        </Block> 
      </TouchableWithoutFeedback>
    );
  };

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>               
            <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
              { categories && categories.map((item, index) => this.renderProduct(item, index) )}
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false}>
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
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
});

export default Headquarters;
