import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Icon, Notification } from 'rsuite';
import Header from './Header'
export default class LevelSix extends Component {

    state = {
        numbers: [],
        sumOfNumbers: 0,
        answer: null,
        time: 120,
        timeout: false,
        trueAnswerCount: 0,
        status: false,
    }

    componentDidMount() {
        this.createNumbers();
        setInterval(() => this.createNumbers(), 20000);
        setInterval(() => this.decreaseTime(), 1000);
    }

    decreaseTime = () => {
        const { time, timeout } = this.state;
        if (timeout === false) {
            if (time === 0) this.setState({ timeout: true })
            else if (time > 0) this.setState({ time: time - 1 })
        }
    }

    createNumbers = () => {
        const { timeout } = this.state;
        if (timeout === false) {
            const numbers = [];
            let sumOfNumbers = 0;
            for (let i = 0; i < 5; i++) {
                let randomNumber = Math.floor((Math.random() + 0.1) * 10);
                numbers.push(randomNumber);
                sumOfNumbers = sumOfNumbers + randomNumber;
            }
            this.setState({ numbers, sumOfNumbers });
        }
    }

    inputOnChanged = (e) => {
        const ans = e.target.value;
        this.setState({ answer: parseInt(ans) });
    }

    checkAnswer = () => {
        const { answer, sumOfNumbers, timeout, trueAnswerCount } = this.state;
        if (timeout === false) {
            if (answer === sumOfNumbers) {
                if (trueAnswerCount === 4) {
                    Notification.success({
                        title: 'Başarılı',
                        duration: 10000,
                        description: (
                          <div>
                            <p>Tebrikler ! 5 doğru sonuç girdiniz.</p>
                          </div>
                        )
                      });
                    this.setState({ status: true,trueAnswerCount: trueAnswerCount+1 });
                }
                else { Alert.success("Süper ! Doğru sonuç girdiniz."); this.setState({ trueAnswerCount: trueAnswerCount + 1 }) }
            } else {
                Alert.error("Üzgünüz :( Yanlış cevap verdin.")
            }
            const input = document.getElementById("answerInput");
            input.value="";
            this.createNumbers();
        }
        
    }

    renderGameGround = () => {
        const { numbers, timeout } = this.state;
        if (timeout === false) {
            return (
                <div>
                    <div className="cardContent">
                        {
                            numbers.map(num => (
                                <div className="cardItem">{num}</div>
                            ))
                        }
                    </div>
                    <br />
                    <center>
                        <div style={{ width: "20%" }} className="form-group">
                            <input type="text" id="answerInput" className="form-control" placeholder="Sonuç giriniz.." onChange={this.inputOnChanged} /><br />
                            <button type="button" className="btn btn-success" onClick={this.checkAnswer}>Kaydet</button>
                        </div>
                    </center>
                </div>
            )
        } else {
            return (
                <center>
                    <div style={{ width: "20%" }} className="alert alert-danger" role="alert">
                        Süre doldu !
                    </div>
                </center>
            )
        }
    }

    renderNextButton = () => {
        const { status,timeout } = this.state;
        if (status === true) {
            return (
                <Link to="level_7"><Button className="checkButton" color="red" >
                    <Icon icon="angle-double-right" /> Diğer Oyuna Geç
            </Button></Link>
            )
        }
        else if(timeout===true && status === false){
            return (
               <Button onClick={()=>{window.location.reload()}} className="checkButton" color="red" >
                    <Icon icon="refresh2" /> Tekrar Başla
            </Button>
            )
        }
    }

    render() {
        const { time, trueAnswerCount } = this.state;
        const minute = Math.floor(time / 60);
        const second = time - (minute * 60);
        return (
            <div>
                <header>
                    <div className="header-top">
                        <Header />
                        <section className="slider_section">
                            <center>
                                <div className="alert alert-info" role="alert" style={{ width: "70%" }}>
                                    <center>Sürekli değişen sayıları toplayıp 5 tane doğru sonuç yazabilir misin ?</center>
                                    <b>Kalan Süre : {minute} dakika {second} saniye</b> | <b>Doğru Cevap : {trueAnswerCount}</b>
                                </div>
                            </center>
                            {this.renderGameGround()}
                            {this.renderNextButton()}
                        </section>
                    </div>
                </header>

            </div>
        )
    }
}
