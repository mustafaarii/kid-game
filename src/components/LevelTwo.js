import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Notification } from 'rsuite'
import Header from './Header'

export default class LevelTwo extends Component {
    state = {
        numbers: [],
        firstSelected: null,
        secondSelected: null,
        checkStatus: null,
        status: false,
    }
    componentDidMount() {
        this.setState({ numbers: this.createNumbers() }, () => { console.log(this.state.numbers) })
    }

    createNumbers = () => {
        const arr = [], copyArr = [];

        arr.push(Math.floor(Math.random() * 11));

        for (let i = 0; i < 3; i++) {
            let randomNumber = Math.floor(Math.random() * 11);
            while (true) {
                if (arr.findIndex(number => number === randomNumber) === -1) break;
                else randomNumber = Math.floor(Math.random() * 21);
            }
            arr.push(randomNumber);
        }

        arr.forEach(num => {
            copyArr.push((num * 2).toString() + "/2"); // arr dizisindeki sayıların kesirli halleri yeni diziye alınıyor.
        })
        return arr.concat(copyArr).sort(); // diziler birleştiriliyor ve karıştırıyor daha sonra return ediliyor.
    }

    selectNumber = (number) => { // birinci ve ikinci seçilen sayılar state'e alınıyor. Eğer 2. seçildiyse kontrol yapılıyor.
        const { firstSelected, secondSelected } = this.state;
        if (firstSelected === null) this.setState({ firstSelected: number });
        else if (secondSelected === null) {
            this.setState({ secondSelected: number }, () => {
                this.checkNumbers(firstSelected, number);
            });
        }

    }

    checkNumbers = (num1, num2) => { // sayılar kesirliyse orjinal haline çevrilip kontrol ediliyor
        const { numbers } = this.state;

        let temp1, temp2;
        if (typeof num1 === "number") temp1 = num1;
        else if (typeof num1 === "string") temp1 = parseInt(num1) / 2;

        if (typeof num2 === "number") temp2 = num2;
        else if (typeof num2 === "string") temp2 = parseInt(num2) / 2;

        if (temp1 === temp2) {
            const newArr = numbers.filter(num => num !== num1 && num !== num2)
            this.setState({ checkStatus: true })
            setTimeout(() => this.setState({ numbers: newArr, firstSelected: null, secondSelected: null, checkStatus: null }), 1000);
            if (newArr.length === 0) {
                this.setState({ status: true });
                Notification.success({
                    title: 'Başarılı',
                    duration: 10000,
                    description: (
                        <div>
                            <p>Tebrikler, tüm sayıları başarıyla eşleştirdiniz.</p>
                        </div>
                    )
                })
            }
        } else {
            this.setState({ checkStatus: false })
            setTimeout(() => this.setState({ firstSelected: null, secondSelected: null, checkStatus: null }), 1000);
        }

    }

    renderNumbers = () => {
        const { numbers, status } = this.state;
        if (status === true) {
            return (
                <Link to="level_3"><Button className="checkButton" color="red" >
                    <Icon icon="angle-double-right" /> Diğer Oyuna Geç
                 </Button></Link>
            )
        }
        else if (numbers !== null) {
            return (
                <div className="cardContent">
                    {
                        numbers.map(num => (
                            <div onClick={() => { this.selectNumber(num) }} className={`cardItem ${this.renderNumberClass(num)}`}>{num}</div>
                        ))
                    }
                </div>
            )
        }
    }

    renderNumberClass = (num) => {
        const { firstSelected, secondSelected, checkStatus } = this.state;
        if (num === firstSelected || num === secondSelected) {
            if (checkStatus === null) return "selectedBorder";
            else if (checkStatus === true) return "successBorder";
            else if (checkStatus === false) return "errorBorder";
        }
    }

    render() {
        return (
            <div>
                <header>
                    <div className="header-top">
                        <Header />
                        <section className="slider_section">
                            {/** KODLAR BURAYA */}
                            <center>
                                <div className="alert alert-info" role="alert" style={{ width: "70%" }}>
                                    <center>Aşağıdaki sayılardan aynı olanlara tıklayabilir misin ? </center>
                                </div>
                            </center>
                            {this.renderNumbers()}
                        </section>
                    </div>
                </header>

            </div>
        )
    }
}
