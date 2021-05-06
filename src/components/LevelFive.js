import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Notification } from 'rsuite';
import Header from './Header'
export default class LevelFive extends Component {
   
    state={
        numbers : [],
        status : false,
        selectedNumber : null,
        checkStatus:null,
        trueAnswerCount : 0,
    }

    componentDidMount() {
        this.setState({numbers:this.createNumbers()});

        setInterval(() => {
            this.setState({numbers:this.createNumbers(),selectedNumber:null,checkStatus:null})
        }, 4000);

    }
    

    createNumbers = () => {
        const {status} = this.state;
        if(status===true) return false;
        const arr = [];

        const num1 = Math.floor(Math.random() * 20);
        if(num1%2 === 1) arr.push(num1+1); // çift sayıyı diziye ata
        else arr.push(num1);

        for (let i = 0; i < 6; i++) {
            let randomNumber = Math.floor(Math.random() * 21);
            
            while (true) {
                if(randomNumber%2 === 0) randomNumber=randomNumber+1; //sayı çiftse 1 ekleyerek tek olmasını sağla
                if (arr.findIndex(number => number === randomNumber) === -1) break;
                else randomNumber = Math.floor(Math.random() * 21);
            }
            arr.push(randomNumber);
        }
        return arr.sort();
    }

    checkNumber = (num) => {
        const {checkStatus,trueAnswerCount} = this.state;
        if (checkStatus===null) {
            if (num%2===0) {
                if (trueAnswerCount===4) {
                    Notification.success({
                        title: 'Başarılı',
                        duration: 10000,
                        description: (
                            <div>
                                <p>Tebrikler, 5 tane çift sayı buldunuz.</p>
                            </div>
                        )
                    })
                    this.setState({status:true})} 
                this.setState({checkStatus:true,trueAnswerCount:trueAnswerCount+1,selectedNumber:num});
                
            }else{
                this.setState({checkStatus:false,selectedNumber:num});
            }
        }
       
    }

    renderNumbers = () => {
        const { numbers, status } = this.state;
        if (status === true) {
            return (
                <Link to="level_6"><Button className="checkButton" color="red" >
                    <Icon icon="angle-double-right" /> Diğer Oyuna Geç
                 </Button></Link>
            )
        }
        else if (numbers !== null) {
            return (
                <div className="cardContent">
                    {
                        numbers.map(num => (
                            <div onClick={() => { this.checkNumber(num) }} className={`cardItem ${this.renderNumberClass(num)}`}>{num}</div>
                        ))
                    }
                </div>
            )
        }
    }

    renderNumberClass = (num) => {
        const { selectedNumber, checkStatus } = this.state;
        if (num===selectedNumber) {
            if (checkStatus === true) return "successBorder";
            else if (checkStatus === false) return "errorBorder";
        }
    }

    render() {
        const {trueAnswerCount} = this.state;
        return (
            <div>
                <header>
                    <div className="header-top">
                        <Header />
                        <section className="slider_section" ref={this.state.mySectionRef} >
                            <center>
                                <div className="alert alert-info" role="alert" style={{ width: "70%" }}>
                                    <center>Aşağıda yenilenen sayılardan 5 tane çift sayı bulabilir misin ? <br/> Şimdiye kadar <b>{trueAnswerCount}</b> tane buldun :)</center>
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
