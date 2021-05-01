import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
export default class Homepage extends Component {
    render() {
        return (
            <div>
            <header>
              <div className="header-top">
              <Header/>
                <section className="slider_section">
                
                      {/** KODLAR BURAYA */}
                      <center><div class="text-bg">
                        <h1>Oynayarak<br /> ÖĞREN !</h1>
                        <span>Birbirinden eğlenceli çocuk oyunlarını oynayarak öğrenin.</span>
                        <Link to="level_1">Hemen Başla</Link>
                      </div></center>
                 
                </section>
              </div>
            </header>
    
          </div>
        )
    }
}
