import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs'
import { Button, Notification, Icon } from 'rsuite';
import Header from './Header'

export default class LevelOne extends Component {

  state = {
    numbers: [],
    status: null,
    modalStatus: false,
  }
  componentDidMount() {
    this.setState({ numbers: this.createNumbers() }, this.sortNumbers);
  }

  createNumbers = () => {
    const arr = [];
    arr.push({ id: 1, number: Math.floor(Math.random() * 21), order: null, status: null }); // ilk eleman ekleniyor.
    
    for (let i = 1; i < 10; i++) { // geri kalan elemanlar birbirinden farklı olarak oluşturuluyor ve diziye atılıyor.
      let randomNumber = Math.floor(Math.random() * 21);

      while (true) {
        if (arr.findIndex(number => number.number === randomNumber) === -1) break;
        else randomNumber = Math.floor(Math.random() * 21);
      }
      arr.push({ id: i + 1, number: randomNumber, order: null, status: null });
    }
    return arr;
  }

  sortNumbers = () => { // sayılar yeni bir dizide sıralanıyor ve order değerleri state'teki dizide güncelleniyor
    const { numbers } = this.state;
    const onlyNumbers = [];
    numbers.forEach(number => {
      onlyNumbers.push(number.number);
    })
    onlyNumbers.sort(function (a, b) { return a - b });

    numbers.forEach((number, index) => {
      let order = onlyNumbers.findIndex(sortedNum => number.number === sortedNum)
      numbers[index].order = order + 1;
    })

    this.setState({ numbers: numbers });
  }

  checkNumbers = () => { // sayılar kontrol ediliyor eğer doğru yerdelerse status'leri true oluyor.
    const { numbers } = this.state;
    let status = true;
    numbers.forEach((num, index) => {
      if (num.order === index + 1) {
        numbers[index].status = true;
      }
      else {
        numbers[index].status = false;
        status = false;
      }
    })
    if (status === true) {
      this.openNotification();
    }
    this.setState({ numbers, status });
  }

  renderNumber = () => {
    const { numbers } = this.state;

    return (
      <ReactSortable className="cardContent" list={numbers} setList={newState => this.setState({ numbers: newState })}>
        {numbers.map(number => (<div className={`cardItem ${number.status === true ? "successBorder" : ""} ${number.status === false ? "errorBorder" : ""}`} key={number.id}>{number.number}</div>)
        )}
      </ReactSortable>

    )
  }

  openNotification = () => {
    Notification.success({
      title: 'Başarılı',
      duration: 10000,
      description: (
        <div>
          <p>Tebrikler, tüm sayıları başarıyla sıraladınız.</p>
        </div>
      )
    });
  }

  renderNextButton = () => {
    const { status } = this.state;
    if (status === true) {
      return (
       <Link to="level_2"><Button className="checkButton" color="red" >
          <Icon icon="angle-double-right" /> Diğer Oyuna Geç
        </Button></Link>
      )
    }
  }

  render() {

    return (
      <div>
        <header>
          <div className="header-top">
            <Header />
            <section className="slider_section">
              <div className="banner_main">
                <div className="container-fluid">
                  {/** KODLAR BURAYA */}
                  <center>
                    <div className="alert alert-info" role="alert" style={{ width: "70%" }}>
                      <center>Aşağıdaki sayıları küçükten büyüğe sıralayabilir misin ? </center>
                    </div>
                  </center>
                  {this.renderNumber()}
                  <Button className="checkButton" onClick={this.checkNumbers} color="green" >
                    <Icon icon="search" /> Cevapları Kontrol Et
                  </Button>
                  {this.renderNextButton()}
                </div>
              </div>
            </section>
          </div>
        </header>

      </div>
    )
  }
}
