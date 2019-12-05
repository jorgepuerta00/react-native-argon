import _ from 'lodash';
import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, LocaleConfig } from 'react-native-calendars';
import Thumbnail from '../../components/Thumbnail';
import { Block } from "galio-framework";
import moment from 'moment';
require("moment/min/locales.min");

// Internationalization
import i18n from '../../locales/i18n';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
  today: 'Hoy'
};

const date = new Date(); 
const dateString = moment(date).format('YYYY-MM-DD');

const people = [
  {
    id: "1",
    name: "Jasmin",
    image: "https://pm1.narvii.com/7267/c4e428397d78ff2f7845ef33dccffbee7189dbd0r1-600-300v2_128.jpg",
  },
  {
    id: "2",
    name: "Jillian",
    image: "https://pm1.narvii.com/6565/75f7a8c2c996465d021505983a8f4bdf97db7240_128.jpg",
  },
  {
    id: "3",
    name: "Fiona",
    image: "https://pm1.narvii.com/7189/0a7614f590e2782a90ad18a488e508028d34a52cr1-812-805v2_128.jpg",
  },
  {
    id: "4",
    name: "Briana",
    image: "https://pbs.twimg.com/profile_images/344513261566776895/4374a7d72ececce16af083fc6ea50d01.jpeg",
  },
  {
    id: "5",
    name: "Lexie",
    image: "https://a.wattpad.com/useravatar/imthanos_420.256.933081.jpg",
  },
  {
    id: "6",
    name: "Rose",
    image: "https://pm1.narvii.com/6846/14df187fd7761a7ddb7597e08b43f10745e0abd6v2_128.jpg",
  },
  {
    id: "7",
    name: "Edith",
    image: "https://a.wattpad.com/useravatar/AkaneTendo531.256.387075.jpg",
  }
];

const ITEMS = [{
  title: dateString, 
  data: [
          {hour: '07:00 am', duration: '', title: i18n.t('appointment.avaible'), avaible:true},
          {hour: '08:00 am', duration: '', title: i18n.t('appointment.avaible'), avaible:true},
          {hour: '09:00 am', duration: '', title: i18n.t('appointment.avaible'), avaible:true}, 
          {hour: '10:00 am', duration: '', title: i18n.t('appointment.avaible'), avaible:true}, 
          {hour: '11:00 am', duration: '', title: i18n.t('appointment.busy'), avaible:false},
          {hour: '12:00 pm', duration: '', title: i18n.t('appointment.busy'), avaible:false}, 
          {hour: '01:00 pm', duration: '', title: i18n.t('appointment.busy'), avaible:false}, 
          {hour: '02:00 pm', duration: '', title: i18n.t('appointment.busy'), avaible:false},
          {hour: '03:00 pm', duration: '', title: i18n.t('appointment.busy'), avaible:false}, 
          {hour: '04:00 pm', duration: '', title: i18n.t('appointment.busy'), avaible:false}, 
          {hour: '05:00 pm', duration: '', title: i18n.t('appointment.avaible'), avaible:true},
          {hour: '06:00 pm', duration: '', title: i18n.t('appointment.avaible'), avaible:true}, 
          {hour: '07:00 pm', duration: '', title: i18n.t('appointment.avaible'), avaible:true}, 
          {hour: '08:00 pm', duration: '', title: i18n.t('appointment.avaible'), avaible:true}, 
          {hour: '09:00 pm', duration: '', title: i18n.t('appointment.avaible'), avaible:true}, 
          {hour: '10:00 pm', duration: '', title: i18n.t('appointment.avaible'), avaible:true}, 
          {hour: '11:00 pm', duration: '', title: i18n.t('appointment.avaible'), avaible:true}
      ]},  
];

export default class Appointment extends Component {

    constructor(props) {
        super(props);
        this.state = {        
            date: '',
        };

        if(i18n.currentLocale() == 'es'){
          LocaleConfig.defaultLocale = i18n.currentLocale();
        }
    }

  componentDidMount() {
      var that = this;
      var today = new Date();
      that.setState({
        date: moment(today).format('YYYY-MM-DD')
      });
  }

  onDateChanged = (date, updateSource) => {
    var that = this;
    var selectedDate = date;
    that.setState({
      date: moment(selectedDate).format('YYYY-MM-DD')
    });

    ITEMS.title = moment(selectedDate).format('YYYY-MM-DD');
  }

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  }  

  itemPressed(item) {

    var confirmAppointment = i18n.t('appointment.confirmAppointment');
    var confirmMessage = i18n.t('appointment.confirmMessage').replace("DATE", moment(this.state.date).locale(i18n.currentLocale()).format('dddd, MMMM D')).replace("TIME", item.hour);
    
    Alert.alert(
      confirmAppointment,
      confirmMessage,
        [          
          {
            text: i18n.t('appointment.cancel'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: i18n.t('appointment.ok'), onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
  }

  renderEmptyItem(item) {
    return (
        <View style={styles.emptyItem}>
            <View>
                <Text style={styles.emptyHourText}>{item.hour}</Text>
            </View>
            <Text style={styles.emptyTitleText}>{item.title}</Text>  
        </View>
    );
  }

  renderItem = ({item}) => {
    
    var currentTime = moment();
    var startTime = moment(this.state.date + " " + item.hour, "YYYY-MM-DD hh:mm a");
    let isBefore = currentTime.isBefore(startTime);

    if(item.title != i18n.t('appointment.busy')){
      if(isBefore){
        item.title = i18n.t('appointment.avaible')
        item.avaible = true;
      }
      else{
        item.title = i18n.t('appointment.unavaible');
        item.avaible = false;
      }
    }
    
    if(item.avaible){      
        return (
            <TouchableOpacity onPress={() => this.itemPressed(item)} style={styles.itemAvaible}>
                <View>
                    <Text style={styles.itemHourText}>{item.hour}</Text>
                </View>
                <Text style={styles.itemTitleText}>{item.title}</Text>        
            </TouchableOpacity>
        );
    }
    else{
        return this.renderEmptyItem(item);
    }
  }

  getMarkedDates = () => {
    const marked = {};

    let firstDay = moment(moment().year() + "-" + moment().month() + "-01");    
    let now = moment();
    
    while(firstDay.isBefore(now)){      
      marked[firstDay.format('YYYY-MM-DD')] = {marked: false, disabled: true, disableTouchEvent: true};
      firstDay = moment(firstDay).add(1, 'day');
    }

    ITEMS.forEach(item => {
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[now.format('YYYY-MM-DD')] = {marked: true, disabled: false, disableTouchEvent: false};
      }
    });
    return marked;
  }

  render() {    
    return (
      <Block flex>
        <Thumbnail 
          data={people}>
        </Thumbnail>        
        <CalendarProvider
          date={this.state.date} 
          onDateChanged={this.onDateChanged} 
          onMonthChange={this.onMonthChange}
          theme={{todayButtonTextColor: '#0059ff'}} 
          //showTodayButton
          disabledOpacity={0.6}>
          <ExpandableCalendar 
            firstDay={1}           
            pastScrollRange={0} 
            futureScrollRange={2} 
            markedDates={this.getMarkedDates()}/>
          <AgendaList 
              sections={ITEMS} 
              extraData={this.state} 
              renderItem={this.renderItem}             
              sectionStyle={styles.section}/>
        </CalendarProvider>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#f0f4f7', 
    color: '#79838a'
  },
  itemAvaible: {
    padding: 20, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0', 
    flexDirection: 'row',
    tintColor: '#1BB616'
  },
  emptyItem: {
    padding: 20,        
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black'
  },
  emptyHourText: {
    color: '#79838a',
    fontSize: 14,
  },
  itemTitleText: {
    color: '#5ACC12', 
    marginLeft: 16, 
    fontWeight: 'bold', 
    fontSize: 16
  },
  emptyTitleText: {
    color: '#79838a',
    marginLeft: 16, 
    fontSize: 14,
  }
});
