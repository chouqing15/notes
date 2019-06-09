```

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Select, Divider, Icon } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;

class UserRemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  fetchUser = value => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  };

  handleChange = value => {
    this.setState({
      value,
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    console.log(data)
    return (
      <Select
        style={{ width: 400 }}
        mode="multiple"
        onChange={(...arg) => {
          console.log(arg)
        }}
        dropdownRender={(menu, props) => {
          console.log(props)
          return (
            <div>
            <div style={{float:'left',width:'50%',background:'#fff'}}>
                <div onClick={() => {
          props.onDropdownVisibleChange(true)
              this.setState({
                data: Array.from(new Array(10)).map((item,i) => { 
                  return  i + 'a'
                })
              })
            }}>
              青岛银行
            </div>
            <div onClick={() => { 
              this.setState({
                data: Array.from(new Array(10)).map((item,i) => { 
                  return  i + 'a'
                })
              })
            }}>
              青岛1银行
            </div>
            <div onClick={() => { 
              this.setState({
                data: Array.from(new Array(10)).map(item => { 
                  return (Math.random()*10) + 'a'
                })
              })
            }}>
              青岛2银行
            </div>
            </div>
            <div style={{float:'left',width:'50%',background:'#fff'}}>
              {menu}
            </div>
          </div>
          )
        }}
      >
        {this.state.data.map((item,i) => { 
          return <Option value={item} key={i}>{item}</Option>
        })}
      </Select>
    );
  }
}

ReactDOM.render(<UserRemoteSelect />, document.getElementById('root'));

```