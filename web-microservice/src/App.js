import './App.css';
import React,{Component} from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      isValidNumber: null,
      list:[],
      isEdit : false,
      editUserId : null
    };
  }
  
  componentDidMount(){
    this.getUserList()
  }
  
  handleDeleteUser =(id)=>()=>{
    fetch(`http://localhost:50002/user?id=${id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    .then((res) => res.json())
        .then((json) => {
          this.getUserList()
      }
    )
  }

  handleEditUser =(id)=>()=>{
    fetch(`http://localhost:50002/user?id=${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    .then((res) => res.json())
      .then((json) => {
        this.setState({
          fields : json.data[0],
          isEdit: true,
          editUserId: id
        })
      }
    )
  }

  getUserList = ()=>{
    fetch(`http://localhost:50002/user/all`)
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        list : json.data
      })
    })
  }

  creatUser = (e)=>{
    e.preventDefault();
    if(this.state.isEdit){
      let payload = this.state.fields
      delete payload['_id']
         fetch(`http://localhost:50002/user?id=${this.state.editUserId}`, {
          method: 'PUT',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(payload)
        })
        .then((res) => res.json())
            .then((json) => {
              this.clearFields()
              this.getUserList()
            })
    }else{
      if(this.state.isValidNumber.valid){
        let payload = this.state.fields
         fetch(`http://localhost:50002/user`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((json) => {
          this.clearFields()
          this.getUserList()
        }
      )}
    }
  }

  handleChange =(e)=>{
    let field = this.state.fields
    field[e.target.name] = e.target.value
    this.setState({
      [field] :field,
    })
  }

  validateNumber =(e)=>{
    e.preventDefault();
    this.validNumberService()
  }

  validNumberService = ()=>{
    if(this.state.fields.mobile){
      fetch(
        `http://localhost:50002/number-validate?number=${this.state.fields.mobile}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isValidNumber : json
        })
      })
    }
  }

  clearFields = ()=>{
    this.setState({
      fields:{name:"", mobile:"",address:""},
      isValidNumber: null,
      isEdit: false
    })
  }

  getTableContent = () => {
    return (<table border = {'1px solid black'}>
      <tr border = {'1px solid black'}>
        <th border = {'1px solid black'}>No</th>
        <th border = {'1px solid black'}>Name</th>
        <th border = {'1px solid black'}>Address</th>
        <th border = {'1px solid black'}>Moblile number</th>
        <th border = {'1px solid black'}>Action</th>
      </tr>
      {this.state.list.length > 0 && this.state.list.map((item,i)=>{
        return <tr border = {'1px solid black'}>
        <td border = {'1px solid black'}>{i+1}</td>
        <td border = {'1px solid black'}>{item.name}</td>
        <td border = {'1px solid black'}>{item.address}</td>
        <td border = {'1px solid black'}>{item.mobile}</td>
        <td border = {'1px solid black'}>
          <button onClick={this.handleEditUser(item.id)} >Edit</button>
          <button onClick={this.handleDeleteUser(item.id)} >Delete</button>
        </td>
      </tr>
      })}
    </table>)
  };

  render(){
    return (
      <div className="App">
        <div>
          <div>
            <form
              name="contactform"
              className="contactform"
            >
              <div className="col-md-6">
                <fieldset>
                  <input
                    type="text"
                    size="30"
                    placeholder="Name"
                    name = "name"
                    onChange={this.handleChange}
                    value={this.state.fields["name"]}
                    autocomplete="off"
                  />
                  <br />
                  <input
                    type="text"
                    size="30"
                    name = "address"
                    placeholder="Address"
                    onChange={this.handleChange}
                    value={this.state.fields["address"]}
                    autocomplete="off"
                  />
                  <br />
                  <input
                    type="text"
                    size="45"
                    name = "mobile"
                    placeholder="phone number with country code ex: +917377.."
                    onChange={this.handleChange}
                    value={this.state.fields["mobile"]}
                    autocomplete="off"
                  />
                  &nbsp;&nbsp;
                  <button onClick={this.validateNumber} >Validate number</button>
                  {this.state.isValidNumber && this.state.isValidNumber.valid ? <span style={{color:'green',fontWeight:'bold'}}> Valid number</span> : ""}
                  {this.state.isValidNumber && this.state.isValidNumber.valid ? (
                  alert(`country code : ${this.state.isValidNumber.country_code},
                  country name : ${this.state.isValidNumber.country_name},
                  operator name : ${this.state.isValidNumber.carrier}`)
                  ) :""}
                  {this.state.isValidNumber && !this.state.isValidNumber.valid ? <span style={{color:'Red',fontWeight:'bold'}}> Invalid number</span> : ""}
                  <br />
                  <button type="submit" onClick={this.creatUser}> {this.state.isEdit ? 'Update' : 'Submit'}</button>
                  <button  onClick={(e)=>{
                    e.preventDefault()
                    this.clearFields()
                  }}> {'Reset'}</button>
                </fieldset>
              </div>
            </form>
          </div>
          {this.state.list.length > 0 && (<div>{this.getTableContent()}</div>)}
          {this.state.list.length === 0 && (<span style={{fontWeight:'bold'}}>No data available</span>)}
        </div>
      </div>
    );
  }
}

export default App;
