'use strict';

import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    Platform,
} from 'react-native';

type State = {
    keyboardUp: boolean,
}

class Tabs extends Component {
    state: State = {};

    onSelect(el){
        if (el.props.onSelect) {
            el.props.onSelect(el);
        } else if (this.props.onSelect) {
            this.props.onSelect(el);
        }
    }

    componentWillMount(){
        if (Platform.OS==='android') {
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
        }
    }

    componentWillUnmount(){
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardWillShow = (e) => {
        this.setState({ keyboardUp: true });
    };

    keyboardWillHide = (e) => {
        this.setState({ keyboardUp: false });
    };

  'use strict';

  import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native'
const {height, width} = Dimensions.get('window');

type State = {
  keyboardUp: boolean,
}

class Tabs extends Component {
  state: State = {};

  onSelect(el){
    if (el.props.onSelect) {
      el.props.onSelect(el);
    } else if (this.props.onSelect) {
      this.props.onSelect(el);
    }
  }

  componentWillMount(){
    if (Platform.OS==='android') {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }
  }

  componentWillUnmount(){
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardWillShow = (e) => {
    this.setState({ keyboardUp: true });
  };

  keyboardWillHide = (e) => {
    this.setState({ keyboardUp: false });
  };

  render(){
    const self = this;
    let selected = this.props.selected
    if (!selected){
      React.Children.forEach(this.props.children.filter(c=>c), el=>{
        if (!selected || el.props.initial){
          selected = el.props.name || el.key;
        }
      });
    }
    return (
      <View style={[styles.tabbarView, this.props.style, this.state.keyboardUp && styles.hidden]}>
        {React.Children.map(this.props.children.filter(c=>c),(el)=>
          <TouchableOpacity key={el.props.name+"touch"}
                            accessible={true}
                            accessibilityLabel={el.props.name || el.key}
                            testID={el.props.testID}
                            style={[
                              styles.iconView,
                              this.props.iconStyle,
                              (el.props.name || el.key) == selected ?
                                ((this.props.selectedIconStyle || el.props.selectedIconStyle || {}), styles.selected) :
                                {}
                            ]}
                            onPress={()=>!self.props.locked && self.onSelect(el)}
                            onLongPress={()=>self.onSelect(el)}
                            activeOpacity={el.props.pressOpacity}>
            {selected == (el.props.name || el.key) ? React.cloneElement(el, {selected: true, style: [el.props.style, this.props.selectedStyle, el.props.selectedStyle]}) : el}
            {selected == (el.props.name || el.key) ?
              <View style={styles.underline} /> :
              null
            }
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
var styles = StyleSheet.create({
  tabbarView: {
    position:'absolute',
    bottom:0,
    right:0,
    left:0,
    height:58,
    opacity:1,
    backgroundColor:'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    borderTopColor: '#E9E9E9',
    borderTopWidth: 2,
  },
  iconView: {
    flex: 1,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#BDD2DD',
    position: 'relative',
    backgroundColor: '#fff'
  },
  selected: {
    backgroundColor: '#ECF4F7'
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: (width/8)-30,
    width: 60,
    height: 3,
    backgroundColor: '#2F586E'
  },
  hidden: {
    height: 0,
  },
});

module.exports = Tabs;

