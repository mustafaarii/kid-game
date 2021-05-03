import React, { Component } from 'react'
import Draggable, { DraggableCore } from 'react-draggable';
import { Link } from 'react-router-dom';
import { Alert, Button, Icon, Notification } from 'rsuite';
import Header from './Header'
export default class LevelFour extends Component {

    state = {
        operations : [],
        answers:[],
        item1: {
            left: 420,
            top: 300,
            display:"inline"
        },
        item2: {
            left: 820,
            top: 300,
            display:"inline"
        },
        status : false
    }

    componentDidMount() {
        this.createOperation();
    }
    

    createOperation = () => {
        let operations=[];
        let answers = [];

        for (let i = 0; i < 2; i++) {
           let num1 = Math.floor((Math.random()+0.1) * 10);
           let num2 = Math.floor((Math.random()+0.1) * 10);
           let num3 = Math.floor((Math.random()+0.1) * 10);
            operations.push(""+num1+" x "+num2+" - "+num3);
            answers.push(num1*num2-num3);
        }
        this.setState({operations,answers})
    }

    changeDivPosition = (e) => {
        let className = e.target.className.split(" ");
        let item = className[1];
        let id = e.target.id;

        if ((e.x>1200 && e.x<1300) && (e.y>500 && e.y<600)) {
            const answer = this.state.answers[id];
            const otherAns = id == 0 ? this.state.answers[1] : this.state.answers[0];
            if (answer < otherAns) {
                Notification.success({
                    title: 'Başarılı',
                    duration: 10000,
                    description: (
                      <div>
                        <p>Tebrikler, doğru kutucuğu seçtiniz.</p>
                      </div>
                    )
                  });
    
                this.setState({status:true})
            }else{
                Alert.error("Bilemedin :( Tekrar dene !")
                setTimeout(() => window.location.reload(), 500);
            }
            this.setState({[item]:{...[item],display:"none"}})
        }
      
    }

    renderElements = () => {
        const { item1, item2,operations,status } = this.state;

           if (status !== true) {
            return (
                <div>
                     <Draggable
                            onStop={this.changeDivPosition}
                            >
                                 <div style={{ left: item1.left, top: item1.top, paddingLeft:"15px", width:"150px", display:item1.display }} id="0" className="dragItem item1">{operations[0]}</div>
                            </Draggable>
                            <Draggable
                            onStop={this.changeDivPosition}
                            >
                                 <div style={{ left: item2.left, top: item2.top, paddingLeft:"15px",width:"150px", display:item2.display }} id="1" className="dragItem item2">{operations[1]}</div>
                            </Draggable>
                            <div className="trash"><img src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png" width="100" height="100" /></div>

                </div>
            )
           }else{
            
            return (
                <Link to="level_5"><Button className="checkButton" color="red" >
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
                            <center>
                                <div className="alert alert-info" role="alert" style={{ width: "70%" }}>
                                    <center>Aşağıdaki işlemleri hesaplayıp küçük olanı çöpe taşıyabilir misin ?</center>
                                </div>
                            </center>
                           {this.renderElements()}
                             </section>
            
                    </div>
                </header>

            </div>
        )
    }
}
